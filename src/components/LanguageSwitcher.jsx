import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateLanguageSwitcher, getCurrentLanguage } from '../utils/hreflangManager';

/**
 * LanguageSwitcher Component
 * 
 * This component provides a user interface for switching between different
 * language versions of the current page. It works with the hreflang system
 * to ensure users can navigate between translated versions of content.
 * 
 * @returns {JSX.Element} - React component
 */
const LanguageSwitcher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Get language options
  const languageOptions = generateLanguageSwitcher(location.pathname);
  const currentLangCode = getCurrentLanguage(location.pathname);
  const currentLanguage = languageOptions.find(lang => lang.code === currentLangCode) || languageOptions[0];
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle language change
  const handleLanguageChange = (url) => {
    // Extract path from URL
    const urlObj = new URL(url);
    navigate(urlObj.pathname);
    setIsOpen(false);
  };
  
  // Flag emoji for language
  const getFlagEmoji = (langCode) => {
    switch (langCode) {
      case 'en-us':
        return '🇺🇸';
      case 'tr':
        return '🇹🇷';
      case 'ar':
        return '🇸🇦';
      case 'es':
        return '🇪🇸';
      default:
        return '🌐';
    }
  };
  
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-saffron"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="mr-2">{getFlagEmoji(currentLanguage.code)}</span>
        <span>{currentLanguage.name}</span>
        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="py-1" role="none">
            {languageOptions.map((language) => (
              <button
                key={language.code}
                className={`${
                  language.code === currentLanguage.code
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700'
                } group flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100`}
                role="menuitem"
                onClick={() => handleLanguageChange(language.url)}
              >
                <span className="mr-3">{getFlagEmoji(language.code)}</span>
                {language.name}
                {language.code === currentLanguage.code && (
                  <span className="ml-auto">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
