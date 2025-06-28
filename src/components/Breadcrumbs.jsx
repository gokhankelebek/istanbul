import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

/**
 * Breadcrumbs component with structured data for SEO
 * Automatically generates breadcrumbs based on the current URL path
 */
export default function Breadcrumbs({ customPaths = {} }) {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  
  // Skip rendering breadcrumbs on homepage
  if (pathSegments.length === 0) {
    return null;
  }
  
  // Build breadcrumb items
  const breadcrumbs = [
    { path: '/', label: 'Home' }
  ];
  
  // Add path segments
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Use custom label if provided, otherwise format the segment
    const label = customPaths[currentPath] || 
      segment
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    breadcrumbs.push({ path: currentPath, label });
  });
  
  // Generate structured data for breadcrumbs
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": `https://www.istanbullv.com${crumb.path}`
    }))
  };
  
  return (
    <>
      {/* Structured Data */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbsSchema)}
        </script>
      </Helmet>
      
      {/* Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-sm py-3 px-4 bg-white/50 dark:bg-charcoal/50 backdrop-blur-sm rounded-lg mb-4">
        <ol className="flex flex-wrap items-center">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.path} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400" aria-hidden="true">/</span>
              )}
              
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-herb" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link 
                  to={crumb.path} 
                  className="text-saffron hover:text-istanbulRed transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
