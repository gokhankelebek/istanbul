#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

const BLOG_DIR = 'content/blog';

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to prompt user for input
function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Helper function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Helper function to format date as YYYY-MM-DD
function formatDate(date = new Date()) {
  return date.toISOString().split('T')[0];
}

// Helper function to create markdown template
function createMarkdownTemplate(data) {
  return `---
title: "${data.title}"
slug: "${data.slug}"
date: "${data.date}"
excerpt: "${data.excerpt}"
cover: "${data.cover}"
author: "${data.author}"
tags: [${data.tags.map(tag => `"${tag}"`).join(', ')}]
---

# ${data.title}

${data.content || 'Start writing your blog post content here...'}
`;
}

async function createBlogPost() {
  console.log('🚀 Istanbul Mediterranean Blog Post Creator\n');
  
  try {
    // Ensure blog directory exists
    await fs.mkdir(BLOG_DIR, { recursive: true });
    
    // Collect blog post information
    const title = await ask('📝 Blog post title: ');
    if (!title.trim()) {
      throw new Error('Title is required!');
    }
    
    const autoSlug = generateSlug(title);
    const slugInput = await ask(`🔗 Slug (press Enter for "${autoSlug}"): `);
    const slug = slugInput.trim() || autoSlug;
    
    const excerpt = await ask('📖 Excerpt (brief description): ');
    
    const cover = await ask('🖼️  Cover image path (e.g., /menu/gyros.png): ');
    
    const authorInput = await ask('👤 Author (press Enter for "Istanbul Mediterranean Team"): ');
    const author = authorInput.trim() || 'Istanbul Mediterranean Team';
    
    const tagsInput = await ask('🏷️  Tags (comma-separated, e.g., mediterranean, food, las vegas): ');
    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(Boolean) : [];
    
    const addContent = await ask('✍️  Add content now? (y/n): ');
    let content = '';
    
    if (addContent.toLowerCase() === 'y' || addContent.toLowerCase() === 'yes') {
      console.log('\n📄 Enter your blog post content (type "END" on a new line to finish):');
      const lines = [];
      let line;
      while ((line = await ask('')) !== 'END') {
        lines.push(line);
      }
      content = lines.join('\n');
    }
    
    // Create blog post data
    const blogPost = {
      title,
      slug,
      date: formatDate(),
      excerpt: excerpt || '',
      cover: cover || '',
      author,
      tags,
      content
    };
    
    // Generate filename
    const filename = `${slug}.md`;
    const filepath = path.join(BLOG_DIR, filename);
    
    // Check if file already exists
    try {
      await fs.access(filepath);
      const overwrite = await ask(`⚠️  File "${filename}" already exists. Overwrite? (y/n): `);
      if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
        console.log('❌ Operation cancelled.');
        rl.close();
        return;
      }
    } catch (err) {
      // File doesn't exist, which is what we want
    }
    
    // Create markdown content
    const markdownContent = createMarkdownTemplate(blogPost);
    
    // Write file
    await fs.writeFile(filepath, markdownContent, 'utf8');
    
    console.log(`\n✅ Blog post created successfully!`);
    console.log(`📁 File: ${filepath}`);
    console.log(`🔗 Slug: ${slug}`);
    console.log(`📅 Date: ${blogPost.date}`);
    
    // Ask if user wants to run build script
    const runBuild = await ask('\n🔄 Run build script to update posts.json? (y/n): ');
    if (runBuild.toLowerCase() === 'y' || runBuild.toLowerCase() === 'yes') {
      console.log('\n🔨 Running build script...');
      const { spawn } = require('child_process');
      const build = spawn('node', ['scripts/build-posts.js'], { stdio: 'inherit' });
      
      build.on('close', (code) => {
        if (code === 0) {
          console.log('\n🎉 Blog post is ready! You can now view it on your website.');
        } else {
          console.log('\n⚠️  Build script failed. You may need to run it manually.');
        }
        rl.close();
      });
    } else {
      console.log('\n💡 Don\'t forget to run "npm run build:posts" or "node scripts/build-posts.js" to update your website!');
      rl.close();
    }
    
  } catch (error) {
    console.error('❌ Error creating blog post:', error.message);
    rl.close();
    process.exit(1);
  }
}

// Handle script execution
if (require.main === module) {
  createBlogPost();
}

module.exports = { createBlogPost, generateSlug, formatDate, createMarkdownTemplate };