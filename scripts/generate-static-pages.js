const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIR = 'content/blog';
const OUTPUT_DIR = 'public/blog-posts';

async function generateStaticPages() {
  try {
    // Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    const files = await fs.readdir(BLOG_DIR);
    
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      
      const filePath = path.join(BLOG_DIR, file);
      const md = await fs.readFile(filePath, 'utf8');
      const { data, content } = matter(md);
      
      const slug = data.slug || path.basename(file, '.md');
      
      // Generate static HTML
      const html = generateBlogPostHTML({
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        content: content,
        cover: data.cover || '',
        date: data.date || new Date().toISOString().split('T')[0]
      });
      
      // Create directory for the slug
      const postDir = path.join(OUTPUT_DIR, slug);
      await fs.mkdir(postDir, { recursive: true });
      
      // Write index.html
      await fs.writeFile(path.join(postDir, 'index.html'), html);
      
      console.log(`✓ Generated static page for: ${slug}`);
    }
    
    console.log(`\n✅ Generated ${files.filter(f => f.endsWith('.md')).length} static blog pages`);
  } catch (error) {
    console.error('Error generating static pages:', error);
    process.exit(1);
  }
}

function generateBlogPostHTML({ title, excerpt, content, cover, date }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} | Istanbul Mediterranean Blog</title>
  <meta name="description" content="${excerpt}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${excerpt}">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://www.istanbullv.com${cover}">
  <meta property="og:url" content="https://www.istanbullv.com/blog-posts/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}">
  <link rel="canonical" href="https://www.istanbullv.com/blog-posts/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}">
  <link rel="icon" type="image/png" href="/favicon.png">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-FFY0FW17ZM"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-FFY0FW17ZM');
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${title}",
    "description": "${excerpt}",
    "image": "https://www.istanbullv.com${cover}",
    "datePublished": "${date}",
    "author": {
      "@type": "Organization",
      "name": "Istanbul Mediterranean"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Istanbul Mediterranean",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.istanbullv.com/logo.png"
      }
    }
  }
  </script>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #b91c1c; border-bottom: 2px solid #b91c1c; padding-bottom: 10px; }
    h2 { color: #374151; margin-top: 2rem; }
    img { max-width: 100%; height: auto; }
    .meta { color: #6b7280; margin-bottom: 2rem; }
    .content { margin-top: 2rem; }
  </style>
</head>
<body>
  <article>
    <h1>${title}</h1>
    <div class="meta">Published on ${new Date(date).toLocaleDateString()}</div>
    ${cover ? `<img src="${cover}" alt="${title}" style="width: 100%; margin: 2rem 0;">` : ''}
    <div class="content">
      ${content.replace(/\n/g, '<br>')}
    </div>
  </article>
  
  <script>
    // Redirect to React app after 3 seconds for interactive features
    setTimeout(() => {
      if (window.location.pathname.includes('/blog-posts/')) {
        // Don't redirect, let users stay on static version
        console.log('Static version loaded for SEO');
      }
    }, 100);
  </script>
</body>
</html>`;
}

generateStaticPages();
