import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

/**
 * SocialMetaTags Component
 * 
 * Generates Open Graph and Twitter Card meta tags for improved social media sharing
 * and SEO. These tags control how URLs are displayed when shared on social media.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.image - URL to the image (absolute path)
 * @param {string} props.url - Canonical URL of the page (defaults to current URL)
 * @param {string} props.type - Open Graph type (defaults to 'website')
 * @param {string} props.twitterCard - Twitter card type (defaults to 'summary_large_image')
 * @param {string} props.siteName - Website name (defaults to 'Istanbul Mediterranean')
 * @param {string} props.locale - Content locale (defaults to 'en_US')
 * @param {Array} props.additionalMetaTags - Additional meta tags to include
 */
const SocialMetaTags = ({
  title,
  description,
  image,
  url,
  type = 'website',
  twitterCard = 'summary_large_image',
  siteName = 'Istanbul Mediterranean',
  locale = 'en_US',
  additionalMetaTags = []
}) => {
  // Use current URL if not provided
  const pageUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  
  // Ensure image URL is absolute
  const imageUrl = image && !image.startsWith('http') && typeof window !== 'undefined'
    ? `${window.location.origin}${image.startsWith('/') ? '' : '/'}${image}`
    : image;
  
  return (
    <Helmet>
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      
      {/* Additional Meta Tags */}
      {additionalMetaTags.map((tag, index) => (
        <meta key={`meta-tag-${index}`} {...tag} />
      ))}
    </Helmet>
  );
};

SocialMetaTags.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  twitterCard: PropTypes.string,
  siteName: PropTypes.string,
  locale: PropTypes.string,
  additionalMetaTags: PropTypes.arrayOf(PropTypes.object)
};

export default SocialMetaTags;
