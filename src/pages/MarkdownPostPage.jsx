import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import matter from 'gray-matter';
import { marked } from 'marked';

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
        setContent(marked(content));
      })
      .catch(() => setNotFound(true));
  }, [mdPath]);

  if (notFound) return <div className="min-h-screen flex items-center justify-center">Not found</div>;
  if (!content) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;

  return (
    <>
      <Helmet>
        <title>{meta.title} | Istanbul Mediterranean</title>
        <meta name="description" content={meta.excerpt} />
        <link rel="canonical" href={`https://www.istanbullv.com${window.location.pathname}`} />
        {meta.cover && <meta property="og:image" content={meta.cover} />}
      </Helmet>
      {meta.cover && (
        <div className="w-full h-60 md:h-96 overflow-hidden mb-10 rounded-3xl shadow-lg">
          <img src={meta.cover} alt={meta.title} className="w-full h-full object-cover" />
        </div>
      )}
      <article className="prose mx-auto py-12 px-4 sm:px-0 bg-white rounded-xl shadow">
        <h1>{meta.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </>
  );
}
