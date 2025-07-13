const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIR = 'content/blog';
const OUT_FILE = 'src/data/posts.json';

async function buildPosts() {
  console.log('📝 Building posts from markdown files (single source of truth)...');
  
  try {
    // Ensure the blog directory exists
    const dirExists = await fs.access(BLOG_DIR).then(() => true).catch(() => false);
    if (!dirExists) {
      throw new Error(`Blog directory not found: ${BLOG_DIR}`);
    }
    
    const files = await fs.readdir(BLOG_DIR);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    console.log(`📁 Found ${markdownFiles.length} markdown files`);
    
    const posts = [];
    let processedCount = 0;
    let errorCount = 0;

    for (const file of markdownFiles) {
      try {
        const filePath = path.join(BLOG_DIR, file);
        const md = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(md);
        
        // Validate required fields
        if (!data.title) {
          console.warn(`⚠️  ${file}: Missing title in frontmatter`);
        }
        
        if (!data.slug) {
          console.warn(`⚠️  ${file}: Missing slug in frontmatter`);
        }
        
        // Generate slug fallback from filename if missing
        const slug = data.slug || path.basename(file, '.md');
        
        const post = {
          slug: slug,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString().split('T')[0],
          excerpt: data.excerpt || '',
          cover: data.cover || data.image || '',
          author: data.author || 'Istanbul Mediterranean Team',
          tags: data.tags || [],
          wordCount: content.split(/\s+/).length,
          readingTime: Math.ceil(content.split(/\s+/).length / 200) // ~200 words per minute
        };
        
        posts.push(post);
        processedCount++;
        console.log(`✅ Processed: ${file} -> ${slug}`);
        
      } catch (fileError) {
        console.error(`❌ Error processing ${file}:`, fileError.message);
        errorCount++;
      }
    }

    if (posts.length === 0) {
      throw new Error('No valid blog posts found!');
    }

    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Ensure output directory exists
    const outDir = path.dirname(OUT_FILE);
    await fs.mkdir(outDir, { recursive: true });

    // Write the posts file
    await fs.writeFile(OUT_FILE, JSON.stringify(posts, null, 2));
    
    console.log('\n📊 Build Summary:');
    console.log(`✅ Successfully processed: ${processedCount} posts`);
    console.log(`❌ Errors: ${errorCount} files`);
    console.log(`📄 Output: ${OUT_FILE}`);
    console.log(`\n🎉 Posts built successfully from markdown files!`);
    
    if (errorCount > 0) {
      console.warn('\n⚠️  Some files had errors but build continued.');
    }
    
  } catch (error) {
    console.error('❌ Fatal error building posts:', error.message);
    process.exit(1);
  }
}

buildPosts();
