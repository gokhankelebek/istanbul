import React from 'react';
import useTranslation from '../hooks/useTranslation';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * TranslatedHero Component
 * 
 * This component demonstrates how to use the translation system
 * to display content in the selected language.
 * 
 * @returns {JSX.Element} - React component
 */
const TranslatedHero = () => {
  const t = useTranslation();
  const { language } = useLanguage();
  
  return (
    <div className="bg-gradient-to-r from-saffron to-pomegranate py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          {t('home.hero.title')}
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl">
          {t('home.hero.subtitle')}
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <a
              href="https://orderdoner.com"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-pomegranate bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              {t('common.orderNow')}
            </a>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <a
              href="/menu"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pomegranate-dark hover:bg-pomegranate md:py-4 md:text-lg md:px-10"
            >
              {t('common.menu')}
            </a>
          </div>
        </div>
        <div className="mt-4 text-sm">
          Current language: {language}
        </div>
      </div>
    </div>
  );
};

export default TranslatedHero;
