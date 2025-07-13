import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import matter from 'gray-matter';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export default function MarkdownPostPage({ mdPath }) {
  const [content, setContent] = useState('');
  const [meta, setMeta] = useState({ title: '', excerpt: '', cover: '' });
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(mdPath)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then(raw => {
        const { data, content } = matter(raw);
        setMeta({
          title: data.title || '',
          excerpt: data.excerpt || '',
          cover: data.cover || ''
        });
        setContent(DOMPurify.sanitize(marked(content)));
      })
      .catch(() => setNotFound(true));
  }, [mdPath]);

  if (notFound) return <div className="min-h-screen flex items-center justify-center">Not found</div>;
  if (!content) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Helmet>
        <title>{meta.title} | Istanbul Mediterranean</title>
        <meta name="description" content={meta.excerpt} />
        <link rel="canonical" href={`https://www.istanbullv.com${window.location.pathname}`} />
        {meta.cover && <meta property="og:image" content={meta.cover} />}
      </Helmet>
      
      {/* Hero Section with Cover Image */}
      {meta.cover && (
        <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
          <img 
            src={meta.cover} 
            alt={meta.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                {meta.title}
              </h1>
              {meta.excerpt && (
                <p className="text-lg md:text-xl text-white/90 max-w-3xl drop-shadow">
                  {meta.excerpt}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <article className="max-w-4xl mx-auto">
          {/* Title for pages without cover image */}
          {!meta.cover && (
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {meta.title}
              </h1>
              {meta.excerpt && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {meta.excerpt}
                </p>
              )}
            </div>
          )}
          
          {/* Blog Content */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12">
            <div 
              className="prose prose-lg max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h1:text-3xl prose-h1:mb-6 prose-h1:text-red-600
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-orange-600
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-orange-500
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-red-600 prose-a:font-semibold hover:prose-a:text-red-700
                prose-strong:text-gray-900 prose-strong:font-bold
                prose-ul:my-6 prose-li:my-2 prose-li:text-gray-700
                prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:bg-green-50
                prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:my-6
                prose-img:rounded-lg prose-img:shadow-md
              "
              dangerouslySetInnerHTML={{ __html: content }} 
            />
            
            {/* Call to Action Section */}
            <div className="mt-12 p-6 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Experience Authentic Mediterranean Cuisine?</h3>
              <p className="text-lg mb-6 opacity-90">
                Visit Istanbul Mediterranean at Grand Bazaar Shops, Horseshoe Hotel or order online for pickup/delivery!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://orderdoner.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
                >
                  Order Online Now
                </a>
                <a 
                  href="/contact" 
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-red-600 transition-colors"
                >
                  Visit Our Location
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
