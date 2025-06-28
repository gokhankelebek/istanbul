import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { generateHreflangLinks } from '../utils/hreflangManager';

/**
 * HreflangTags Component
 * 
 * This component generates and inserts hreflang tags in the document head
 * for international SEO. Hreflang tags help search engines understand which
 * language version of a page they should display to users in search results.
 * 
 * @returns {JSX.Element} - React component
 */
const HreflangTags = () => {
  const location = useLocation();
  const hreflangLinks = generateHreflangLinks(location.pathname);
  
  return (
    <Helmet>
      {hreflangLinks.map((link, index) => (
        <link 
          key={index}
          rel="alternate" 
          hrefLang={link.hreflang} 
          href={link.href} 
        />
      ))}
    </Helmet>
  );
};

export default HreflangTags;
