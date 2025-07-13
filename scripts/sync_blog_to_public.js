// Enhanced blog sync script with validation and multiple destinations
const fs = require('fs');
const path = require('path');

const BLOG_SRC = path.join(__dirname, '../content/blog');
const PUBLIC_ROOT = path.join(__dirname, '../public');
const PUBLIC_CONTENT = path.join(__dirname, '../public/content/blog');

// Ensure destination directories exist
if (!fs.existsSync(PUBLIC_CONTENT)) {
  fs.mkdirSync(PUBLIC_CONTENT, { recursive: true });
  console.log('Created public/content/blog directory');
}

// Read source directory and validate
if (!fs.existsSync(BLOG_SRC)) {
  console.error('❌ Source directory not found:', BLOG_SRC);
  process.exit(1);
}

const sourceFiles = fs.readdirSync(BLOG_SRC).filter(file => file.endsWith('.md'));
console.log(`📁 Found ${sourceFiles.length} markdown files in source`);

let copiedCount = 0;
let errorCount = 0;

sourceFiles.forEach(file => {
  try {
    const src = path.join(BLOG_SRC, file);
    
    // Copy to public root (for direct access)
    const rootDest = path.join(PUBLIC_ROOT, file);
    fs.copyFileSync(src, rootDest);
    
    // Copy to public/content/blog (for React app)
    const contentDest = path.join(PUBLIC_CONTENT, file);
    fs.copyFileSync(src, contentDest);
    
    console.log(`✅ Copied ${file} to both destinations`);
    copiedCount++;
  } catch (error) {
    console.error(`❌ Failed to copy ${file}:`, error.message);
    errorCount++;
  }
});

console.log(`\n📊 Sync Summary:`);
console.log(`✅ Successfully copied: ${copiedCount} files`);
console.log(`❌ Errors: ${errorCount} files`);

if (errorCount > 0) {
  console.error('\n🚨 Some files failed to copy. Please check the errors above.');
  process.exit(1);
}

console.log('\n🎉 Blog sync completed successfully!');
