// This script copies all .md blog posts from content/blog to public, flattening the path for root-level public access
const fs = require('fs');
const path = require('path');

const BLOG_SRC = path.join(__dirname, '../content/blog');
const PUBLIC_DIR = path.join(__dirname, '../public');

fs.readdirSync(BLOG_SRC).forEach(file => {
  if (file.endsWith('.md')) {
    const src = path.join(BLOG_SRC, file);
    const dest = path.join(PUBLIC_DIR, file);
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} to /public`);
  }
});
