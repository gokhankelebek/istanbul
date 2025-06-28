#!/usr/bin/env node

/**
 * Enhanced Sitemap Generator
 * 
 * This script generates both XML and HTML sitemaps with advanced SEO features:
 * - Multi-language support with hreflang attributes
 * - Priority and change frequency based on content type
 * - Last modified dates from Git history
 * - Image sitemaps for better image indexing
 * - Video sitemaps for better video content indexing
 * - News sitemaps for time-sensitive content
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');
const prettier = require('prettier');

// Configuration
const CONFIG = {
  // Base URL of your website
  baseUrl: 'https://www.istanbullv.com',
  
  // Output directory for sitemaps
  outputDir: path.join(__dirname, '../public'),
  
  // Routes configuration with metadata
  routes: [
    {
      path: '/',
      priority: 1.0,
      changefreq: 'weekly',
      languages: { 'en-us': '/', 'tr': '/tr', 'ar': '/ar', 'es': '/es' },
      images: [
        { url: '/hero-image.jpg', title: 'Istanbul Mediterranean Restaurant', caption: 'Authentic Turkish cuisine in Las Vegas' }
      ]
    },
    {
      path: '/menu',
      priority: 0.9,
      changefreq: 'weekly',
      languages: { 'en-us': '/menu', 'tr': '/tr/menu', 'ar': '/ar/menu', 'es': '/es/menu' },
      images: [
        { url: '/menu-header.jpg', title: 'Our Menu', caption: 'Delicious Turkish and Mediterranean dishes' }
      ]
    },
    {
      path: '/turkishfood',
      priority: 0.8,
      changefreq: 'monthly',
      languages: { 'en-us': '/turkishfood', 'tr': '/tr/turk-yemekleri', 'ar': '/ar/الطعام-التركي', 'es': '/es/comida-turca' }
    },
    {
      path: '/halal',
      priority: 0.8,
      changefreq: 'monthly',
      languages: { 'en-us': '/halal', 'tr': '/tr/helal', 'ar': '/ar/حلال', 'es': '/es/halal' }
    },
    {
      path: '/about',
      priority: 0.7,
      changefreq: 'monthly',
      languages: { 'en-us': '/about', 'tr': '/tr/hakkimizda', 'ar': '/ar/عن-المطعم', 'es': '/es/sobre-nosotros' }
    },
    {
      path: '/contact',
      priority: 0.7,
      changefreq: 'monthly',
      languages: { 'en-us': '/contact', 'tr': '/tr/iletisim', 'ar': '/ar/اتصل-بنا', 'es': '/es/contacto' }
    },
    {
      path: '/delivery',
      priority: 0.8,
      changefreq: 'weekly',
      languages: { 'en-us': '/delivery', 'tr': '/tr/teslimat', 'ar': '/ar/توصيل', 'es': '/es/entrega' }
    },
    {
      path: '/shawarma',
      priority: 0.8,
      changefreq: 'monthly',
      languages: { 'en-us': '/shawarma', 'tr': '/tr/doner', 'ar': '/ar/شاورما', 'es': '/es/shawarma' }
    },
    // Add more routes as needed
  ],
  
  // Blog posts directory (for dynamic content)
  blogPostsDir: path.join(__dirname, '../src/content/blog-posts'),
  
  // FAQ directory (for dynamic content)
  faqDir: path.join(__dirname, '../src/content/faq'),
  
  // Menu items (for dynamic content)
  menuItemsFile: path.join(__dirname, '../src/App.js')
};

/**
 * Get the last modified date of a file from Git history
 * @param {string} filePath - Path to the file
 * @returns {string} - ISO date string
 */
function getLastModifiedDate(filePath) {
  try {
    const timestamp = execSync(`git log -1 --format=%cd --date=iso ${filePath}`, { encoding: 'utf-8' }).trim();
    return new Date(timestamp).toISOString();
  } catch (error) {
    return new Date().toISOString();
  }
}

/**
 * Extract dynamic routes from source files
 * @returns {Array} - Array of route objects
 */
