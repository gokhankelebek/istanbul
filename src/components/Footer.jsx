import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <span className="font-bold text-lg"> {new Date().getFullYear()} Istanbul Mediterranean</span>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 items-center justify-center md:justify-end">
          <Link to="/" className="hover:text-istanbulRed transition">Home</Link>
          <Link to="/menu" className="hover:text-istanbulRed transition">Menu</Link>
          <Link to="/about" className="hover:text-istanbulRed transition">About</Link>
          <Link to="/catering" className="hover:text-istanbulRed transition">Catering</Link>
          <Link to="/halal" className="hover:text-istanbulRed transition">Halal</Link>
          <Link to="/faq" className="hover:text-istanbulRed transition">FAQ</Link>
          <Link to="/blog" className="hover:text-istanbulRed transition">Blog</Link>
          <Link to="/contact" className="hover:text-istanbulRed transition">Contact</Link>
          <Link to="/mediterranean-restaurant" className="hover:text-yellow-400 transition font-semibold">Mediterranean Restaurant</Link>
          <a href="https://orderdoner.com" target="_blank" rel="noopener noreferrer" className="ml-2 px-4 py-2 rounded bg-istanbulRed text-white font-semibold shadow hover:bg-primary hover:text-offwhite transition-colors duration-150">Order Online</a>
        </div>
      </div>
    </footer>
  );
}
