import React from 'react';
import { useParams, Link } from 'react-router-dom';
import blogPosts from '../data/blogPosts.json';
import ReactMarkdown from 'react-markdown';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-saffron hover:underline">Back to Blog</Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron/10 via-offwhite to-herb/10 pb-16">
      {/* Hero Section */}
      <div className="relative h-64 md:h-96 flex items-end mb-[-64px] z-10">
        <img src={post.image || '/blog-default.jpg'} alt={post.title} className="absolute inset-0 w-full h-full object-cover object-center opacity-80" onError={e => e.target.src='/blog-default.jpg'} />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
        <div className="relative z-10 px-6 md:px-16 pb-8 w-full">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary drop-shadow mb-2">{post.title}</h1>
          <p className="text-md md:text-lg text-herb font-medium drop-shadow">{post.date}</p>
        </div>
      </div>
      {/* Content Card */}
      <div className="relative z-20 max-w-2xl mx-auto mt-[-48px] bg-offwhite rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="prose prose-lg md:prose-xl max-w-none text-charcoal prose-headings:text-primary prose-headings:font-extrabold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-p:leading-relaxed prose-p:text-charcoal prose-blockquote:border-l-4 prose-blockquote:border-saffron prose-blockquote:bg-saffron/10 prose-blockquote:pl-6 prose-blockquote:italic prose-a:text-saffron prose-a:underline hover:prose-a:text-primary prose-li:marker:text-saffron prose-img:rounded-xl prose-img:shadow-lg prose-img:max-w-full prose-img:h-auto prose-code:bg-herb/10 prose-code:px-1.5 prose-code:py-1 prose-code:rounded prose-code:text-primary prose-pre:bg-herb/10 prose-pre:p-4 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-table:border prose-table:border-herb/10 prose-th:bg-saffron/10 prose-th:text-primary prose-td:text-charcoal">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        <div className="mt-10 flex justify-center">
          <Link to="/blog" className="inline-block px-5 py-2 rounded bg-primary text-offwhite font-semibold shadow hover:bg-saffron hover:text-charcoal transition-colors duration-150">
            ← Back to Blog
          </Link>
        </div>
      </div>
      {/* Sticky Back Button for mobile */}
      <div className="fixed bottom-4 left-0 w-full flex justify-center z-50 md:hidden">
        <Link to="/blog" className="inline-block px-5 py-2 rounded-xl bg-primary text-offwhite font-bold shadow-lg hover:bg-saffron hover:text-charcoal transition-colors duration-150">
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}
