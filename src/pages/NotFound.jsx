import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Istanbul Mediterranean Halal</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Istanbul Mediterranean to explore our authentic halal Turkish cuisine." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="container mx-auto py-24 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <img 
              src="/doner-icon.webp" 
              alt="Istanbul Mediterranean" 
              className="w-24 h-24 mx-auto mb-6 opacity-50"
            />
          </div>
          
          <h1 className="text-6xl font-bold mb-4 text-gray-900">404</h1>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          
          <div className="space-y-4">
            <Link 
              to="/" 
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Return Home
            </Link>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/menu" 
                className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                View Our Menu
              </Link>
              <Link 
                to="/blog-posts" 
                className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                Read Our Blog
              </Link>
              <Link 
                to="/contact" 
                className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
