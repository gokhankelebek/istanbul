import React from 'react';
import { Link } from 'react-router-dom';

export default function RelatedPages({ currentPage }) {
  // Map of related content for each page
  const relatedPagesMap = {
    // Main pages
    'home': [
      { path: '/menu', title: 'Our Menu' },
      { path: '/turkish-food', title: 'Turkish Food' },
      { path: '/shawarma', title: 'Shawarma' },
      { path: '/near-me/halal-food', title: 'Halal Food Near Me' },
    ],
    'menu': [
      { path: '/turkish-food', title: 'Turkish Food' },
      { path: '/shawarma', title: 'Shawarma' },
      { path: '/blog-posts/shawarma-vs-doner-kebab', title: 'Shawarma vs Döner Kebab' },
      { path: '/blog-posts/what-is-falafel-what-is-it-made-from-which-cuisine', title: 'What is Falafel?' },
    ],
    'turkishfood': [
      { path: '/menu', title: 'Our Menu' },
      { path: '/near-me/doner-kebab-las-vegas', title: 'Döner Kebab in Las Vegas' },
      { path: '/blog-posts/shawarma-vs-doner-kebab', title: 'Shawarma vs Döner Kebab' },
      { path: '/blog-posts/halal-what-does-it-mean', title: 'What is Halal?' },
    ],
    'shawarma': [
      { path: '/menu', title: 'Our Menu' },
      { path: '/turkish-food', title: 'Turkish Food' },
      { path: '/blog-posts/shawarma-vs-doner-kebab', title: 'Shawarma vs Döner Kebab' },
      { path: '/blog-posts/the-ultimate-guide-to-savoring-the-perfect-gyro', title: 'Guide to Perfect Gyro' },
    ],
    
    // Blog posts
    'whatisfalafelmade': [
      { path: '/menu', title: 'Our Menu' },
      { path: '/blog-posts/halal-what-does-it-mean', title: 'What is Halal?' },
      { path: '/blog-posts/explore-the-mediterranean-cuisine', title: 'Mediterranean Cuisine' },
      { path: '/near-me/halal-food', title: 'Halal Food Near Me' },
    ],
    'halalwhatdoesitmean': [
      { path: '/menu', title: 'Our Menu' },
      { path: '/near-me/halal-food', title: 'Halal Food Near Me' },
      { path: '/blog-posts/what-is-falafel-what-is-it-made-from-which-cuisine', title: 'What is Falafel?' },
      { path: '/turkish-food', title: 'Turkish Food' },
    ],
    'baklavaunwrapped': [
      { path: '/menu', title: 'Our Menu' },
      { path: '/blog-posts/what-makes-real-baklava-a-guide-to-its-essential-components', title: 'What Makes Real Baklava' },
      { path: '/turkish-food', title: 'Turkish Food' },
      { path: '/blog-posts/explore-the-mediterranean-cuisine', title: 'Mediterranean Cuisine' },
    ],
    'whatmakesrealbaklava': [
      { path: '/menu', title: 'Our Menu' },
      { path: '/blog-posts/baklava-unwrapped', title: 'Baklava Unwrapped' },
      { path: '/turkish-food', title: 'Turkish Food' },
      { path: '/blog-posts/explore-the-mediterranean-cuisine', title: 'Mediterranean Cuisine' },
    ],
    'shawarmavsdoner': [
      { path: '/menu', title: 'Our Menu' },
      { path: '/turkish-food', title: 'Turkish Food' },
      { path: '/shawarma', title: 'Shawarma' },
      { path: '/near-me/doner-kebab-las-vegas', title: 'Döner Kebab in Las Vegas' },
    ],
    'ultimateguidegyro': [
      { path: '/menu', title: 'Our Menu' },
      { path: '/shawarma', title: 'Shawarma' },
      { path: '/blog-posts/shawarma-vs-doner-kebab', title: 'Shawarma vs Döner Kebab' },
      { path: '/turkish-food', title: 'Turkish Food' },
    ],
    'explorethediterranean': [
      { path: '/menu', title: 'Our Menu' },
      { path: '/turkish-food', title: 'Turkish Food' },
      { path: '/shawarma', title: 'Shawarma' },
      { path: '/blog-posts/what-makes-real-baklava-a-guide-to-its-essential-components', title: 'What Makes Real Baklava' },
    ],
    
    // Location pages
    'nearmehalal': [
      { path: '/menu', title: 'Our Menu' },
      { path: '/blog-posts/halal-what-does-it-mean', title: 'What is Halal?' },
      { path: '/turkish-food', title: 'Turkish Food' },
      { path: '/near-me/doner-kebab-las-vegas', title: 'Döner Kebab in Las Vegas' },
    ],
    'donerkebablasvegas': [
      { path: '/menu', title: 'Our Menu' },
      { path: '/turkish-food', title: 'Turkish Food' },
      { path: '/near-me/halal-food', title: 'Halal Food Near Me' },
      { path: '/blog-posts/shawarma-vs-doner-kebab', title: 'Shawarma vs Döner Kebab' },
    ],
    
    // Default related pages for any other page
    'default': [
      { path: '/', title: 'Home' },
      { path: '/menu', title: 'Our Menu' },
      { path: '/turkish-food', title: 'Turkish Food' },
      { path: '/shawarma', title: 'Shawarma' },
    ]
  };

  // Get the normalized current page key
  const pageKey = currentPage ? 
    currentPage.toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .replace(/\.jsx$/, '') : 
    'default';
  
  // Get related pages for the current page, or use default if not found
  const relatedPages = relatedPagesMap[pageKey] || relatedPagesMap.default;

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl my-8">
      <h2 className="text-xl font-bold mb-4">Explore More</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {relatedPages.map((page, index) => (
          <Link 
            key={index} 
            to={page.path} 
            className="text-amber-700 hover:text-amber-500 transition flex items-center"
          >
            <span className="mr-2">→</span> {page.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
