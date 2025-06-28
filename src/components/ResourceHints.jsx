import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

/**
 * ResourceHints component adds preload, prefetch, and preconnect directives
 * to improve page load performance and Core Web Vitals scores
 */
export default function ResourceHints() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Define critical resources that should be preloaded
  const criticalResources = [
    // Preload hero image for current page
    { type: 'image', path: '/istanbul-hero.png', as: 'image' },
    // Preload logo
    { type: 'image', path: '/logo.png', as: 'image' },
    // Preload main font
    { type: 'font', path: '/fonts/main-font.woff2', as: 'font', crossorigin: 'anonymous' }
  ];
  
  // Define resources to prefetch for likely next pages
  const prefetchResources = [];
  
  // Determine likely next pages based on current path
  if (currentPath === '/') {
    // From homepage, users often go to menu or about
    prefetchResources.push(
      { type: 'document', path: '/menu', as: 'document' },
      { type: 'document', path: '/about', as: 'document' }
    );
  } else if (currentPath === '/menu') {
    // From menu, users might go to specific food pages
    prefetchResources.push(
      { type: 'document', path: '/turkishfood', as: 'document' },
      { type: 'document', path: '/halal', as: 'document' }
    );
  }
  
  // Define external domains to preconnect to
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com'
  ];

  return (
    <Helmet>
      {/* Preconnect to external domains */}
      {preconnectDomains.map(domain => (
        <link key={`preconnect-${domain}`} rel="preconnect" href={domain} crossOrigin="anonymous" />
      ))}
      
      {/* Preload critical resources */}
      {criticalResources.map(resource => (
        <link 
          key={`preload-${resource.path}`} 
          rel="preload" 
          href={resource.path} 
          as={resource.as}
          {...(resource.crossorigin && { crossOrigin: resource.crossorigin })}
        />
      ))}
      
      {/* Prefetch likely next pages */}
      {prefetchResources.map(resource => (
        <link 
          key={`prefetch-${resource.path}`} 
          rel="prefetch" 
          href={resource.path} 
          as={resource.as} 
        />
      ))}
      
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
    </Helmet>
  );
}
