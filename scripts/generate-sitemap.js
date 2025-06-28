const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// Configuration
const SITE_URL = 'https://www.istanbullv.com';
const PUBLIC_DIR = path.join(__dirname, '../public');
const CONTENT_DIR = path.join(__dirname, '../content');
const DATA_DIR = path.join(__dirname, '../data');
const BLOG_POSTS_FILE = path.join(DATA_DIR, 'blogPosts.js');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'sitemap.xml');

// Priority and change frequency settings by page type
const PRIORITIES = {
  home: 1.0,
  mainPages: 0.8,
  blogPosts: 0.7,
  menuItems: 0.6,
  other: 0.5
};

const CHANGE_FREQ = {
  home: 'daily',
  mainPages: 'weekly',
  blogPosts: 'weekly',
  menuItems: 'weekly',
  other: 'monthly'
};

// Main pages that should be included with high priority
const MAIN_PAGES = [
  'about',
  'menu',
  'turkishfood',
  'halal',
  'contact',
  'catering',
  'delivery',
  'blog'
];

// Get all static pages from the src/pages directory
function getStaticPages() {
  try {
    // This would normally scan the pages directory, but for simplicity we'll use the existing sitemap
    const existingSitemap = fs.readFileSync(OUTPUT_FILE, 'utf8');
    const urlMatches = existingSitemap.match(/<loc>https:\/\/www\.istanbullv\.com\/(.*?)<\/loc>/g);
    
    if (!urlMatches) return [];
    
    return urlMatches
      .map(match => {
        const path = match.replace('<loc>https://www.istanbullv.com/', '').replace('</loc>', '');
        return path === '' ? 'home' : path;
      });
  } catch (error) {
    console.error('Error reading existing sitemap:', error);
    return [];
  }
}

// Get blog posts from the data file
function getBlogPosts() {
  try {
    // Read the blog posts data file content
    const fileContent = fs.readFileSync(BLOG_POSTS_FILE, 'utf8');
    
    // Extract slugs using regex (simplified approach)
    const slugMatches = fileContent.match(/slug:\s*['"]([^'"]+)['"]/g);
    
    if (!slugMatches) return [];
    
    return slugMatches.map(match => {
      const slug = match.replace(/slug:\s*['"]/, '').replace(/['"]/, '');
      return `blog/${slug}`;
    });
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

// Generate the sitemap XML
function generateSitemap() {
  const staticPages = getStaticPages();
  const blogPosts = getBlogPosts();
  
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add home page
  sitemap += `
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${CHANGE_FREQ.home}</changefreq>
    <priority>${PRIORITIES.home}</priority>
  </url>`;

  // Add static pages
  staticPages.forEach(page => {
    if (page === 'home') return; // Skip home page as it's already added
    
    const isMainPage = MAIN_PAGES.includes(page);
    const priority = isMainPage ? PRIORITIES.mainPages : PRIORITIES.other;
    const changefreq = isMainPage ? CHANGE_FREQ.mainPages : CHANGE_FREQ.other;
    
    sitemap += `
  <url>
    <loc>${SITE_URL}/${page}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  // Add blog posts
  blogPosts.forEach(post => {
    sitemap += `
  <url>
    <loc>${SITE_URL}/${post}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${CHANGE_FREQ.blogPosts}</changefreq>
    <priority>${PRIORITIES.blogPosts}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  // Write the sitemap to the public directory
  fs.writeFileSync(OUTPUT_FILE, sitemap);
  console.log(`Sitemap generated at ${OUTPUT_FILE}`);
}

// Run the generator
generateSitemap();
