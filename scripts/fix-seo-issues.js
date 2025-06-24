const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

// Constants
const PAGES_DIR = path.join(__dirname, '../src/pages');
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const BLOG_DIR = path.join(__dirname, '../content/blog');

// Helper function to read a file
async function readFile(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

// Helper function to write a file
async function writeFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content, 'utf8');
    console.log(`✓ Updated ${path.basename(filePath)}`);
    return true;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    return false;
  }
}

// Fix duplicate title tags and meta descriptions
async function fixMetaTags() {
  console.log('\n🔍 Fixing duplicate title tags and meta descriptions...');
  
  const files = await fs.readdir(PAGES_DIR);
  const jsxFiles = files.filter(file => file.endsWith('.jsx') && !file.startsWith('Blog') && !file.startsWith('Landing'));
  
  const titleMap = {};
  const descriptionMap = {};
  const pagesToFix = [];
  
  // First pass: collect all titles and descriptions
  for (const file of jsxFiles) {
    const filePath = path.join(PAGES_DIR, file);
    const content = await readFile(filePath);
    
    if (!content) continue;
    
    // Extract title
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : null;
    
    // Extract meta description
    const descMatch = content.match(/content="([^"]*?)"\s*\/>\s*(?:<script|<\/Helmet>)/);
    const description = descMatch ? descMatch[1] : null;
    
    if (title) {
      titleMap[title] = titleMap[title] ? [...titleMap[title], file] : [file];
    }
    
    if (description) {
      descriptionMap[description] = descriptionMap[description] ? [...descriptionMap[description], file] : [file];
    }
    
    pagesToFix.push({
      file,
      filePath,
      content,
      title,
      description,
      needsTitleFix: false,
      needsDescFix: false
    });
  }
  
  // Second pass: identify duplicates
  for (const page of pagesToFix) {
    if (page.title && titleMap[page.title].length > 1) {
      page.needsTitleFix = true;
    }
    
    if (page.description && descriptionMap[page.description].length > 1) {
      page.needsDescFix = true;
    }
  }
  
  // Third pass: fix duplicates
  let fixedTitles = 0;
  let fixedDescs = 0;
  
  for (const page of pagesToFix) {
    if (!page.needsTitleFix && !page.needsDescFix) continue;
    
    let content = page.content;
    const pageName = page.file.replace('.jsx', '');
    
    // Fix title if needed
    if (page.needsTitleFix && page.title) {
      const uniqueTitle = makeUniqueTitle(page.title, pageName);
      content = content.replace(
        /<title>(.*?)<\/title>/,
        `<title>${uniqueTitle}</title>`
      );
      fixedTitles++;
      console.log(`  - Updated title in ${page.file}: "${uniqueTitle}"`);
    }
    
    // Fix description if needed
    if (page.needsDescFix && page.description) {
      const uniqueDesc = makeUniqueDescription(page.description, pageName);
      content = content.replace(
        /content="([^"]*?)"\s*\/>\s*(?:<script|<\/Helmet>)/,
        `content="${uniqueDesc}" />\n        $2`
      );
      fixedDescs++;
      console.log(`  - Updated meta description in ${page.file}`);
    }
    
    // Write the updated content back to the file
    await writeFile(page.filePath, content);
  }
  
  console.log(`✓ Fixed ${fixedTitles} duplicate titles and ${fixedDescs} duplicate descriptions`);
}

// Helper function to make a unique title
function makeUniqueTitle(title, pageName) {
  // If title already contains the page name, just return it
  if (title.includes(pageName)) return title;
  
  // Format the page name properly (convert camelCase to Title Case)
  const formattedPageName = pageName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
  
  // Add the page name to the title
  if (title.includes('|')) {
    // If title has a pipe, add the page name before the pipe
    const parts = title.split('|');
    return `${formattedPageName} | ${parts[1].trim()}`;
  } else {
    // Otherwise, add the page name with a pipe
    return `${formattedPageName} | ${title}`;
  }
}

// Helper function to make a unique description
function makeUniqueDescription(desc, pageName) {
  // Format the page name properly (convert camelCase to Title Case)
  const formattedPageName = pageName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
  
  // If description is too long, truncate it and add the page name
  if (desc.length > 150) {
    return `${desc.substring(0, 140)}... Learn more about ${formattedPageName}.`;
  }
  
  // Otherwise, add the page name to the end
  return `${desc} Find out more about ${formattedPageName} at Istanbul Mediterranean Halal.`;
}

