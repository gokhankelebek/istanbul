import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toc from '../utils/generateToc'; // hypothetical TOC generator
import postsData from '../data/blogPosts.json';

export default function BlogPost() {
  const { slug } = useParams();
  const post = postsData.find(p => p.slug === slug);
  if (!post) return <p>Post not found</p>;

  // Generate table of contents from HTML
  const tableOfContents = toc(post.contentHtml);

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>{post.title} | Istanbul Mediterranean Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.cover} />
      </Helmet>

      {/* Hero Section */}
      <motion.div
        className="relative h-72 md:h-96 rounded-xl overflow-hidden mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={post.cover}
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
      <div className="md:grid md:grid-cols-4 md:gap-8 mb-12">
        {/* Post Meta */}
        <div className="mb-8 md:mb-0">
          <p className="text-sm text-charcoal">{post.date} • {post.readingTime} min read</p>
          <p className="mt-2 text-sm text-charcoal">By {post.author}</p>
          {/* Social Share Buttons */}
          <div className="mt-4 flex space-x-3">
            {['twitter','facebook','linkedin'].map(platform => (
              <a
                key={platform}
                href={`https://share.${platform}.com?url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal hover:text-primary"
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </a>
            ))}
          </div>
        </div>

        {/* Table of Contents */}
        <nav className="hidden md:block col-span-3 sticky top-24">
          <h2 className="font-semibold text-primary mb-2">On This Page</h2>
          <ul className="space-y-2 text-charcoal">
            {tableOfContents.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="hover:text-primary"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Content */}
      <div
        className="prose prose-lg prose-primary max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* Related Posts */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-primary mb-6">Related Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {postsData.filter(p => p.slug !== slug).slice(0, 2).map(p => (
            <Link key={p.slug} to={`/blog-posts/${p.slug}`} className="group block">
              <img
                src={p.cover}
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
