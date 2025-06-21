const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIR = 'content/blog';
const OUT_FILE = 'src/data/posts.json';

async function buildPosts() {
  try {
    const files = await fs.readdir(BLOG_DIR);
    const posts = [];

    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      
      const filePath = path.join(BLOG_DIR, file);
      const md = await fs.readFile(filePath, 'utf8');
      const { data } = matter(md);
      
      posts.push({
        slug: data.slug || path.basename(file, '.md'),
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        excerpt: data.excerpt || '',
        cover: data.cover || data.image || ''
      });
    }

    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    await fs.writeFile(OUT_FILE, JSON.stringify(posts, null, 2));
    console.log(`✓  Wrote ${posts.length} posts to ${OUT_FILE}`);
  } catch (error) {
    console.error('Error building posts:', error);
    process.exit(1);
  }
}

buildPosts();