// Fix low word count pages
async function fixLowWordCount() {
  console.log('\n🔍 Identifying pages with low word count...');
  
  const files = await fs.readdir(PAGES_DIR);
  const jsxFiles = files.filter(file => file.endsWith('.jsx') && !file.startsWith('Blog') && !file.startsWith('Landing'));
  
  for (const file of jsxFiles) {
    const filePath = path.join(PAGES_DIR, file);
    const content = await readFile(filePath);
    
    if (!content) continue;
    
    // Extract text content (very rough approximation)
    const textContent = content
      .replace(/<[^>]*>/g, ' ') // Remove HTML tags
      .replace(/\{\/\*.*?\*\/\}/g, ' ') // Remove comments
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    const wordCount = textContent.split(/\s+/).length;
    
    if (wordCount < 300) {
      console.log(`  - Low word count (${wordCount}) in ${file}`);
      // We'll provide guidance on how to fix this rather than automatically adding content
    }
  }
}

// Fix orphaned pages and pages with only one incoming link
async function fixOrphanedPages() {
  console.log('\n🔍 Fixing orphaned pages and pages with few internal links...');
  
  // Read sitemap to get all pages
  const sitemapContent = await readFile(SITEMAP_PATH);
  if (!sitemapContent) return;
  
  // Extract URLs from sitemap
  const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
  const urls = urlMatches.map(match => {
    const url = match.replace(/<loc>|<\/loc>/g, '');
    return url.replace('https://www.istanbullv.com/', '');
  }).filter(url => url !== '');
  
  // Create a navigation component with links to all pages
  await createSiteNavigation(urls);
  
  console.log('✓ Created site navigation component to fix orphaned pages');
}

// Create a site navigation component
async function createSiteNavigation(urls) {
  const navigationCode = `import React from 'react';
import { Link } from 'react-router-dom';

export default function SiteNavigation({ className }) {
  return (
    <nav className={\`site-navigation \${className || ''}\`}>
      <h2 className="text-xl font-bold mb-4">Explore More</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        ${urls.map(url => {
          // Format the URL into a readable title
          const title = url
            .split('/').pop()
            .replace(/-/g, ' ')
            .replace(/\\b\\w/g, l => l.toUpperCase());
          
          return `<li>
          <Link to="/${url}" className="text-amber-700 hover:text-amber-500 transition">
            ${title}
          </Link>
        </li>`;
        }).join('\n        ')}
      </ul>
    </nav>
  );
}`;

  await writeFile(path.join(__dirname, '../src/components/SiteNavigation.jsx'), navigationCode);
  
  // Now create a script to add this navigation to key pages
  const integrationScript = `import React from 'react';
import SiteNavigation from './SiteNavigation';

export default function RelatedContent() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl my-8">
      <SiteNavigation />
    </div>
  );
}`;

  await writeFile(path.join(__dirname, '../src/components/RelatedContent.jsx'), integrationScript);
}

// Generate a sitemap based on actual pages
async function generateSitemap() {
  console.log('\n🔍 Generating updated sitemap...');
  
  const files = await fs.readdir(PAGES_DIR);
  const jsxFiles = files.filter(file => file.endsWith('.jsx') && !file.startsWith('Landing'));
  
  const urls = [];
  
  // Add home page
  urls.push('https://www.istanbullv.com/');
  
  // Add regular pages
  for (const file of jsxFiles) {
    if (file === 'Home.jsx' || file === 'NotFound.jsx') continue;
    
    const pagePath = file.replace('.jsx', '').toLowerCase();
    urls.push(`https://www.istanbullv.com/${pagePath}`);
  }
  
  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `<url><loc>${url}</loc></url>`).join('\n  ')}
</urlset>
`;

  await writeFile(SITEMAP_PATH, sitemap);
  console.log(`✓ Generated sitemap with ${urls.length} URLs`);
}

// Main function to run all fixes
async function fixSEOIssues() {
  console.log('🚀 Starting SEO fixes...');
  
  await fixMetaTags();
  await fixLowWordCount();
  await fixOrphanedPages();
  await generateSitemap();
  
  console.log('\n✅ SEO fixes completed!');
  console.log('\nNext steps:');
  console.log('1. Add the RelatedContent component to pages with low internal links');
  console.log('2. Expand content on pages with low word count');
  console.log('3. Rebuild your site with: npm run build');
}

fixSEOIssues();
