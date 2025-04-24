import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import postsData from '../data/blogPosts.json';

export default function BlogPost() {
  const { slug } = useParams();
  const post = postsData.find(p => p.slug === slug);
  if (!post) return <p>Post not found</p>;

  // Fallbacks
  const coverSrc = post.cover || post.image || '/default-cover.jpg';
  const author = post.author || 'Istanbul Mediterranean';
  const readingTime = post.readingTime || Math.ceil((post.content || '').split(' ').length / 200) || 1;

  // Only generate TOC if contentHtml exists
  const tableOfContents = post.contentHtml ? (typeof toc === 'function' ? toc(post.contentHtml) : []) : [];

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>{post.title} | Istanbul Mediterranean Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={coverSrc} />
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
        <div className="text-sm text-charcoal">
          {post.date} • {readingTime} min read • by {author}
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
      <div className="prose prose-lg prose-primary max-w-none">
        {post.contentHtml
          ? <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          : <ReactMarkdown>{post.content}</ReactMarkdown>
        }
      </div>

      {/* Related Posts */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-primary mb-6">Related Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {postsData.filter(p => p.slug !== slug).slice(0, 2).map(p => (
            <Link key={p.slug} to={`/blog-posts/${p.slug}`} className="group block">
              <img
                src={p.cover || p.image}
                alt={p.title}
                className="w-full h-48 object-cover rounded-lg mb-4 transition-transform group-hover:scale-105"
              />
              <h3 className="text-xl font-semibold group-hover:text-primary">{p.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Back to Blog */}
      <div className="mt-12 text-center">
        <Link to="/blog-posts" className="text-primary hover:underline">← Back to Blog</Link>
      </div>
    </article>
  );
}
