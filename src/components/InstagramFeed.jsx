import React, { useState, useEffect } from 'react';
import { FaInstagram, FaHeart, FaComment, FaExternalLinkAlt } from 'react-icons/fa';

export default function InstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Instagram Graph API configuration
  const INSTAGRAM_ACCESS_TOKEN = process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN;
  const INSTAGRAM_USER_ID = process.env.REACT_APP_INSTAGRAM_USER_ID;

  useEffect(() => {
    fetchInstagramPosts();
  }, []);

  const fetchInstagramPosts = async () => {
    if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_USER_ID) {
      setError('Instagram API credentials not configured');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,like_count,comments_count,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=12`
      );

      if (!response.ok) {
        throw new Error(`Instagram API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Filter for images and videos only
      const filteredPosts = data.data.filter(post => 
        post.media_type === 'IMAGE' || post.media_type === 'VIDEO'
      );

      setPosts(filteredPosts);
      setLoading(false);
    } catch (err) {
      console.error('Instagram API Error:', err);
      setError('Failed to load Instagram posts');
      setLoading(false);
    }
  };

  const formatCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count?.toString() || '0';
  };

  const truncateCaption = (caption, maxLength = 100) => {
    if (!caption) return '';
    return caption.length > maxLength 
      ? `${caption.substring(0, maxLength)}...` 
      : caption;
  };

  if (loading) {
    return (
      <section className="py-16 bg-offwhite">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Follow Us on Instagram
            </h2>
            <p className="text-charcoal text-lg">@istanbulinvegas</p>
          </div>
          
          {/* Loading skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-offwhite">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Follow Us on Instagram
            </h2>
            <p className="text-charcoal text-lg mb-6">@istanbulinvegas</p>
            
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
              <FaInstagram className="text-6xl text-pink-500 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Follow us on Instagram to see our latest dishes and behind-the-scenes content!
              </p>
              <a 
                href="https://www.instagram.com/istanbulinvegas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary inline-flex items-center gap-2"
              >
                <FaInstagram />
                Follow @istanbulinvegas
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-offwhite">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Follow Us on Instagram
          </h2>
          <p className="text-charcoal text-lg mb-6">
            See our latest delicious creations and behind-the-scenes moments
          </p>
          <a 
            href="https://www.instagram.com/istanbulmediterraneanlv" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 font-semibold transition-colors"
          >
            <FaInstagram className="text-xl" />
            @istanbulinvegas
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="group relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Image/Video */}
              <img
                src={post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url}
                alt={truncateCaption(post.caption, 50)}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              
              {/* Video indicator */}
              {post.media_type === 'VIDEO' && (
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                  VIDEO
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  {/* Engagement stats */}
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <FaHeart className="text-red-400" />
                      <span className="font-medium">{formatCount(post.like_count)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaComment className="text-blue-400" />
                      <span className="font-medium">{formatCount(post.comments_count)}</span>
                    </div>
                  </div>
                  
                  {/* Caption preview */}
                  {post.caption && (
                    <p className="text-sm opacity-90 mb-3 line-clamp-2">
                      {truncateCaption(post.caption, 80)}
                    </p>
                  )}
                  
                  {/* View on Instagram link */}
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-full text-sm font-medium transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaExternalLinkAlt className="text-xs" />
                    View on Instagram
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="text-center">
          <a 
            href="https://www.instagram.com/istanbulmediterraneanlv" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center gap-2 text-lg px-8 py-3"
          >
            <FaInstagram />
            Follow for More Delicious Content
          </a>
        </div>
      </div>
    </section>
  );
}