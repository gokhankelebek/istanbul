import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import menuData from '../data/menu.json';

let categories = Array.from(
  new Set(menuData.flatMap(item => item.categories || []))
).filter(Boolean);

// Fallback: if no categories, use unique item names
const fallbackItems = Array.from(new Set(menuData.map(item => item.name)));


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full bg-istanbulRed/90 backdrop-blur shadow-lg rounded-b-xl">
      <nav className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Istanbul Mediterranean Logo" className="h-12 w-auto drop-shadow" />
          <span className="font-poppins text-2xl font-bold tracking-wide">Istanbul Mediterranean</span>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="relative px-2 py-1 font-medium transition-colors duration-200 hover:text-istanbulRed-light after:block after:h-0.5 after:bg-offwhite after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left">Home</Link>
          <Link to="/menu" className="relative px-2 py-1 font-medium transition-colors duration-200 hover:text-istanbulRed-light after:block after:h-0.5 after:bg-offwhite after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left">Menu</Link>
          <Link to="/blog" className="relative px-2 py-1 font-medium transition-colors duration-200 hover:text-istanbulRed-light after:block after:h-0.5 after:bg-offwhite after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left">Blog</Link>
          <Link to="/contact" className="relative px-2 py-1 font-medium transition-colors duration-200 hover:text-istanbulRed-light after:block after:h-0.5 after:bg-offwhite after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left">Contact</Link>
          <a href="https://istanbulinvegas.square.site/s/order" target="_blank" rel="noopener noreferrer" className="btn btn-primary px-5 py-2 rounded shadow transition-transform duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-istanbulRed-light">Order Online</a>
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none" aria-label="Open Menu">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </nav>
      {/* Mobile Nav Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-istanbulRed/95 backdrop-blur-sm px-6 py-4 flex flex-col space-y-4 shadow-lg rounded-b-xl animate-fadeIn">
          <Link to="/" className="font-medium text-lg hover:text-istanbulRed-light" onClick={()=>setMenuOpen(false)}>Home</Link>
          <Link to="/menu" className="font-medium text-lg hover:text-istanbulRed-light" onClick={()=>setMenuOpen(false)}>Menu</Link>
          <Link to="/blog" className="font-medium text-lg hover:text-istanbulRed-light" onClick={()=>setMenuOpen(false)}>Blog</Link>
          <Link to="/contact" className="font-medium text-lg hover:text-istanbulRed-light" onClick={()=>setMenuOpen(false)}>Contact</Link>
          <a href="https://istanbulinvegas.square.site/s/order" target="_blank" rel="noopener noreferrer" className="btn btn-primary px-5 py-2 rounded shadow" onClick={()=>setMenuOpen(false)}>Order Online</a>
        </div>
      )}
    </header>
  );
}
