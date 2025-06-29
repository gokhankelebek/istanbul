import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrentLanguage } from '../utils/hreflangManager';

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
  const [language, setLanguage] = useState('en-us');
  
  // Update language when location changes
  useEffect(() => {
    const currentLang = getCurrentLanguage(location.pathname);
    setLanguage(currentLang);
  }, [location.pathname]);
  
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
