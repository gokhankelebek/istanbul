const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const PROJECT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(PROJECT_DIR, 'src');
const PUBLIC_DIR = path.join(PROJECT_DIR, 'public');
const REPORT_DIR = path.join(PROJECT_DIR, 'reports');
const REPORT_FILE = path.join(REPORT_DIR, `seo-report-${new Date().toISOString().split('T')[0]}.md`);

// Ensure reports directory exists
if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

// Function to count occurrences of a pattern in a file
function countOccurrences(filePath, pattern) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = content.match(pattern);
    return matches ? matches.length : 0;
  } catch (error) {
    return 0;
  }
}

// Function to check if a file contains a pattern
function containsPattern(filePath, pattern) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return pattern.test(content);
  } catch (error) {
    return false;
  }
}

// Function to find all JSX/JS files
function findJsxFiles(directory) {
  const files = [];
  
  function traverse(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith('.jsx') || entry.name.endsWith('.js'))) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(directory);
  return files;
}

// Generate SEO report
async function generateSEOReport() {
  console.log('Generating SEO report...');
  
  let report = `# SEO Audit Report for Istanbul Mediterranean Website
Generated on: ${new Date().toLocaleString()}

## Overview

This report provides a comprehensive analysis of the SEO implementation across the website.

`;

  // 1. Check meta tags implementation
  report += `## Meta Tags Analysis\n\n`;
  
  const jsxFiles = findJsxFiles(path.join(SRC_DIR, 'pages'));
  let pagesWithHelmet = 0;
  let pagesWithTitle = 0;
  let pagesWithDescription = 0;
  let pagesWithCanonical = 0;
  let pagesWithOG = 0;
  let pagesWithTwitter = 0;
  let pagesWithSchema = 0;
  
  const pageDetails = [];
  
  for (const file of jsxFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const fileName = path.basename(file);
    const pageName = fileName.replace(/\.[^/.]+$/, '');
    
    const hasHelmet = content.includes('<Helmet') || content.includes('useHelmet');
    const hasTitle = content.includes('<title>') || content.includes('title=');
    const hasDescription = content.includes('name="description"');
    const hasCanonical = content.includes('rel="canonical"');
    const hasOG = content.includes('property="og:');
    const hasTwitter = content.includes('name="twitter:');
    const hasSchema = content.includes('application/ld+json') || content.includes('schema.org');
    
    if (hasHelmet) pagesWithHelmet++;
    if (hasTitle) pagesWithTitle++;
    if (hasDescription) pagesWithDescription++;
    if (hasCanonical) pagesWithCanonical++;
    if (hasOG) pagesWithOG++;
    if (hasTwitter) pagesWithTwitter++;
    if (hasSchema) pagesWithSchema++;
    
    pageDetails.push({
      page: pageName,
      helmet: hasHelmet ? '✅' : '❌',
      title: hasTitle ? '✅' : '❌',
      description: hasDescription ? '✅' : '❌',
      canonical: hasCanonical ? '✅' : '❌',
      og: hasOG ? '✅' : '❌',
      twitter: hasTwitter ? '✅' : '❌',
      schema: hasSchema ? '✅' : '❌'
    });
  }
  
  const totalPages = jsxFiles.length;
  
  report += `### Meta Tags Coverage\n\n`;
  report += `- Total Pages: ${totalPages}\n`;
  report += `- Pages with Helmet: ${pagesWithHelmet} (${Math.round(pagesWithHelmet / totalPages * 100)}%)\n`;
  report += `- Pages with Title: ${pagesWithTitle} (${Math.round(pagesWithTitle / totalPages * 100)}%)\n`;
  report += `- Pages with Meta Description: ${pagesWithDescription} (${Math.round(pagesWithDescription / totalPages * 100)}%)\n`;
  report += `- Pages with Canonical URL: ${pagesWithCanonical} (${Math.round(pagesWithCanonical / totalPages * 100)}%)\n`;
  report += `- Pages with Open Graph Tags: ${pagesWithOG} (${Math.round(pagesWithOG / totalPages * 100)}%)\n`;
  report += `- Pages with Twitter Card Tags: ${pagesWithTwitter} (${Math.round(pagesWithTwitter / totalPages * 100)}%)\n`;
  report += `- Pages with Structured Data: ${pagesWithSchema} (${Math.round(pagesWithSchema / totalPages * 100)}%)\n\n`;
  
  report += `### Page-by-Page Analysis\n\n`;
  report += `| Page | Helmet | Title | Description | Canonical | OG | Twitter | Schema |\n`;
  report += `| --- | --- | --- | --- | --- | --- | --- | --- |\n`;
  
  for (const page of pageDetails) {
    report += `| ${page.page} | ${page.helmet} | ${page.title} | ${page.description} | ${page.canonical} | ${page.og} | ${page.twitter} | ${page.schema} |\n`;
  }
  
  report += `\n`;
  
  // 2. Check robots.txt
  report += `## Robots.txt Analysis\n\n`;
  
  try {
    const robotsContent = fs.readFileSync(path.join(PUBLIC_DIR, 'robots.txt'), 'utf8');
    report += `\`\`\`\n${robotsContent}\n\`\`\`\n\n`;
    
    const hasUserAgent = robotsContent.includes('User-agent:');
    const hasSitemap = robotsContent.includes('Sitemap:');
    const hasDisallow = robotsContent.includes('Disallow:');
    
    report += `- User-agent directive: ${hasUserAgent ? '✅ Present' : '❌ Missing'}\n`;
    report += `- Sitemap reference: ${hasSitemap ? '✅ Present' : '❌ Missing'}\n`;
    report += `- Disallow directives: ${hasDisallow ? '✅ Present' : '❌ Missing'}\n\n`;
  } catch (error) {
    report += `❌ No robots.txt file found\n\n`;
  }
  
  // 3. Check sitemap.xml
  report += `## Sitemap Analysis\n\n`;
  
  try {
    const sitemapContent = fs.readFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), 'utf8');
    const urlCount = (sitemapContent.match(/<url>/g) || []).length;
    
    report += `- Sitemap found: ✅\n`;
    report += `- Number of URLs: ${urlCount}\n`;
    report += `- Format: ${sitemapContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"') ? 'Standard XML Sitemap' : 'Unknown'}\n\n`;
    
    // Check for image sitemap
    try {
      const imageSitemapPath = path.join(PUBLIC_DIR, 'image-sitemap.xml');
      if (fs.existsSync(imageSitemapPath)) {
        const imageSitemapContent = fs.readFileSync(imageSitemapPath, 'utf8');
        const imageCount = (imageSitemapContent.match(/<image:image>/g) || []).length;
        
        report += `- Image sitemap found: ✅\n`;
        report += `- Number of images: ${imageCount}\n\n`;
      } else {
        report += `- Image sitemap: ❌ Not found\n\n`;
      }
    } catch (error) {
      report += `- Image sitemap: ❌ Not found\n\n`;
    }
  } catch (error) {
    report += `❌ No sitemap.xml file found\n\n`;
  }
  
  // 4. Check for structured data
  report += `## Structured Data Analysis\n\n`;
  
  const schemaTypes = new Set();
  let totalSchemaCount = 0;
  
  for (const file of jsxFiles) {
    const content = fs.readFileSync(file, 'utf8');
    
    // Extract JSON-LD blocks
    const jsonLdRegex = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
    let match;
    
    while ((match = jsonLdRegex.exec(content)) !== null) {
      totalSchemaCount++;
      
      try {
        const jsonContent = match[1].trim();
        // Extract the @type field from the JSON
        const typeMatch = jsonContent.match(/"@type":\s*"([^"]+)"/);
        
        if (typeMatch && typeMatch[1]) {
          schemaTypes.add(typeMatch[1]);
        }
      } catch (error) {
        // Skip parsing errors
      }
    }
  }
  
  report += `- Total structured data blocks: ${totalSchemaCount}\n`;
  report += `- Schema types implemented: ${Array.from(schemaTypes).join(', ') || 'None'}\n\n`;
  
  // 5. Image optimization analysis
  report += `## Image Optimization\n\n`;
  
  // Check for WebP versions
  const imageFiles = [];
  function findImageFiles(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      
      if (entry.isDirectory()) {
        findImageFiles(fullPath);
      } else if (entry.isFile() && /\.(jpg|jpeg|png|gif)$/i.test(entry.name)) {
        imageFiles.push(fullPath);
      }
    }
  }
  
  findImageFiles(PUBLIC_DIR);
  
  let imagesWithWebP = 0;
  
  for (const imageFile of imageFiles) {
    const webpVersion = imageFile.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
    if (fs.existsSync(webpVersion)) {
      imagesWithWebP++;
    }
  }
  
  report += `- Total images: ${imageFiles.length}\n`;
  report += `- Images with WebP version: ${imagesWithWebP} (${Math.round(imagesWithWebP / imageFiles.length * 100)}%)\n\n`;
  
  // 6. Check for alt text on images in JSX files
  let totalImgTags = 0;
  let imgTagsWithAlt = 0;
  
  for (const file of findJsxFiles(SRC_DIR)) {
    const content = fs.readFileSync(file, 'utf8');
    const imgTags = content.match(/<img[^>]+>/g) || [];
    
    totalImgTags += imgTags.length;
    
    for (const imgTag of imgTags) {
      if (imgTag.match(/alt=["'][^"']*["']/)) {
        imgTagsWithAlt++;
      }
    }
  }
  
  report += `- Total <img> tags: ${totalImgTags}\n`;
  report += `- <img> tags with alt text: ${imgTagsWithAlt} (${Math.round(imgTagsWithAlt / totalImgTags * 100)}%)\n\n`;
  
  // 7. Performance optimization checks
  report += `## Performance Optimization\n\n`;
  
  // Check for resource hints
  const hasResourceHints = fs.existsSync(path.join(SRC_DIR, 'components/ResourceHints.jsx'));
  report += `- Resource hints component: ${hasResourceHints ? '✅ Implemented' : '❌ Not implemented'}\n`;
  
  // Check for lazy loading
  let filesWithLazyLoading = 0;
  for (const file of findJsxFiles(SRC_DIR)) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('React.lazy') || content.includes('loading="lazy"')) {
      filesWithLazyLoading++;
    }
  }
  
  report += `- Lazy loading implementation: ${filesWithLazyLoading > 0 ? `✅ Found in ${filesWithLazyLoading} files` : '❌ Not implemented'}\n\n`;
  
  // 8. Mobile responsiveness
  report += `## Mobile Responsiveness\n\n`;
  
  // Check for viewport meta tag
  let hasViewportMeta = false;
  for (const file of findJsxFiles(SRC_DIR)) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('name="viewport"')) {
      hasViewportMeta = true;
      break;
    }
  }
  
  report += `- Viewport meta tag: ${hasViewportMeta ? '✅ Present' : '❌ Missing'}\n`;
  
  // Check for responsive design (Tailwind classes)
  let filesWithResponsiveClasses = 0;
  for (const file of findJsxFiles(SRC_DIR)) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.match(/\b(sm|md|lg|xl):/)) {
      filesWithResponsiveClasses++;
    }
  }
  
  report += `- Responsive design classes: ${filesWithResponsiveClasses > 0 ? `✅ Found in ${filesWithResponsiveClasses} files` : '❌ Not found'}\n\n`;
  
  // 9. SEO Recommendations
  report += `## SEO Recommendations\n\n`;
  
  const recommendations = [];
  
  if (pagesWithTitle < totalPages) {
    recommendations.push('Add title tags to all pages');
  }
  
  if (pagesWithDescription < totalPages) {
    recommendations.push('Add meta descriptions to all pages');
  }
  
  if (pagesWithCanonical < totalPages) {
    recommendations.push('Add canonical URLs to all pages');
  }
  
  if (pagesWithOG < totalPages) {
    recommendations.push('Implement Open Graph tags on all pages for better social sharing');
  }
  
  if (pagesWithTwitter < totalPages) {
    recommendations.push('Add Twitter Card tags to all pages');
  }
  
  if (pagesWithSchema < totalPages) {
    recommendations.push('Implement structured data on more pages');
  }
  
  if (imgTagsWithAlt < totalImgTags) {
    recommendations.push('Add alt text to all images');
  }
  
  if (imagesWithWebP < imageFiles.length) {
    recommendations.push('Create WebP versions for all images');
  }
  
  if (!hasResourceHints) {
    recommendations.push('Implement resource hints (preload, prefetch, preconnect) for better performance');
  }
  
  if (filesWithLazyLoading === 0) {
    recommendations.push('Implement lazy loading for images and components');
  }
  
  if (!hasViewportMeta) {
    recommendations.push('Add viewport meta tag for better mobile responsiveness');
  }
  
  if (recommendations.length > 0) {
    report += recommendations.map(rec => `- ${rec}`).join('\n');
  } else {
    report += '✅ Great job! No major SEO improvements needed at this time.\n';
  }
  
  // Write report to file
  fs.writeFileSync(REPORT_FILE, report);
  console.log(`SEO report generated: ${REPORT_FILE}`);
  
  return report;
}

// Run the report generator
generateSEOReport();
