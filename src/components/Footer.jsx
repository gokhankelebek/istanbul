import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800 py-6 px-4 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-0">
        <div className="mb-2 md:mb-0 text-center md:text-left w-full md:w-auto">
          <span className="font-bold text-lg block">{new Date().getFullYear()} Istanbul Mediterranean</span>
        </div>
        <nav className="w-full md:w-auto" aria-label="Footer Navigation">
          <ul className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-2 text-sm tracking-wide uppercase">
            <li><a href="https://orderdoner.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded bg-istanbulRed text-white font-semibold shadow hover:bg-primary hover:text-offwhite transition-colors duration-150">Order Online</a></li>
            <li><Link to="/menu" className="hover:text-istanbulRed transition">Menu</Link></li>
            <li><Link to="/catering" className="hover:text-istanbulRed transition">Catering</Link></li>
            <li><Link to="/shawarma" className="hover:text-yellow-400 transition font-semibold">Shawarma</Link></li>
            <li><Link to="/turkish-food" className="hover:text-yellow-400 transition font-semibold">Turkish Food</Link></li>
            <li><Link to="/halal" className="hover:text-istanbulRed transition">Halal</Link></li>
            <li><Link to="/faq" className="hover:text-istanbulRed transition">FAQ</Link></li>
            <li><Link to="/blog" className="hover:text-istanbulRed transition">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-istanbulRed transition">Contact</Link></li>
            <li><Link to="/mediterranean-restaurant" className="hover:text-yellow-400 transition font-semibold">Mediterranean Restaurant</Link></li>
            <li><Link to="/" className="hover:text-istanbulRed transition">Home</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
