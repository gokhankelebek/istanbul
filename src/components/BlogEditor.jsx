import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BlogEditor = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    slug: '',
    title: '',
    excerpt: '',
    date: new Date().toISOString().split('T')[0],
    image: '/blog-default.jpg',
    content: `# Your New Blog Post

## Introduction
Start with a compelling introduction here...

## Main Content
Add your main content sections here...

## Conclusion
Wrap up with a strong conclusion...

---

*Tags: mediterranean, food, istanbul*`
  });

  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState(false);
  const [slugError, setSlugError] = useState('');

  // Generate slug from title
  useEffect(() => {
    if (post.title && !post.slug) {
      const generatedSlug = post.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      setPost(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [post.title]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
    
    if (name === 'slug') {
      // Validate slug format
      const slugRegex = /^[a-z0-9-]+$/;
      if (!slugRegex.test(value) && value) {
        setSlugError('Slug can only contain lowercase letters, numbers, and hyphens');
      } else {
        setSlugError('');
      }
    }
  };

  const handleSave = () => {
    // In a real implementation, this would save to a database or file system
    // For now, we'll just simulate saving by adding to blogPosts array in localStorage
    
    const existingPosts = JSON.parse(localStorage.getItem('draftBlogPosts') || '[]');
    const updatedPosts = [...existingPosts, post];
    localStorage.setItem('draftBlogPosts', JSON.stringify(updatedPosts));
    
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 3000);
    
    // In a real implementation, you might redirect to the new post
    // navigate(`/blog-posts/${post.slug}`);
  };

  const handleExport = () => {
    // Create markdown content with frontmatter
    const frontmatter = `---
title: "${post.title}"
date: "${post.date}"
excerpt: "${post.excerpt}"
cover: "${post.image}"
---

${post.content}`;

    // Create a downloadable file
    const blob = new Blob([frontmatter], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${post.slug}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Blog Post Editor</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setPreview(!preview)}
            className={`px-4 py-2 rounded font-medium ${
              preview 
                ? 'bg-white text-primary border border-primary' 
                : 'bg-primary text-white'
            }`}
          >
            {preview ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-green-600 text-white font-medium hover:bg-green-700"
          >
            Save Draft
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded bg-istanbulRed text-white font-medium hover:bg-red-700"
          >
            Export Markdown
          </button>
        </div>
      </div>

      {saved && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Draft saved successfully!
        </div>
      )}

      {preview ? (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
            <img
              src={post.image || '/blog-default.jpg'}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => (e.target.src = '/blog-default.jpg')}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white text-center px-4">
                {post.title || 'Your Blog Post Title'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-charcoal mb-8">
            <span className="inline-flex items-center gap-1">
              <svg className="w-4 h-4 inline-block text-herb" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <svg className="w-4 h-4 inline-block text-herb" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
              </svg>
              {Math.ceil(post.content.split(' ').length / 200) || 1} min read
            </span>
          </div>

          <div className="prose prose-lg max-w-none text-charcoal">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={materialLight}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={post.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Your blog post title"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                Slug (URL)
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={post.slug}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                  slugError ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your-blog-post-url"
              />
              {slugError && <p className="mt-1 text-sm text-red-600">{slugError}</p>}
              <p className="mt-1 text-xs text-gray-500">
                This will be the URL: /blog-posts/{post.slug || 'your-blog-post-url'}
              </p>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Publication Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={post.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Featured Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={post.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="/path/to/image.jpg"
              />
              <div className="mt-2 h-32 bg-gray-100 rounded overflow-hidden">
                <img
                  src={post.image || '/blog-default.jpg'}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = '/blog-default.jpg')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={post.excerpt}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="A brief summary of your post"
              ></textarea>
            </div>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content (Markdown)
            </label>
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleChange}
              rows="20"
              className="w-full px-4 py-2 border border-gray-300 rounded-md font-mono text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            ></textarea>
            <div className="mt-2 text-xs text-gray-500">
              <p>Use Markdown to format your post:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li># Heading 1, ## Heading 2, ### Heading 3</li>
                <li>**Bold**, *Italic*, ~~Strikethrough~~</li>
                <li>[Link](https://example.com)</li>
                <li>![Image Alt Text](image-url.jpg)</li>
                <li>- Bullet points</li>
                <li>1. Numbered list</li>
                <li>```code blocks```</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;
