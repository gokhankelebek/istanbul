import React, { useState } from "react";
import useTranslation from "../hooks/useTranslation";
import { Link } from "react-router-dom";
import menuData from "../data/menu.json";

let categories = Array.from(
  new Set(menuData.flatMap((item) => item.categories || []))
).filter(Boolean);

// Fallback: if no categories, use unique item names
const fallbackItems = Array.from(new Set(menuData.map((item) => item.name)));

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslation();
  return (
    <header className="sticky top-0 z-50 w-full bg-istanbulRed/90 backdrop-blur shadow-lg rounded-b-xl">
      <nav className="flex items-center justify-between px-4 lg:px-6 py-3 max-w-7xl mx-auto">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3 lg:space-x-4 min-w-0">
          <img
            src="/logo.png"
            alt="Istanbul Mediterranean Logo"
            className="h-10 lg:h-12 w-auto drop-shadow flex-shrink-0"
          />
          <span className="font-poppins text-lg lg:text-2xl font-bold tracking-wide text-white truncate">
            Istanbul Mediterranean
          </span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          <Link
            to="/"
            className="relative px-2 py-1 font-medium text-white transition-colors duration-200 hover:text-istanbulRed-light after:block after:h-0.5 after:bg-offwhite after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left"
          >
            {t("common.home")}
          </Link>
          <Link
            to="/menu"
            className="relative px-2 py-1 font-medium text-white transition-colors duration-200 hover:text-istanbulRed-light after:block after:h-0.5 after:bg-offwhite after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left"
          >
            {t("common.menu")}
          </Link>
          <Link
            to="/about"
            className="relative px-2 py-1 font-medium text-white transition-colors duration-200 hover:text-istanbulRed-light after:block after:h-0.5 after:bg-offwhite after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left"
          >
            {t("nav.about")}
          </Link>
          <Link
            to="/blog-posts"
            className="relative px-2 py-1 font-medium text-white transition-colors duration-200 hover:text-istanbulRed-light after:block after:h-0.5 after:bg-offwhite after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left"
          >
            {t("common.blog")}
          </Link>
          <Link
            to="/contact"
            className="relative px-2 py-1 font-medium text-white transition-colors duration-200 hover:text-istanbulRed-light after:block after:h-0.5 after:bg-offwhite after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left"
          >
            {t("common.contact")}
          </Link>
          <a
            href="https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary px-4 lg:px-5 py-2 rounded shadow transition-transform duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-istanbulRed-light flex-shrink-0"
          >
            {t("common.orderOnline")}
          </a>
        </div>
        
        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none text-white"
            aria-label="Open Menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Mobile Nav Drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-istanbulRed/95 backdrop-blur-sm px-6 py-4 flex flex-col space-y-4 shadow-lg rounded-b-xl animate-fadeIn">
          <Link
            to="/"
            className="font-medium text-lg text-white hover:text-istanbulRed-light"
            onClick={() => setMenuOpen(false)}
          >
            {t("common.home")}
          </Link>
          <Link
            to="/menu"
            className="font-medium text-lg text-white hover:text-istanbulRed-light"
            onClick={() => setMenuOpen(false)}
          >
            {t("common.menu")}
          </Link>
          <Link
            to="/about"
            className="font-medium text-lg text-white hover:text-istanbulRed-light"
            onClick={() => setMenuOpen(false)}
          >
            {t("nav.about")}
          </Link>
          <Link
            to="/blog-posts"
            className="font-medium text-lg text-white hover:text-istanbulRed-light"
            onClick={() => setMenuOpen(false)}
          >
            {t("common.blog")}
          </Link>
          <Link
            to="/contact"
            className="font-medium text-lg text-white hover:text-istanbulRed-light"
            onClick={() => setMenuOpen(false)}
          >
            {t("common.contact")}
          </Link>
          <a
            href="https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary px-5 py-2 rounded shadow"
            onClick={() => setMenuOpen(false)}
          >
            {t("common.orderOnline")}
          </a>
        </div>
      )}
    </header>
  );
}
