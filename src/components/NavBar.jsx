import React, { useState, useRef } from "react";
import useClickOutside from "./useClickOutside";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import useTranslation from "../hooks/useTranslation";
import { getCanonicalPath } from "../utils/hreflangManager";

const navLinks = [
  { name: "common.home", path: "/", key: "home" },
  { name: "common.menu", path: "/menu", key: "menu" },
  { name: "nav.about", path: "/about", key: "about" },
  { name: "common.blog", path: "/blog-posts", key: "blog" },
  { name: "nav.delivery", path: "/delivery", key: "delivery" },
  { name: "common.contact", path: "/contact", key: "contact" },
  { name: "nav.careers", path: "/careers", key: "careers" },
];

export default function NavBar({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const specialtiesRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { language } = useLanguage();
  const t = useTranslation();
  useClickOutside(specialtiesRef, () => setDropdownOpen(null));
  useClickOutside(mobileMenuRef, () => {
    if (mobileOpen) setMobileOpen(false);
  });

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Istanbul Mediterranean Logo"
              className="h-8 md:h-10 w-auto drop-shadow"
            />
            <span className="text-lg md:text-2xl font-bold text-istanbulRed truncate">
              Istanbul Mediterranean
            </span>
          </Link>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) =>
            !link.dropdown ? (
              <Link
                key={link.key}
                to={getCanonicalPath(link.path, language)}
                className="hover:text-istanbulRed transition-colors font-medium"
              >
                {t(link.name)}
              </Link>
            ) : (
              <div
                key={link.name}
                className="relative group"
                ref={link.name === "Specialties" ? specialtiesRef : undefined}
                onMouseEnter={() => setDropdownOpen(link.name)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <Link
                  to={link.dropdown[0].path}
                  className="hover:text-istanbulRed font-medium focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen === link.name}
                  onClick={() =>
                    setDropdownOpen(
                      dropdownOpen === link.name ? null : link.name
                    )
                  }
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setDropdownOpen(
                        dropdownOpen === link.name ? null : link.name
                      );
                    }
                  }}
                  onMouseEnter={() => setDropdownOpen(link.name)}
                  onFocus={() => setDropdownOpen(link.name)}
                >
                  {link.name}
                </Link>
                <div
                  className={`absolute left-0 mt-2 bg-white border rounded shadow-lg z-30 ${
                    dropdownOpen === link.name ? "block" : "hidden"
                  }`}
                >
                  {link.dropdown.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.path}
                      className="block px-4 py-2 hover:bg-istanbulRed hover:text-white whitespace-nowrap"
                      onClick={() => setDropdownOpen(null)}
                      tabIndex={0}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            )
          )}
          <a
            href="https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-istanbulRed hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Order Online
          </a>
          {/* Render children (for LanguageSwitcher) */}
          {children}
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-istanbulRed"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="h-6 w-6 text-istanbulRed"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu & Overlay */}
      {/* Mobile Menu & Overlay */}
      {mobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-200"
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
          ></div>
          {/* Mobile Menu Panel */}
          <div
            ref={mobileMenuRef}
            className="fixed top-16 left-0 right-0 md:hidden bg-white shadow-lg z-50 border-t border-gray-200"
          >
            <div className="px-4 py-3 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {/* Language Switcher at top of mobile menu */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-3">
                <span className="text-sm font-medium text-gray-600">
                  Language:
                </span>
                {children}
              </div>
              {navLinks.map((link) =>
                !link.dropdown ? (
                  <Link
                    key={link.key}
                    to={getCanonicalPath(link.path, language)}
                    className="block px-4 py-3 text-lg font-medium text-gray-700 hover:bg-istanbulRed hover:text-white rounded-lg transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(link.name)}
                  </Link>
                ) : (
                  <div key={link.name}>
                    <button
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === link.name ? null : link.name
                        )
                      }
                      className="w-full text-left px-4 py-3 text-lg font-medium text-gray-700 hover:bg-istanbulRed hover:text-white rounded-lg transition-colors"
                      aria-expanded={dropdownOpen === link.name}
                    >
                      {link.name}
                    </button>
                    {dropdownOpen === link.name && (
                      <div className="pl-4 space-y-1">
                        {link.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className="block px-4 py-2 text-base text-gray-600 hover:bg-gray-100 hover:text-istanbulRed rounded-lg transition-colors"
                            onClick={() => {
                              setMobileOpen(false);
                              setDropdownOpen(null);
                            }}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <a
                  href="https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-center bg-istanbulRed text-white font-bold rounded-lg shadow hover:bg-red-700 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Order Online
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
