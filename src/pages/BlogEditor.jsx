import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const GITHUB_API_BASE = 'https://api.github.com';

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function formatDate(date = new Date()) {
  return date.toISOString().split('T')[0];
}

function createMarkdownContent(formData) {
  const tags = formData.tags
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean)
    .map(tag => `"${tag}"`)
    .join(', ');

  return `---
title: "${formData.title}"
slug: "${formData.slug}"
date: "${formData.date}"
excerpt: "${formData.excerpt}"
cover: "${formData.cover}"
author: "${formData.author}"
tags: [${tags}]
---

${formData.content}`;
}

export default function BlogEditor() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    date: formatDate(),
    excerpt: '',
    cover: '',
    author: 'Istanbul Mediterranean Team',
    tags: 'mediterranean, food, las vegas',
    content: '# Your Blog Post Title\n\nStart writing your content here...'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [githubToken, setGithubToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Auto-generate slug when title changes
  useEffect(() => {
    if (formData.title) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(formData.title)
      }));
    }
  }, [formData.title]);

  // Load GitHub token from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('github_token');
    const savedAuth = localStorage.getItem('blog_editor_auth');
    if (savedToken) {
      setGithubToken(savedToken);
    }
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = () => {
    if (password === 'istanbul2025') {
      setIsAuthenticated(true);
      localStorage.setItem('blog_editor_auth', 'true');
      setSubmitStatus({ type: 'success', message: 'Access granted! You can now create blog posts.' });
    } else {
      setSubmitStatus({ type: 'error', message: 'Incorrect password. Please try again.' });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTokenSave = () => {
    localStorage.setItem('github_token', githubToken);
    setSubmitStatus({ type: 'success', message: 'GitHub token saved securely in browser!' });
  };

  const submitToGitHub = async () => {
    if (!githubToken) {
      setSubmitStatus({ type: 'error', message: 'Please enter your GitHub token first!' });
      return;
    }

    if (!formData.title || !formData.content) {
      setSubmitStatus({ type: 'error', message: 'Title and content are required!' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: 'info', message: 'Creating blog post...' });

    try {
      const filename = `${formData.slug}.md`;
      const markdownContent = createMarkdownContent(formData);
      
      // Encode content for GitHub API
      const encodedContent = btoa(unescape(encodeURIComponent(markdownContent)));
      
      const response = await fetch(`${GITHUB_API_BASE}/repos/gokhankelebek/istanbul/contents/content/blog/${filename}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Add blog post: ${formData.title}

🚀 Generated with Istanbul Mediterranean Blog Editor

Co-Authored-By: Istanbul Mediterranean Team <noreply@istanbullv.com>`,
          content: encodedContent,
          branch: 'main'
        })
      });

      if (response.ok) {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Blog post created successfully! It will appear on the website after the next deployment.' 
        });
        
        // Reset form
        setFormData({
          title: '',
          slug: '',
          date: formatDate(),
          excerpt: '',
          cover: '',
          author: 'Istanbul Mediterranean Team',
          tags: 'mediterranean, food, las vegas',
          content: '# Your Blog Post Title\n\nStart writing your content here...'
        });
      } else {
        const error = await response.json();
        setSubmitStatus({ 
          type: 'error', 
          message: `Failed to create blog post: ${error.message}` 
        });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: `Error: ${error.message}` 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewContent = () => {
    return createMarkdownContent(formData);
  };

  // Show password screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center">
        <Helmet>
          <title>Blog Editor Access - Istanbul Mediterranean</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary mb-2">Blog Editor Access</h1>
            <p className="text-charcoal">Enter password to continue</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                placeholder="Enter access password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <button
              onClick={handlePasswordSubmit}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-istanbulRed transition-colors"
            >
              Access Editor
            </button>
          </div>
          
          {submitStatus && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              submitStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
              'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {submitStatus.message}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <Helmet>
        <title>Blog Editor - Istanbul Mediterranean</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">Blog Post Editor</h1>
          <p className="text-charcoal">Create new blog posts for Istanbul Mediterranean</p>
        </div>

        {/* GitHub Token Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">GitHub Access</h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-charcoal mb-2">
                GitHub Personal Access Token
              </label>
              <input
                type="password"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Need a token? <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Create one here</a> with 'repo' permissions
              </p>
            </div>
            <button
              onClick={handleTokenSave}
              className="px-4 py-2 bg-herb text-white rounded-lg hover:bg-herb/80 transition-colors"
            >
              Save Token
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Blog Post Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Your amazing blog post title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Slug (URL)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="your-blog-post-url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Will be: /blog-posts/{formData.slug}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Excerpt *</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief description for previews and SEO (keep under 160 characters)"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/160 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Cover Image</label>
                <input
                  type="text"
                  value={formData.cover}
                  onChange={(e) => handleInputChange('cover', e.target.value)}
                  placeholder="/menu/gyros.png"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Tags</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="mediterranean, food, las vegas"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Comma-separated keywords</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Content</h2>
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="px-3 py-1 text-sm bg-gray-100 text-charcoal rounded hover:bg-gray-200 transition-colors"
              >
                {previewMode ? 'Edit' : 'Preview'}
              </button>
            </div>

            {previewMode ? (
              <div className="border border-gray-300 rounded-lg p-4 h-96 overflow-y-auto bg-gray-50">
                <pre className="whitespace-pre-wrap text-sm">{previewContent()}</pre>
              </div>
            ) : (
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Write your blog post content using Markdown..."
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
              />
            )}
          </div>
        </div>

        {/* Status Messages */}
        {submitStatus && (
          <div className={`mt-6 p-4 rounded-lg ${
            submitStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
            submitStatus.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
            'bg-blue-50 text-blue-800 border border-blue-200'
          }`}>
            {submitStatus.message}
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            onClick={submitToGitHub}
            disabled={isSubmitting || !githubToken}
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-istanbulRed transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating Blog Post...' : 'Publish Blog Post'}
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Quick Tips</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Use Markdown syntax for formatting (# for headers, ** for bold, etc.)</li>
            <li>• Keep excerpts under 160 characters for better SEO</li>
            <li>• Common cover images: /menu/gyros.png, /menu/desserts/baklava.webp</li>
            <li>• End posts with a call-to-action mentioning Istanbul Mediterranean</li>
            <li>• Your post will appear after the website is rebuilt (usually within minutes)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}