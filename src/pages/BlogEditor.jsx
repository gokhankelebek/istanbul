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
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [contentType, setContentType] = useState('markdown');
  const [pdfFile, setPdfFile] = useState(null);
  const [textContent, setTextContent] = useState('');

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

  const uploadImageToGitHub = async (file) => {
    if (!githubToken) {
      throw new Error('GitHub token is required for image upload');
    }

    const filename = `${Date.now()}-${file.name}`;
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
      reader.onload = async (e) => {
        try {
          const content = e.target.result.split(',')[1]; // Remove data:image/... prefix
          
          const response = await fetch(`${GITHUB_API_BASE}/repos/gokhankelebek/istanbul/contents/public/blog-images/${filename}`, {
            method: 'PUT',
            headers: {
              'Authorization': `token ${githubToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: `Upload blog image: ${filename}`,
              content: content,
              branch: 'main'
            })
          });

          if (response.ok) {
            const result = await response.json();
            resolve(`/blog-images/${filename}`);
          } else {
            const error = await response.json();
            reject(new Error(error.message || 'Failed to upload image'));
          }
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setSubmitStatus({ type: 'error', message: 'Please select an image file' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setSubmitStatus({ type: 'error', message: 'Image size must be less than 5MB' });
      return;
    }

    setImageFile(file);
    setSubmitStatus({ type: 'info', message: 'Uploading image...' });

    try {
      const imageUrl = await uploadImageToGitHub(file);
      setUploadedImageUrl(imageUrl);
      setSubmitStatus({ type: 'success', message: 'Image uploaded successfully! You can now use it in your post.' });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: `Failed to upload image: ${error.message}` });
    }
  };

  const convertPdfToText = async (file) => {
    // For now, we'll ask the user to copy-paste the text content
    // In a production environment, you'd want to use a PDF parsing library
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        // This is a simplified approach - in reality you'd need a PDF parser
        resolve('Please copy and paste the text content from your PDF into the text content field.');
      };
      reader.readAsText(file);
    });
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setSubmitStatus({ type: 'error', message: 'Please select a PDF file' });
      return;
    }

    setPdfFile(file);
    setSubmitStatus({ type: 'info', message: 'PDF uploaded. Please copy and paste the text content into the text content field below.' });
  };

  const getContentForSubmission = () => {
    switch (contentType) {
      case 'text':
        return textContent || 'No content provided';
      case 'pdf':
        return textContent || 'PDF content - please add text content manually';
      case 'markdown':
      default:
        return formData.content;
    }
  };

  const submitToGitHub = async () => {
    if (!githubToken) {
      setSubmitStatus({ type: 'error', message: 'Please enter your GitHub token first! You can create one at https://github.com/settings/tokens with "repo" permissions.' });
      return;
    }

    if (!formData.title) {
      setSubmitStatus({ type: 'error', message: 'Title is required!' });
      return;
    }

    const content = getContentForSubmission();
    if (!content || content.trim() === '') {
      setSubmitStatus({ type: 'error', message: 'Content is required!' });
      return;
    }

    // Validate GitHub token format
    if (!githubToken.startsWith('ghp_') && !githubToken.startsWith('github_pat_')) {
      setSubmitStatus({ type: 'error', message: 'Invalid GitHub token format. Token should start with "ghp_" or "github_pat_"' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: 'info', message: 'Creating blog post...' });

    try {
      // First, test the GitHub token
      const testResponse = await fetch(`${GITHUB_API_BASE}/user`, {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Content-Type': 'application/json',
        }
      });

      if (!testResponse.ok) {
        const error = await testResponse.json();
        throw new Error(`GitHub token validation failed: ${error.message || 'Invalid token'}`);
      }

      const filename = `${formData.slug}.md`;
      const contentForPost = {
        ...formData,
        content: getContentForSubmission()
      };
      const markdownContent = createMarkdownContent(contentForPost);
      
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
          cover: uploadedImageUrl || '',
          author: 'Istanbul Mediterranean Team',
          tags: 'mediterranean, food, las vegas',
          content: '# Your Blog Post Title\n\nStart writing your content here...'
        });
        setTextContent('');
        setPdfFile(null);
        setImageFile(null);
        setUploadedImageUrl('');
        setContentType('markdown');
      } else {
        const error = await response.json();
        let errorMessage = error.message || 'Unknown error';
        
        if (response.status === 401) {
          errorMessage = 'Bad credentials - please check your GitHub token';
        } else if (response.status === 403) {
          errorMessage = 'Insufficient permissions - please ensure your token has "repo" permissions';
        } else if (response.status === 409) {
          errorMessage = 'A blog post with this slug already exists';
        }
        
        setSubmitStatus({ 
          type: 'error', 
          message: `Failed to create blog post: ${errorMessage}` 
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
                <div className="space-y-2">
                  <input
                    type="text"
                    value={formData.cover}
                    onChange={(e) => handleInputChange('cover', e.target.value)}
                    placeholder="/menu/gyros.png or use upload below"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <div className="flex items-center gap-2">
                    <label className="block text-sm text-gray-600">Or upload new image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="text-sm text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-istanbulRed"
                    />
                  </div>
                  {uploadedImageUrl && (
                    <div className="text-sm text-green-600">
                      ✓ Image uploaded: {uploadedImageUrl}
                      <button
                        onClick={() => handleInputChange('cover', uploadedImageUrl)}
                        className="ml-2 text-primary hover:underline"
                      >
                        Use as cover
                      </button>
                    </div>
                  )}
                </div>
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
              <div className="flex gap-2">
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="markdown">Markdown</option>
                  <option value="text">Plain Text</option>
                  <option value="pdf">PDF Upload</option>
                </select>
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="px-3 py-1 text-sm bg-gray-100 text-charcoal rounded hover:bg-gray-200 transition-colors"
                >
                  {previewMode ? 'Edit' : 'Preview'}
                </button>
              </div>
            </div>

            {/* Content Type Specific Inputs */}
            {contentType === 'pdf' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-charcoal mb-2">Upload PDF</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfUpload}
                  className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-istanbulRed"
                />
                {pdfFile && (
                  <div className="mt-2 text-sm text-green-600">
                    ✓ PDF uploaded: {pdfFile.name}
                  </div>
                )}
              </div>
            )}

            {contentType === 'text' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-charcoal mb-2">Text Content</label>
                <textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Write your blog post content as plain text..."
                  rows={15}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            )}

            {contentType === 'pdf' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-charcoal mb-2">PDF Text Content</label>
                <textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Copy and paste the text content from your PDF here..."
                  rows={15}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Please manually copy the text content from your PDF file and paste it here.</p>
              </div>
            )}

            {contentType === 'markdown' && (
              previewMode ? (
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
              )
            )}

            {/* Preview for text and PDF content */}
            {(contentType === 'text' || contentType === 'pdf') && previewMode && (
              <div className="border border-gray-300 rounded-lg p-4 h-96 overflow-y-auto bg-gray-50">
                <pre className="whitespace-pre-wrap text-sm">{textContent || 'No content yet...'}</pre>
              </div>
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
            <li>• <strong>Markdown:</strong> Use # for headers, ** for bold, * for italic, etc.</li>
            <li>• <strong>Text:</strong> Plain text will be formatted automatically</li>
            <li>• <strong>PDF:</strong> Upload PDF and copy-paste text content manually</li>
            <li>• <strong>Images:</strong> Upload new images or use existing ones like /menu/gyros.png</li>
            <li>• Keep excerpts under 160 characters for better SEO</li>
            <li>• Your post will appear after the website is rebuilt (usually within minutes)</li>
            <li>• <strong>GitHub Token:</strong> Create at <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">github.com/settings/tokens</a> with "repo" permissions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}