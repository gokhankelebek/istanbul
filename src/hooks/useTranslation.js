import { useLanguage } from '../contexts/LanguageContext';
import { createTranslator } from '../utils/translationLoader';

/**
 * useTranslation Hook
 * 
 * Custom hook that provides translation functionality based on the current language.
 * It combines the language context with the translation utility.
 * 
 * @param {object} customTranslations - Optional custom translations specific to the component
 * @returns {Function} - Translation function that accepts a key and returns translated text
 * 
 * @example
 * // In a component:
 * const t = useTranslation();
 * return <h1>{t('home.hero.title')}</h1>;
 */
const useTranslation = (customTranslations = {}) => {
  const { language } = useLanguage();
  return createTranslator(language, customTranslations);
};

export default useTranslation;
