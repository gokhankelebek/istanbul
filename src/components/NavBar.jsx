import React, { useState, useRef } from 'react';
import useClickOutside from './useClickOutside';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Blog', path: '/blog-posts' },
  { name: 'Delivery', path: '/delivery' },
  { name: 'Contact', path: '/contact' },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const specialtiesRef = useRef(null);
  const mobileMenuRef = useRef(null);
  useClickOutside(specialtiesRef, () => setDropdownOpen(null));
  useClickOutside(mobileMenuRef, () => {
    if (mobileOpen) setMobileOpen(false);
  });

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Istanbul Mediterranean Logo" className="h-10 w-auto drop-shadow" />
            <span className="text-2xl font-bold text-istanbulRed">Istanbul Mediterranean</span>
          </Link>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map(link =>
            !link.dropdown ? (
              <Link key={link.name} to={link.path} className="hover:text-istanbulRed transition-colors font-medium">
                {link.name}
              </Link>
            ) : (
              <div
                key={link.name}
                className="relative group"
                ref={link.name === 'Specialties' ? specialtiesRef : undefined}
                onMouseEnter={() => setDropdownOpen(link.name)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <Link
                  to={link.dropdown[0].path}
                  className="hover:text-istanbulRed font-medium focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen === link.name}
                  onClick={() => setDropdownOpen(dropdownOpen === link.name ? null : link.name)}
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setDropdownOpen(dropdownOpen === link.name ? null : link.name);
                    }
                  }}
                  onMouseEnter={() => setDropdownOpen(link.name)}
                  onFocus={() => setDropdownOpen(link.name)}
                >
                  {link.name}
                </Link>
                <div
                  className={`absolute left-0 mt-2 bg-white border rounded shadow-lg z-30 ${dropdownOpen === link.name ? 'block' : 'hidden'}`}
                >
                  {link.dropdown.map(sub => (
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
            href="https://orderdoner.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-4 py-2 rounded bg-istanbulRed text-white font-bold shadow hover:bg-istanbulRed/90 transition-colors"
          >
            Order Online
          </a>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="focus:outline-none">
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
          {/* Mobile Menu Panel (content height only, not full screen) */}
          <div
            ref={mobileMenuRef}
            className="fixed top-0 right-0 left-0 md:hidden mx-2 mt-2 rounded-xl bg-white shadow-lg z-50 transition-all duration-300 animate-fade-in"
            style={{ maxWidth: '90vw', minWidth: '250px', maxHeight: '80vh', overflowY: 'auto' }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map(link =>
                !link.dropdown ? (
                  <Link key={link.name} to={link.path} className="block px-3 py-2 rounded hover:bg-istanbulRed hover:text-white font-medium" onClick={() => setMobileOpen(false)}>
                    {link.name}
                  </Link>
                ) : (
                  <div key={link.name}>
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === link.name ? null : link.name)}
                      className="w-full text-left px-3 py-2 rounded hover:bg-istanbulRed hover:text-white font-medium"
                      aria-expanded={dropdownOpen === link.name}
                    >
                      {link.name}
                    </button>
                    <div className={"block pl-4"}>
                      {link.dropdown.map(sub => (
                        <Link key={sub.name} to={sub.path} className="block px-3 py-2 rounded hover:bg-istanbulRed hover:text-white font-medium" onClick={() => { setMobileOpen(false); setDropdownOpen(null); }}>
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              )}
              <a
                href="https://orderdoner.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 px-3 py-2 rounded bg-istanbulRed text-white font-bold shadow hover:bg-red-700"
                onClick={() => setMobileOpen(false)}
              >
                Order Online
              </a>
            </div>
          </div>
        </>
      )}

    </nav>
  );
}
