import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogPosts';
import RelatedLinks from '../components/RelatedLinks';

function getRelatedLinks(currentSlug) {
  // Define some curated related links for each main post
  const relatedMap = {
    'baklava-unwrapped': [
      { to: '/shawarma', title: 'Shawarma: Everything You Need to Know', description: 'Dive into the history and flavors of shawarma.' },
      { to: '/turkish-food', title: 'Turkish Food: A Mediterranean Treasure', description: 'Explore the staples of Turkish culinary heritage.' },
      { to: '/blog-posts/what-is-falafel-what-is-it-made-from-which-cuisine', title: 'Falafel: Origins and Ingredients', description: 'Discover why falafel is a global vegan favorite.' },
    ],
    'what-is-falafel-what-is-it-made-from-which-cuisine': [
      { to: '/shawarma', title: 'Shawarma: Everything You Need to Know', description: 'Dive into the history and flavors of shawarma.' },
      { to: '/blog-posts/baklava-unwrapped', title: 'Baklava: The Sweetest Legacy', description: 'Uncover the rich history of baklava from empire to table.' },
      { to: '/turkish-food', title: 'Turkish Food: A Mediterranean Treasure', description: 'Explore the staples of Turkish culinary heritage.' },
    ],
    'shawarma-vs-doner-kebab': [
      { to: '/blog-posts/baklava-unwrapped', title: 'Baklava: The Sweetest Legacy', description: 'Uncover the rich history of baklava from empire to table.' },
      { to: '/turkish-food', title: 'Turkish Food: A Mediterranean Treasure', description: 'Explore the staples of Turkish culinary heritage.' },
      { to: '/blog-posts/what-is-falafel-what-is-it-made-from-which-cuisine', title: 'Falafel: Origins and Ingredients', description: 'Discover why falafel is a global vegan favorite.' },
    ],
    // Default fallback:
    'default': [
      { to: '/shawarma', title: 'Shawarma: Everything You Need to Know', description: 'Dive into the history and flavors of shawarma.' },
      { to: '/blog-posts/baklava-unwrapped', title: 'Baklava: The Sweetest Legacy', description: 'Uncover the rich history of baklava from empire to table.' },
      { to: '/turkish-food', title: 'Turkish Food: A Mediterranean Treasure', description: 'Explore the staples of Turkish culinary heritage.' },
    ]
  };
  return relatedMap[currentSlug] || relatedMap['default'];
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return <p>Post not found</p>;

  // Fallbacks
  const coverSrc = post.cover || post.image || '/default-cover.jpg';
  const author = post.author || 'Istanbul Mediterranean';
  const readingTime = post.readingTime || Math.ceil((post.content || '').split(' ').length / 200) || 1;

  // Only generate TOC if contentHtml exists
  const tableOfContents = post.contentHtml ? (typeof toc === 'function' ? toc(post.contentHtml) : []) : [];

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-6 sticky top-4 z-30">
        <Link to="/blog-posts" className="inline-flex items-center text-primary hover:text-istanbulRed font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-istanbulRed rounded-lg px-2 py-1 bg-white/80 shadow-md">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back to Blog
        </Link>
      </div>
      <Helmet>
        <title>{post.title} | Istanbul Mediterranean Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={coverSrc} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://istanbullv.com/blog-posts/${post.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={coverSrc} />
        <link rel="canonical" href={`https://istanbullv.com/blog-posts/${post.slug}`} />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "${post.title}",
            "image": "${coverSrc}",
            "author": {"@type": "Person", "name": "${author}"},
            "publisher": {"@type": "Organization", "name": "Istanbul Mediterranean", "logo": {"@type": "ImageObject", "url": "https://istanbullv.com/logo.png"}},
            "datePublished": "${post.date}",
            "description": "${post.excerpt}"
          }
        `}</script>
      </Helmet>

      {/* Hero Section */}
      <motion.div
        className="relative h-72 md:h-96 rounded-xl overflow-hidden mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={coverSrc}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center px-4">
            {post.title}
          </h1>
        </div>
      </motion.div>

      {/* Meta & TOC Grid */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center gap-4 text-sm text-charcoal flex-wrap">
          <span className="inline-flex items-center gap-1"><svg className="w-4 h-4 inline-block text-herb" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>{post.date}</span>
          <span className="inline-flex items-center gap-1"><svg className="w-4 h-4 inline-block text-herb" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>{readingTime} min read</span>
          <span className="inline-flex items-center gap-1"><svg className="w-4 h-4 inline-block text-herb" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7" r="4" /><path d="M5.5 21a7.5 7.5 0 0 1 13 0" /></svg>by {author}</span>
        </div>
        {/* TOC placeholder or actual TOC if contentHtml exists */}
        {post.contentHtml && tableOfContents.length > 0 && (
          <nav className="hidden md:block">
            <h2 className="font-semibold text-primary mb-2">On This Page</h2>
            <ul className="space-y-2 text-charcoal">
              {tableOfContents.map(item => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="hover:text-primary">{item.text}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Content */}
      <div className="prose prose-lg prose-primary max-w-none dark:prose-invert">
        {post.contentHtml ? (
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({node, ...props}) => <h1 className="mt-12 mb-4 text-4xl font-extrabold text-primary" {...props} />,
              h2: ({node, ...props}) => <h2 className="mt-10 mb-3 text-3xl font-bold text-istanbulRed" {...props} />,
              h3: ({node, ...props}) => <h3 className="mt-8 mb-2 text-2xl font-semibold text-herb" {...props} />,
              table: ({node, ...props}) => <table className="w-full my-6 border-collapse border border-herb/30 rounded-lg overflow-x-auto text-sm" {...props} />,
              th: ({node, ...props}) => <th className="bg-herb/10 px-3 py-2 border border-herb/20 font-semibold" {...props} />,
              td: ({node, ...props}) => <td className="px-3 py-2 border border-herb/10" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-istanbulRed pl-4 italic text-herb bg-offwhite/50 my-6 py-2" {...props} />,
              code({node, inline, className, children, ...props}) {
                return !inline ? (
                  <SyntaxHighlighter
                    style={materialLight}
                    language={className?.replace('language-', '')}
                    PreTag="div"
                    className="rounded-lg my-4"
                    {...props}
                  >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
                ) : (
                  <code className="bg-herb/10 rounded px-1 py-0.5 text-sm" {...props}>{children}</code>
                );
              },
              img: ({node, ...props}) => <img className="rounded-lg shadow my-6 mx-auto max-h-80" loading="lazy" alt={props.alt || ''} {...props} />,
              a: ({node, ...props}) => <a className="text-istanbulRed underline hover:text-primary" rel="noopener noreferrer" target="_blank" {...props} />,
              details: ({node, ...props}) => <details className="bg-herb/5 rounded-lg my-4 p-4 border border-herb/20" {...props} />,
              summary: ({node, ...props}) => <summary className="font-semibold cursor-pointer text-primary" {...props} />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        )}
      </div>

      {/* Related Links */}
      <RelatedLinks
        links={getRelatedLinks(slug)}
      />

      {/* Back to Blog */}
      <div className="mt-12 text-center">
        <Link to="/blog-posts" className="text-primary hover:underline">← Back to Blog</Link>
      </div>
    </article>
  );
}