function extractDynamicRoutes() {
  const dynamicRoutes = [];
  
  // Extract blog posts
  try {
    const blogFiles = fs.readdirSync(CONFIG.blogPostsDir);
    blogFiles.forEach(file => {
      if (file.endsWith('.md')) {
        const slug = file.replace('.md', '');
        const filePath = path.join(CONFIG.blogPostsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Extract title from markdown frontmatter
        const titleMatch = content.match(/title:\s*["'](.+?)["']/);
        const title = titleMatch ? titleMatch[1] : slug;
        
        dynamicRoutes.push({
          path: `/blog-posts/${slug}`,
          title: title,
          priority: 0.6,
          changefreq: 'monthly',
          lastmod: getLastModifiedDate(filePath),
          languages: { 'en-us': `/blog-posts/${slug}` } // Assuming blog posts are only in English
        });
      }
    });
  } catch (error) {
    console.warn(chalk.yellow(`Warning: Could not extract blog posts: ${error.message}`));
  }
  
  // Extract FAQ items
  try {
    const faqFiles = fs.readdirSync(CONFIG.faqDir);
    faqFiles.forEach(file => {
      if (file.endsWith('.md')) {
        const slug = file.replace('.md', '');
        const filePath = path.join(CONFIG.faqDir, file);
        
        dynamicRoutes.push({
          path: `/faq/${slug}`,
          priority: 0.5,
          changefreq: 'monthly',
          lastmod: getLastModifiedDate(filePath),
          languages: { 'en-us': `/faq/${slug}` } // Assuming FAQs are only in English
        });
      }
    });
  } catch (error) {
    console.warn(chalk.yellow(`Warning: Could not extract FAQ items: ${error.message}`));
  }
  
  // Extract menu items
  try {
    const appContent = fs.readFileSync(CONFIG.menuItemsFile, 'utf-8');
    const menuItemRegex = /{\s*name:\s*["'](.+?)["'],\s*slug:\s*["'](.+?)["']/g;
    let match;
    
    while ((match = menuItemRegex.exec(appContent)) !== null) {
      const name = match[1];
      const slug = match[2];
      
      dynamicRoutes.push({
        path: `/menu/${slug}`,
        title: name,
        priority: 0.7,
        changefreq: 'monthly',
        languages: { 'en-us': `/menu/${slug}` } // Assuming menu items are only in English
      });
    }
  } catch (error) {
    console.warn(chalk.yellow(`Warning: Could not extract menu items: ${error.message}`));
  }
  
  return dynamicRoutes;
}

/**
 * Generate XML sitemap
 * @param {Array} routes - Array of route objects
 * @returns {string} - XML sitemap content
 */
function generateXmlSitemap(routes) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
  xml += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"\n';
  xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n';
  
  routes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${CONFIG.baseUrl}${route.path}</loc>\n`;
    
    // Add lastmod if available
    if (route.lastmod) {
      xml += `    <lastmod>${route.lastmod}</lastmod>\n`;
    }
    
    // Add changefreq if available
    if (route.changefreq) {
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    }
    
    // Add priority if available
    if (route.priority) {
      xml += `    <priority>${route.priority}</priority>\n`;
    }
    
    // Add alternate language versions
    if (route.languages) {
      Object.entries(route.languages).forEach(([lang, path]) => {
        xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${CONFIG.baseUrl}${path}" />\n`;
      });
    }
    
    // Add images if available
    if (route.images && route.images.length > 0) {
      route.images.forEach(image => {
        xml += '    <image:image>\n';
        xml += `      <image:loc>${CONFIG.baseUrl}${image.url}</image:loc>\n`;
        
        if (image.title) {
          xml += `      <image:title>${image.title}</image:title>\n`;
        }
        
        if (image.caption) {
          xml += `      <image:caption>${image.caption}</image:caption>\n`;
        }
        
        xml += '    </image:image>\n';
      });
    }
    
    // Add videos if available
    if (route.videos && route.videos.length > 0) {
      route.videos.forEach(video => {
        xml += '    <video:video>\n';
        xml += `      <video:thumbnail_loc>${CONFIG.baseUrl}${video.thumbnailUrl}</video:thumbnail_loc>\n`;
        xml += `      <video:title>${video.title}</video:title>\n`;
        xml += `      <video:description>${video.description}</video:description>\n`;
        xml += `      <video:content_loc>${CONFIG.baseUrl}${video.contentUrl}</video:content_loc>\n`;
        xml += '    </video:video>\n';
      });
    }
    
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
}

/**
 * Generate HTML sitemap
 * @param {Array} routes - Array of route objects
 * @returns {string} - HTML sitemap content
 */
function generateHtmlSitemap(routes) {
  // Group routes by section
  const sections = {};
  
  routes.forEach(route => {
    const path = route.path;
    let section = 'Other';
    
    if (path === '/') {
      section = 'Main';
    } else if (path.startsWith('/menu/')) {
      section = 'Menu Items';
    } else if (path.startsWith('/blog-posts/')) {
      section = 'Blog Posts';
    } else if (path.startsWith('/faq/')) {
      section = 'FAQs';
    } else if (['/menu', '/turkishfood', '/halal', '/shawarma'].includes(path)) {
      section = 'Food Pages';
    } else if (['/about', '/contact', '/delivery'].includes(path)) {
      section = 'Information';
    }
    
    if (!sections[section]) {
      sections[section] = [];
    }
    
    sections[section].push(route);
  });
  
  // Generate HTML
  let html = '<!DOCTYPE html>\n';
  html += '<html lang="en">\n';
  html += '<head>\n';
  html += '  <meta charset="UTF-8">\n';
  html += '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
  html += '  <title>Sitemap | Istanbul Mediterranean</title>\n';
  html += '  <meta name="robots" content="index, follow">\n';
  html += '  <link rel="canonical" href="https://www.istanbullv.com/sitemap.html">\n';
  html += '  <style>\n';
  html += '    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; max-width: 1200px; margin: 0 auto; padding: 20px; color: #333; }\n';
  html += '    h1 { color: #d32f2f; border-bottom: 2px solid #d32f2f; padding-bottom: 10px; }\n';
  html += '    h2 { color: #d32f2f; margin-top: 30px; }\n';
  html += '    ul { padding-left: 20px; }\n';
  html += '    li { margin: 8px 0; }\n';
  html += '    a { color: #0066cc; text-decoration: none; }\n';
  html += '    a:hover { text-decoration: underline; }\n';
  html += '    .section { margin-bottom: 30px; }\n';
  html += '    .last-modified { font-size: 0.8em; color: #666; margin-left: 10px; }\n';
  html += '    .languages { font-size: 0.8em; margin-left: 10px; }\n';
  html += '    .languages a { margin-right: 10px; }\n';
  html += '  </style>\n';
  html += '</head>\n';
  html += '<body>\n';
  html += '  <h1>Istanbul Mediterranean Restaurant Sitemap</h1>\n';
  html += '  <p>Welcome to our sitemap. This page provides an overview of all available content on our website.</p>\n';
  
  // Add each section
  Object.entries(sections).forEach(([sectionName, sectionRoutes]) => {
    html += `  <div class="section">\n`;
    html += `    <h2>${sectionName}</h2>\n`;
    html += '    <ul>\n';
    
    sectionRoutes.forEach(route => {
      const title = route.title || route.path.split('/').pop() || 'Home';
      
      html += '      <li>\n';
      html += `        <a href="${route.path}">${title}</a>\n`;
      
      // Add last modified date if available
      if (route.lastmod) {
        const date = new Date(route.lastmod);
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        html += `        <span class="last-modified">Last updated: ${formattedDate}</span>\n`;
      }
      
      // Add language versions if available
      if (route.languages && Object.keys(route.languages).length > 1) {
        html += '        <div class="languages">Also available in: ';
        
        Object.entries(route.languages).forEach(([lang, path], index, array) => {
          if (lang !== 'en-us') {
            const langName = {
              'tr': 'Turkish',
              'ar': 'Arabic',
              'es': 'Spanish'
            }[lang] || lang;
            
            html += `<a href="${path}" hreflang="${lang}">${langName}</a>`;
            
            if (index < array.length - 1) {
              html += ' ';
            }
          }
        });
        
        html += '</div>\n';
      }
      
      html += '      </li>\n';
    });
    
    html += '    </ul>\n';
    html += '  </div>\n';
  });
  
  html += '  <footer>\n';
  html += `    <p>Sitemap last generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>\n`;
  html += '    <p><a href="/sitemap.xml">XML Sitemap</a> | <a href="/">Home</a></p>\n';
  html += '  </footer>\n';
  html += '</body>\n';
  html += '</html>';
  
  return html;
}

/**
 * Write sitemap files
 * @param {string} xmlContent - XML sitemap content
 * @param {string} htmlContent - HTML sitemap content
 */
function writeSitemapFiles(xmlContent, htmlContent) {
  // Format XML with prettier
  try {
    xmlContent = prettier.format(xmlContent, { parser: 'xml' });
  } catch (error) {
    console.warn(chalk.yellow(`Warning: Could not format XML: ${error.message}`));
  }
  
  // Format HTML with prettier
  try {
    htmlContent = prettier.format(htmlContent, { parser: 'html' });
  } catch (error) {
    console.warn(chalk.yellow(`Warning: Could not format HTML: ${error.message}`));
  }
  
  // Write XML sitemap
  fs.writeFileSync(path.join(CONFIG.outputDir, 'sitemap.xml'), xmlContent);
  console.log(chalk.green('✓ Generated XML sitemap'));
  
  // Write HTML sitemap
  fs.writeFileSync(path.join(CONFIG.outputDir, 'sitemap.html'), htmlContent);
  console.log(chalk.green('✓ Generated HTML sitemap'));
  
  // Write robots.txt if it doesn't exist
  const robotsPath = path.join(CONFIG.outputDir, 'robots.txt');
  if (!fs.existsSync(robotsPath)) {
    const robotsContent = `# robots.txt for Istanbul Mediterranean
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${CONFIG.baseUrl}/sitemap.xml
`;
    
    fs.writeFileSync(robotsPath, robotsContent);
    console.log(chalk.green('✓ Generated robots.txt'));
  } else {
    // Check if robots.txt contains sitemap reference
    const robotsContent = fs.readFileSync(robotsPath, 'utf-8');
    if (!robotsContent.includes('Sitemap:')) {
      const updatedRobotsContent = `${robotsContent.trim()}\n\n# Sitemaps\nSitemap: ${CONFIG.baseUrl}/sitemap.xml\n`;
      fs.writeFileSync(robotsPath, updatedRobotsContent);
      console.log(chalk.green('✓ Updated robots.txt with sitemap reference'));
    }
  }
}

/**
 * Main function
 */
function main() {
  console.log(chalk.blue('Generating enhanced sitemaps...'));
  
  // Combine static and dynamic routes
  const dynamicRoutes = extractDynamicRoutes();
  const allRoutes = [...CONFIG.routes, ...dynamicRoutes];
  
  // Generate sitemaps
  const xmlSitemap = generateXmlSitemap(allRoutes);
  const htmlSitemap = generateHtmlSitemap(allRoutes);
  
  // Write sitemap files
  writeSitemapFiles(xmlSitemap, htmlSitemap);
  
  console.log(chalk.green(`\nSitemaps generated successfully!`));
  console.log(`XML Sitemap: ${path.join(CONFIG.outputDir, 'sitemap.xml')}`);
  console.log(`HTML Sitemap: ${path.join(CONFIG.outputDir, 'sitemap.html')}`);
  console.log(chalk.blue('\nAdd this script to your package.json:'));
  console.log(`  "scripts": {\n    "generate-sitemap": "node scripts/generate-enhanced-sitemap.js"\n  }`);
}

// Run main function
main();
