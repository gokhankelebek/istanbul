import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaPinterest, FaEnvelope, FaWhatsapp, FaLink, FaCheck } from 'react-icons/fa';

/**
 * SocialShare Component
 * 
 * A reusable component for social media sharing with tracking capabilities.
 * Improves SEO by encouraging social sharing and backlinks.
 * 
 * @param {Object} props - Component props
 * @param {string} props.url - URL to share (defaults to current URL)
 * @param {string} props.title - Title to share
 * @param {string} props.description - Description to share
 * @param {string} props.image - Image URL to share
 * @param {string} props.hashtags - Comma-separated hashtags
 * @param {string} props.via - Twitter via username (without @)
 * @param {Function} props.onShare - Callback when content is shared
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.iconSize - Size of social icons (sm, md, lg)
 * @param {boolean} props.showCounts - Whether to show share counts
 * @returns {JSX.Element} - Social share component
 */
const SocialShare = ({
  url = window.location.href,
  title = document.title,
  description = '',
  image = '',
  hashtags = '',
  via = '',
  onShare = () => {},
  className = '',
  iconSize = 'md',
  showCounts = false,
  vertical = false
}) => {
  const [copied, setCopied] = useState(false);
  const [counts, setCounts] = useState({
    facebook: 0,
    twitter: 0,
    linkedin: 0,
    pinterest: 0
  });

  // Get icon size class
  const getIconSizeClass = () => {
    switch (iconSize) {
      case 'sm': return 'text-lg';
      case 'lg': return 'text-3xl';
      default: return 'text-2xl';
    }
  };

  // Track share event
  const trackShare = (platform) => {
    // Send tracking event to Google Analytics
    if (window.gtag) {
      window.gtag('event', 'share', {
        method: platform,
        content_type: 'page',
        item_id: url
      });
    }
    
    // Call onShare callback
    onShare(platform, url);
    
    // Update local counts for UI
    if (showCounts) {
      setCounts(prev => ({
        ...prev,
        [platform]: prev[platform] + 1
      }));
    }
  };

  // Share handlers
  const shareFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
    window.open(shareUrl, 'facebook-share', 'width=580,height=296');
    trackShare('facebook');
  };

  const shareTwitter = () => {
    let shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    if (hashtags) shareUrl += `&hashtags=${encodeURIComponent(hashtags)}`;
    if (via) shareUrl += `&via=${encodeURIComponent(via)}`;
    window.open(shareUrl, 'twitter-share', 'width=550,height=235');
    trackShare('twitter');
  };

  const shareLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, 'linkedin-share', 'width=750,height=600');
    trackShare('linkedin');
  };

  const sharePinterest = () => {
    const shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(title)}`;
    window.open(shareUrl, 'pinterest-share', 'width=750,height=600');
    trackShare('pinterest');
  };

  const shareEmail = () => {
    const shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this page: ${url}`)}`;
    window.location.href = shareUrl;
    trackShare('email');
  };

  const shareWhatsApp = () => {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`;
    window.open(shareUrl, 'whatsapp-share', 'width=750,height=600');
    trackShare('whatsapp');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      trackShare('copy');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Determine container classes
  const containerClasses = `social-share-container ${vertical ? 'flex flex-col gap-3' : 'flex gap-3'} ${className}`;
  const iconClasses = `${getIconSizeClass()} transition-transform hover:scale-110`;

  return (
    <div className={containerClasses}>
      <button
        onClick={shareFacebook}
        className="social-share-button facebook-share p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        aria-label="Share on Facebook"
      >
        <FaFacebook className={iconClasses} />
        {showCounts && counts.facebook > 0 && <span className="share-count">{counts.facebook}</span>}
      </button>
      
      <button
        onClick={shareTwitter}
        className="social-share-button twitter-share p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
        aria-label="Share on Twitter"
      >
        <FaTwitter className={iconClasses} />
        {showCounts && counts.twitter > 0 && <span className="share-count">{counts.twitter}</span>}
      </button>
      
      <button
        onClick={shareLinkedIn}
        className="social-share-button linkedin-share p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin className={iconClasses} />
        {showCounts && counts.linkedin > 0 && <span className="share-count">{counts.linkedin}</span>}
      </button>
      
      {image && (
        <button
          onClick={sharePinterest}
          className="social-share-button pinterest-share p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
          aria-label="Share on Pinterest"
        >
          <FaPinterest className={iconClasses} />
          {showCounts && counts.pinterest > 0 && <span className="share-count">{counts.pinterest}</span>}
        </button>
      )}
      
      <button
        onClick={shareEmail}
        className="social-share-button email-share p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors"
        aria-label="Share via Email"
      >
        <FaEnvelope className={iconClasses} />
      </button>
      
      <button
        onClick={shareWhatsApp}
        className="social-share-button whatsapp-share p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
        aria-label="Share on WhatsApp"
      >
        <FaWhatsapp className={iconClasses} />
      </button>
      
      <button
        onClick={copyLink}
        className="social-share-button copy-link p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
        aria-label="Copy Link"
      >
        {copied ? <FaCheck className={iconClasses} /> : <FaLink className={iconClasses} />}
      </button>
    </div>
  );
};

export default SocialShare;
