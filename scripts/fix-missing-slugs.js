#!/usr/bin/env node
/**
 * Fix Missing Slugs in Blog Post Frontmatter
 * Adds slug field to markdown files that are missing it
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_BLOG = path.join(__dirname, '../content/blog');

console.log('🔧 Fixing missing slugs in blog frontmatter...\n');

// Files that were reported as missing slugs
const filesToFix = [
  'baklava-unwrapped.md',
  'explore-the-mediterranean-cuisine.md', 
  'halal-what-does-it-mean.md',
  'shawarma-vs-doner-kebab.md',
  'the-ultimate-guide-to-savoring-the-perfect-gyro.md',
  'what-makes-real-baklava-a-guide-to-its-essential-components.md'
];

let fixedCount = 0;
let errorCount = 0;

filesToFix.forEach(filename => {
  const filePath = path.join(CONTENT_BLOG, filename);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  File not found: ${filename}`);
    return;
  }
  
  try {
    // Read and parse the file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(fileContent);
    
    // Check if slug is missing
    if (!parsed.data.slug) {
      // Generate slug from filename
      const slug = filename.replace('.md', '');
      
      // Add slug to frontmatter
      parsed.data.slug = slug;
      
      // Rebuild the file content
      const newContent = matter.stringify(parsed.content, parsed.data);
      
      // Write back to file
      fs.writeFileSync(filePath, newContent);
      
      console.log(`✅ Added slug "${slug}" to ${filename}`);
      fixedCount++;
    } else {
      console.log(`✅ ${filename} already has slug: ${parsed.data.slug}`);
    }
    
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
    errorCount++;
  }
});

console.log('\n📊 Summary:');
console.log(`✅ Files fixed: ${fixedCount}`);
console.log(`❌ Errors: ${errorCount}`);

if (errorCount === 0) {
  console.log('\n🎉 All slugs fixed successfully!');
  console.log('💡 Run npm run validate:blog to verify the fixes.');
} else {
  console.log('\n⚠️  Some files had errors. Please check manually.');
  process.exit(1);
}