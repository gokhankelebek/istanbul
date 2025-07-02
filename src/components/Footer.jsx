import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Explore */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-saffron">Home</Link></li>
            <li><Link to="/menu" className="hover:text-saffron">Menu</Link></li>
            <li><Link to="/catering" className="hover:text-saffron">Catering</Link></li>
            <li><Link to="/delivery" className="hover:text-saffron">Delivery</Link></li>
            <li><Link to="/contact" className="hover:text-saffron">Contact</Link></li>
            <li><Link to="/best-mediterranean-food-near-caesars-palace-las-vegas" className="hover:text-saffron">Near Caesars Palace</Link></li>
            <li><Link to="/where-to-eat-near-the-sphere-las-vegas" className="hover:text-saffron">Near the Sphere</Link></li>
          </ul>
        </div>

        {/* Mediterranean */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Mediterranean Cuisine</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/mediterranean-restaurant" className="hover:text-saffron">Mediterranean Restaurant</Link></li>
            <li><Link to="/turkish-food" className="hover:text-saffron">Turkish Food</Link></li>
            <li><Link to="/shawarma" className="hover:text-saffron">Shawarma</Link></li>
            <li><Link to="/halal" className="hover:text-saffron">Halal</Link></li>
            <li><Link to="/near-me/halal-food" className="hover:text-saffron">Near Me: Halal Food</Link></li>
          </ul>
        </div>

        {/* Our Story */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Our Story</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/experience" className="hover:text-saffron">Our Experience</Link></li>
            <li><Link to="/about" className="hover:text-saffron">About Us</Link></li>
            <li><Link to="/faq" className="hover:text-saffron">FAQ</Link></li>
            <li><Link to="/blog-posts" className="hover:text-saffron">Blog</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://orderdoner.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded bg-saffron text-white font-semibold shadow hover:bg-primary transition"
              >
                Order Online
              </a>
            </li>
            <li className="mt-4 text-sm text-gray-400">
              3615 S Las Vegas Blvd #101<br />
              Las Vegas, NV 89109<br />
              <a href="tel:+17259008844" className="hover:text-saffron block mt-1">(725) 900-8844</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-xs text-gray-500">
        {new Date().getFullYear()} Istanbul Mediterranean. All rights reserved.
      </div>
    </footer>
  );
}
