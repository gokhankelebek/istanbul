import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrentLanguage, SUPPORTED_LANGUAGES } from '../utils/hreflangManager';

// Create the language context
const LanguageContext = createContext();

/**
 * LanguageProvider Component
 * 
 * This component provides language context to the entire application.
 * It detects the current language from the URL path and makes it available
 * through the context API.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} - React component
 */
export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const [language, setLanguage] = useState(() => {
    // Check localStorage first
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && SUPPORTED_LANGUAGES[savedLang]) {
      return savedLang;
    }
    
    // Then check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    
    // Map browser languages to our supported languages
    const langMap = {
      'ja': 'ja',
      'ja-JP': 'ja',
      'fr': 'fr',
      'fr-FR': 'fr',
      'fr-CA': 'fr',
      'es': 'es',
      'es-ES': 'es',
      'es-MX': 'es',
      'ar': 'ar',
      'ar-SA': 'ar',
      'tr': 'tr',
      'tr-TR': 'tr'
    };
    
    // Check if browser language matches our supported languages
    for (const [browserCode, ourCode] of Object.entries(langMap)) {
      if (browserLang.startsWith(browserCode)) {
        return ourCode;
      }
    }
    
    // Finally, check URL path
    return getCurrentLanguage(window.location.pathname);
  });
  
  // Update language when location changes
  useEffect(() => {
    const currentLang = getCurrentLanguage(location.pathname);
    setLanguage(currentLang);
  }, [location.pathname]);
  
  // Save language preference
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);
  
  // Debug log
  useEffect(() => {
    console.log('Current language:', language);
    console.log('Current path:', location.pathname);
  }, [language, location.pathname]);
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * useLanguage Hook
 * 
 * Custom hook to access the current language context.
 * 
 * @returns {Object} - Language context object with language code and setter function
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
