import React from 'react';
import { Helmet } from 'react-helmet';
import SEOValidator from './SEOValidator';

/**
 * SEOHead - A reusable component for consistent SEO implementation across pages
 * 
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.keywords - Meta keywords
 * @param {string} props.canonicalUrl - Canonical URL
 * @param {string} props.ogType - Open Graph type (default: website)
 * @param {string} props.ogImage - Open Graph image URL
 * @param {Object} props.schema - JSON-LD schema data
 * @param {React.ReactNode} props.children - Additional head elements
 */
export default function SEOHead({
  title = 'Istanbul Mediterranean | Best Turkish Food & Halal Restaurant Las Vegas Strip',
  description = 'Authentic Turkish food & halal restaurant on the Las Vegas Strip. Serving fresh döner kebab, shawarma & baklava until 5 AM. #1 rated on TripAdvisor.',
  keywords = 'turkish food las vegas, halal restaurant las vegas strip, doner kebab, shawarma, baklava',
  canonicalUrl = 'https://www.istanbullv.com',
  ogType = 'website',
  ogImage = 'https://www.istanbullv.com/social-banner.jpg',
  schema = null,
  children
}) {
  // Base URL for constructing absolute URLs
  const baseUrl = 'https://www.istanbullv.com';
  
  // Ensure canonical URL is absolute
  const fullCanonicalUrl = canonicalUrl.startsWith('http') 
    ? canonicalUrl 
    : `${baseUrl}${canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`}`;
  
  // Ensure OG image URL is absolute
  const fullOgImage = ogImage.startsWith('http') 
    ? ogImage 
    : `${baseUrl}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;

  return (<>
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {typeof schema === 'string' ? schema : JSON.stringify(schema)}
        </script>
      )}
      
      {/* Additional head elements */}
      {children}
    </Helmet>
    
    {/* SEO Validation (dev mode only) */}
    <SEOValidator 
      title={title} 
      description={description} 
      keywords={keywords} 
      showWarnings={process.env.NODE_ENV === 'development'} 
    />
  </>);
}
