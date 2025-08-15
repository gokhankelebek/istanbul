import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  
  // Add error boundary protection
  try {
  
  // Force translations for French and Japanese
  const getTitle = () => {
    if (language === 'fr') return 'Döner Turc Authentique à Las Vegas';
    if (language === 'ja') return 'ラスベガスで本格的なトルコのドネル';
    
    const title = t('home.hero.title');
    if (!title || title === 'home.hero.title') {
      const fallbacks = {
        'tr': 'Las Vegas\'da Otantik Türk Döneri',
        'ar': 'شاورما تركية أصلية في لاس فيغاس',
        'es': 'Auténtico Döner Turco en Las Vegas'
      };
      return fallbacks[language] || 'Authentic Turkish Döner in Las Vegas';
    }
    return title;
  };
  
  const getSubtitle = () => {
    if (language === 'fr') return 'Recette familiale, racines d\'Istanbul—préparé frais quotidiennement';
    if (language === 'ja') return '家族のレシピ、イスタンブールのルーツ—毎日新鮮に作られています';
    
    const subtitle = t('home.hero.subtitle');
    if (!subtitle || subtitle === 'home.hero.subtitle') {
      const fallbacks = {
        'tr': 'Aile tarifi, İstanbul kökleri—her gün taze hazırlanır',
        'ar': 'وصفة عائلية، جذور إسطنبول—يتم تحضيرها طازجة يوميًا',
        'es': 'Receta familiar, raíces de Estambul—preparado fresco diariamente'
      };
      return fallbacks[language] || 'Family recipe, Istanbul roots—crafted fresh daily';
    }
    return subtitle;
  };
  
  return (
    <section className="relative h-[70vh] flex items-center justify-center bg-charcoal mb-12 overflow-hidden" style={{background:'#1F1F1F'}}>
      <picture>
        <source srcSet="/hero_chef_wide.webp" type="image/webp" />
        <img
          id="hero-bg"
          src="/hero_chef_wide.webp"
          srcSet="/hero_chef_wide.jpg 2x"
          alt="Chef preparing doner"
          className="absolute inset-0 w-full h-full object-cover animate-fadein"
          style={{zIndex:0, objectPosition: 'center top'}}
          loading="lazy"
          width={1920}
          height={800}
          onError={e => e.target.style.display='none'}
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-charcoal/40 to-transparent" style={{zIndex:1}} />
      <div className="relative z-10 text-center text-offwhite space-y-6 animate-fadein-slow">
        <h1 className="font-poppins font-extrabold text-4xl md:text-6xl animate-text-pop">
          {getTitle()}
        </h1>
        <p className="text-lg md:text-2xl">
          {getSubtitle()}
        </p>
        <div className="flex gap-4 justify-center">
          <a 
            href="https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary" 
            aria-label="Order Online"
          >
            {t('common.orderNow')}
          </a>
          <Link 
            to={`/${language === 'en-us' ? '' : language}/menu`.replace('//', '/')} 
            className="btn btn-secondary" 
            aria-label="See Menu"
          >
            {t('common.menu')}
          </Link>
        </div>
      </div>
      <img 
        src="/scooter.png" 
        alt="Delivery scooter" 
        className="hidden md:block absolute right-8 bottom-8 w-32 animate-float" 
        style={{zIndex:2}} 
        loading="lazy" 
        onError={e => e.target.style.display='none'} 
      />
    </section>
  );
  
  } catch (error) {
    console.error('TranslatedHero render error:', error);
    // Fallback render with hardcoded content
    return (
      <section className="relative h-[70vh] flex items-center justify-center bg-charcoal mb-12 overflow-hidden" style={{background:'#1F1F1F'}}>
        <div className="relative z-10 text-center text-offwhite space-y-6">
          <h1 className="font-poppins font-extrabold text-4xl md:text-6xl">
            Authentic Turkish Döner in Las Vegas
          </h1>
          <p className="text-lg md:text-2xl">
            Family recipe, Istanbul roots—crafted fresh daily
          </p>
        </div>
      </section>
    );
  }
};

export default TranslatedHero;
