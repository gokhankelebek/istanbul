import React from 'react';
import { Link } from 'react-router-dom';

export default function SiteNavigation({ className }) {
  return (
    <nav className={`site-navigation ${className || ''}`}>
      <h2 className="text-xl font-bold mb-4">Explore More</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <li>
          <Link to="/blog-posts/what-is-falafel-what-is-it-made-from-which-cuisine" className="text-amber-700 hover:text-amber-500 transition">
            what is falafel what is it made from which cuisine
          </Link>
        </li>
        <li>
          <Link to="/blog-posts/halal-what-does-it-mean" className="text-amber-700 hover:text-amber-500 transition">
            halal what does it mean
          </Link>
        </li>
        <li>
          <Link to="/blog-posts/baklava-unwrapped" className="text-amber-700 hover:text-amber-500 transition">
            baklava unwrapped
          </Link>
        </li>
        <li>
          <Link to="/blog-posts/what-makes-real-baklava-a-guide-to-its-essential-components" className="text-amber-700 hover:text-amber-500 transition">
            what makes real baklava a guide to its essential components
          </Link>
        </li>
        <li>
          <Link to="/blog-posts/shawarma-vs-doner-kebab" className="text-amber-700 hover:text-amber-500 transition">
            shawarma vs doner kebab
          </Link>
        </li>
        <li>
          <Link to="/blog-posts/the-ultimate-guide-to-savoring-the-perfect-gyro" className="text-amber-700 hover:text-amber-500 transition">
            the ultimate guide to savoring the perfect gyro
          </Link>
        </li>
        <li>
          <Link to="/shawarma" className="text-amber-700 hover:text-amber-500 transition">
            shawarma
          </Link>
        </li>
        <li>
          <Link to="/menu" className="text-amber-700 hover:text-amber-500 transition">
            menu
          </Link>
        </li>
        <li>
          <Link to="/near-me/doner-kebab-las-vegas" className="text-amber-700 hover:text-amber-500 transition">
            doner kebab las vegas
          </Link>
        </li>
        <li>
          <Link to="/blog-posts/explore-the-mediterranean-cuisine" className="text-amber-700 hover:text-amber-500 transition">
            explore the mediterranean cuisine
          </Link>
        </li>
        <li>
          <Link to="/turkish-food" className="text-amber-700 hover:text-amber-500 transition">
            turkish food
          </Link>
        </li>
        <li>
          <Link to="/near-me/halal-food" className="text-amber-700 hover:text-amber-500 transition">
            halal food
          </Link>
        </li>
      </ul>
    </nav>
  );
}