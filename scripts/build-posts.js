import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const BLOG_DIR = 'content/blog';
const OUT_FILE = 'src/data/posts.json';

const files = await fs.readdir(BLOG_DIR);
const posts = [];

for (const file of files) {
  if (!file.endsWith('.md')) continue;
  const md = await fs.readFile(path.join(BLOG_DIR, file), 'utf8');
  const { data } = matter(md);
  posts.push({
    slug: file.replace(/\.md$/, ''),
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    cover: data.cover
  });
}

await fs.writeFile(OUT_FILE, JSON.stringify(posts, null, 2));
console.log(`✓  Wrote ${posts.length} posts to ${OUT_FILE}`);
