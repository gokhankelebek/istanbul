import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <span className="font-bold text-lg">© {new Date().getFullYear()} Istanbul Mediterranean</span>
        </div>
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-istanbulRed transition">Home</Link>
          <Link to="/menu" className="hover:text-istanbulRed transition">Menu</Link>
          <Link to="/blog" className="hover:text-istanbulRed transition">Blog</Link>
          <Link to="/contact" className="hover:text-istanbulRed transition">Contact</Link>
          <Link to="/mediterranean-restaurant" className="hover:text-yellow-400 transition font-semibold">Mediterranean Restaurant</Link>
        </div>
      </div>
    </footer>
  );
}
