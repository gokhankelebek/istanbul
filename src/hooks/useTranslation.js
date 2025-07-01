import { useContext, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation, debugTranslation } from '../utils/translationLoader';

/**
 * useTranslation Hook
 * 
 * Custom hook that provides translation functionality based on the current language.
 * It combines the language context with the translation utility.
 * 
 * @returns {Function} - Translation function that accepts a key and returns translated text
 */
const useTranslation = () => {
  const { language } = useLanguage();
  
  // Create memoized translation function
  const t = useCallback((key) => {
    return getTranslation(key, language);
  }, [language]);
  
  // Return the translation function directly
  return t;
};

export default useTranslation;
