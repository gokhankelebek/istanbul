const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = process.env.REACT_APP_SITE_URL || 'https://www.istanbullv.com';
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

// Static routes from App.js - English only (main language)
const STATIC_ROUTES = [
  // Main pages
  { path: '', priority: PRIORITIES.home, changefreq: CHANGE_FREQ.home },
  { path: 'menu', priority: PRIORITIES.mainPages, changefreq: CHANGE_FREQ.mainPages },
  { path: 'blog-posts', priority: PRIORITIES.mainPages, changefreq: CHANGE_FREQ.mainPages },
  { path: 'halal', priority: PRIORITIES.mainPages, changefreq: CHANGE_FREQ.mainPages },
  { path: 'about', priority: PRIORITIES.mainPages, changefreq: CHANGE_FREQ.mainPages },
  { path: 'catering', priority: PRIORITIES.mainPages, changefreq: CHANGE_FREQ.mainPages },
  { path: 'contact', priority: PRIORITIES.mainPages, changefreq: CHANGE_FREQ.mainPages },
  { path: 'delivery', priority: PRIORITIES.mainPages, changefreq: CHANGE_FREQ.mainPages },
  
  // Secondary pages
  { path: 'faq', priority: PRIORITIES.other, changefreq: CHANGE_FREQ.other },
  { path: 'experience', priority: PRIORITIES.other, changefreq: CHANGE_FREQ.other },
  { path: 'mediterranean-restaurant', priority: PRIORITIES.other, changefreq: CHANGE_FREQ.other },
  { path: 'near-me/halal-food', priority: PRIORITIES.other, changefreq: CHANGE_FREQ.other },
  { path: 'shawarma', priority: PRIORITIES.other, changefreq: CHANGE_FREQ.other },
  { path: 'turkish-food', priority: PRIORITIES.other, changefreq: CHANGE_FREQ.other },
  
  // Special landing pages
  { path: 'best-mediterranean-food-near-caesars-palace-las-vegas', priority: PRIORITIES.blogPosts, changefreq: CHANGE_FREQ.blogPosts },
  { path: 'where-to-eat-near-the-sphere-las-vegas', priority: PRIORITIES.blogPosts, changefreq: CHANGE_FREQ.blogPosts },
  
  // Landing pages
  { path: 'yelp', priority: PRIORITIES.other, changefreq: CHANGE_FREQ.other },
  { path: 'google', priority: PRIORITIES.other, changefreq: CHANGE_FREQ.other }
];

// Get blog posts from the content directory
function getBlogPosts() {
  try {
    const blogDir = path.join(CONTENT_DIR, 'blog');
    if (!fs.existsSync(blogDir)) {
      console.warn('Blog directory not found, skipping blog posts');
      return [];
    }
    
    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
    return files.map(file => {
      const slug = file.replace('.md', '');
      return {
        path: `blog-posts/${slug}`,
        priority: PRIORITIES.blogPosts,
        changefreq: CHANGE_FREQ.blogPosts
      };
    });
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

// Get menu items (assuming they exist in menu.json)
function getMenuItems() {
  try {
    const menuFile = path.join(DATA_DIR, 'menu.json');
    if (!fs.existsSync(menuFile)) {
      console.warn('Menu file not found, skipping menu items');
      return [];
    }
    
    const menuData = JSON.parse(fs.readFileSync(menuFile, 'utf8'));
    return menuData.map(item => ({
      path: `menu/${item.slug}`,
      priority: PRIORITIES.menuItems,
      changefreq: CHANGE_FREQ.menuItems
    }));
  } catch (error) {
    console.error('Error reading menu items:', error);
    return [];
  }
}

// Generate URL entry
function generateUrlEntry(path, priority, changefreq, lastmod) {
  const url = path === '' ? SITE_URL : `${SITE_URL}/${path}`;
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// Generate the complete sitemap
function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  // Collect all URLs
  const allUrls = [];
  
  // Add static routes
  STATIC_ROUTES.forEach(route => {
    allUrls.push(generateUrlEntry(route.path, route.priority, route.changefreq, today));
  });
  
  // Add blog posts
  const blogPosts = getBlogPosts();
  blogPosts.forEach(post => {
    allUrls.push(generateUrlEntry(post.path, post.priority, post.changefreq, today));
  });
  
  // Add menu items
  const menuItems = getMenuItems();
  menuItems.forEach(item => {
    allUrls.push(generateUrlEntry(item.path, item.priority, item.changefreq, today));
  });
  
  // Create the sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.join('\n')}
</urlset>`;

  // Write the sitemap
  fs.writeFileSync(OUTPUT_FILE, sitemap);
  
  const totalUrls = allUrls.length;
  console.log(`✅ Sitemap generated successfully!`);
  console.log(`📄 ${totalUrls} URLs included`);
  console.log(`📍 Location: ${OUTPUT_FILE}`);
  console.log(`🌐 Static routes: ${STATIC_ROUTES.length}`);
  console.log(`📝 Blog posts: ${blogPosts.length}`);
  console.log(`🍽️  Menu items: ${menuItems.length}`);
}

// Run the generator
if (require.main === module) {
  generateSitemap();
}

module.exports = { generateSitemap };