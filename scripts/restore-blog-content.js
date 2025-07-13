const fs = require('fs');
const path = require('path');

// Read the blogPosts.js file as text
const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.js');
const blogPostsContent = fs.readFileSync(blogPostsPath, 'utf8');

// Extract the blogPosts array using regex
const match = blogPostsContent.match(/export const blogPosts = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('Could not extract blogPosts array');
  process.exit(1);
}

// Parse the array safely without using eval
const blogPostsArrayString = match[1];
let blogPosts;
try {
  // Replace eval with safer parsing
  blogPosts = JSON.parse(blogPostsArrayString.replace(/'/g, '"'));
} catch (error) {
  console.error('Could not parse blogPosts array:', error.message);
  console.log('Attempting alternate parsing method...');
  
  // Fallback: create a safe evaluation environment
  const vm = require('vm');
  const context = vm.createContext({});
  blogPosts = vm.runInContext(`(${blogPostsArrayString})`, context);
}

// Target slugs to restore
const targetSlugs = [
  'history-and-variations-of-gyros',
  'best-halal-baklava-las-vegas-strip',
  'mediterranean-delivery-food-las-vegas',
  'greek-gyro-answering-top-7-questions',
  'top-5-halal-food-las-vegas'
];

// Create content/blog directory if it doesn't exist
const contentDir = path.join(__dirname, '../content/blog');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// Restore each blog post
targetSlugs.forEach(slug => {
  const post = blogPosts.find(p => p.slug === slug);
  
  if (post) {
    const frontmatter = `---
title: "${post.title}"
slug: "${post.slug}"
date: "${post.date}"
excerpt: "${post.excerpt}"
cover: "${post.image || '/istanbul-hero.png'}"
author: "${post.author || 'Istanbul Mediterranean Team'}"
tags: ["mediterranean", "food", "las vegas"]
---

${post.content}`;

    const filePath = path.join(contentDir, `${slug}.md`);
    fs.writeFileSync(filePath, frontmatter);
    console.log(`✓ Restored: ${slug}.md`);
  } else {
    console.log(`✗ Not found: ${slug}`);
  }
});

console.log('\n✅ Blog content restoration complete!');
