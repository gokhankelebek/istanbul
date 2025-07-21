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
        date: data.date || new Date().toISOString().split('T')[0],
        slug: slug
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

function generateBlogPostHTML({ title, excerpt, content, cover, date, slug }) {
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
  <meta property="og:url" content="https://www.istanbullv.com/blog-posts/${slug}">
  <link rel="canonical" href="https://www.istanbullv.com/blog-posts/${slug}">
  <link rel="icon" type="image/png" href="/favicon.png">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@600&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
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
      "name": "Istanbul Mediterranean Team"
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
    body { font-family: 'Inter', sans-serif; background: #F7F5F2; }
    h1, h2, h3, h4, h5 { font-family: 'Poppins', sans-serif; }
    .btn { @apply font-semibold px-6 py-3 rounded-full transition-transform duration-100 active:scale-95 shadow-md; }
    .btn-primary { @apply bg-red-600 text-white hover:bg-red-700; }
  </style>
</head>
<body class="bg-gray-50">
  <!-- Header Navigation -->
  <nav class="bg-white shadow sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Istanbul Mediterranean Logo" class="h-10 w-auto">
        <span class="font-bold text-xl text-gray-900">Istanbul Mediterranean</span>
      </div>
      <div class="hidden md:flex items-center space-x-8">
        <a href="/" class="text-gray-700 hover:text-red-600 font-medium">Home</a>
        <a href="/menu" class="text-gray-700 hover:text-red-600 font-medium">Menu</a>
        <a href="/blog-posts" class="text-gray-700 hover:text-red-600 font-medium">Blog</a>
        <a href="/delivery" class="text-gray-700 hover:text-red-600 font-medium">Delivery</a>
        <a href="/contact" class="text-gray-700 hover:text-red-600 font-medium">Contact</a>
        <a href="https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Order Online</a>
      </div>
    </div>
  </nav>

  <!-- Blog Post Content -->
  <main class="max-w-4xl mx-auto px-4 py-12">
    <!-- Hero Image -->
    <div class="mb-8">
      <img src="${cover}" alt="${title}" class="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg">
    </div>
    
    <!-- Article Header -->
    <header class="mb-8 text-center">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">${title}</h1>
      <div class="flex items-center justify-center text-gray-600 text-sm space-x-4">
        <time datetime="${date}">${new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        <span>•</span>
        <span>3 min read</span>
        <span>•</span>
        <span>by Istanbul Mediterranean Team</span>
      </div>
    </header>

    <!-- Article Content -->
    <article class="prose prose-lg max-w-none">
      ${content}
    </article>

    <!-- Call to Action -->
    <div class="mt-12 p-6 bg-red-50 rounded-xl text-center">
      <h3 class="text-xl font-bold text-gray-900 mb-2">Ready to taste the difference?</h3>
      <p class="text-gray-600 mb-4">Visit Istanbul Mediterranean for authentic halal Mediterranean cuisine in Las Vegas.</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/menu" class="btn btn-primary">View Our Menu</a>
        <a href="https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv" target="_blank" rel="noopener noreferrer" class="btn bg-gray-600 text-white hover:bg-gray-700">Order Online</a>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-gray-900 text-gray-300 py-12 mt-16 px-6">
    <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
      <!-- Explore -->
      <div>
        <h3 class="text-xl font-bold text-white mb-4">Explore</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="/" class="hover:text-yellow-400">Home</a></li>
          <li><a href="/menu" class="hover:text-yellow-400">Menu</a></li>
          <li><a href="/catering" class="hover:text-yellow-400">Catering</a></li>
          <li><a href="/delivery" class="hover:text-yellow-400">Delivery</a></li>
          <li><a href="/contact" class="hover:text-yellow-400">Contact</a></li>
        </ul>
      </div>

      <!-- Specialties -->
      <div>
        <h3 class="text-xl font-bold text-white mb-4">Specialties</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="/menu" class="hover:text-yellow-400">Doner Kebab</a></li>
          <li><a href="/menu" class="hover:text-yellow-400">Shawarma</a></li>
          <li><a href="/menu" class="hover:text-yellow-400">Falafel</a></li>
          <li><a href="/menu" class="hover:text-yellow-400">Baklava</a></li>
          <li><a href="/halal" class="hover:text-yellow-400">Halal Certified</a></li>
        </ul>
      </div>

      <!-- Blog -->
      <div>
        <h3 class="text-xl font-bold text-white mb-4">Blog</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="/blog-posts" class="hover:text-yellow-400">All Posts</a></li>
          <li><a href="/blog-posts/what-is-falafel-what-is-it-made-from-which-cuisine" class="hover:text-yellow-400">About Falafel</a></li>
          <li><a href="/blog-posts/halal-what-does-it-mean" class="hover:text-yellow-400">What is Halal?</a></li>
          <li><a href="/blog-posts/shawarma-vs-doner-kebab" class="hover:text-yellow-400">Shawarma vs Doner</a></li>
        </ul>
      </div>

      <!-- Contact & Order -->
      <div>
        <h3 class="text-xl font-bold text-white mb-4">Visit Us</h3>
        <ul class="space-y-2 text-sm">
          <li>
            <a href="https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv" target="_blank" rel="noopener noreferrer" class="btn btn-primary text-sm px-4 py-2">
              Order Online
            </a>
          </li>
          <li class="mt-4 text-sm text-gray-400">
            3615 S Las Vegas Blvd #101<br>
            Las Vegas, NV 89109<br>
            <a href="tel:+17259008844" class="hover:text-yellow-400 block mt-1">(725) 900-8844</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-gray-700 mt-12 pt-6 text-center text-xs text-gray-500">
      ${new Date().getFullYear()} Istanbul Mediterranean. All rights reserved.
    </div>
  </footer>

  <!-- JavaScript for React fallback -->
  <script>
    // If user navigates to other pages, load React app
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      if (link && link.href && link.href.startsWith(window.location.origin) && !link.target) {
        // Let React router handle internal navigation
        window.location.href = link.href;
      }
    });
  </script>
</body>
</html>`;
}

generateStaticPages();
