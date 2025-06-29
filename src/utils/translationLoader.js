/**
 * Translation Loader Utility
 * 
 * This utility helps load the correct translations for components based on the current language.
 * It works with the language context to provide localized content.
 */

import { SUPPORTED_LANGUAGES } from './hreflangManager';

/**
 * Default translations object
 * This will be extended with language-specific translations
 */
const defaultTranslations = {
  // Common UI elements
  'common': {
    'orderNow': {
      'en-us': 'Order Now',
      'tr': 'Şimdi Sipariş Ver',
      'ar': 'اطلب الآن',
      'es': 'Ordenar Ahora'
    },
    'menu': {
      'en-us': 'Menu',
      'tr': 'Menü',
      'ar': 'القائمة',
      'es': 'Menú'
    },
    'contact': {
      'en-us': 'Contact',
      'tr': 'İletişim',
      'ar': 'اتصل بنا',
      'es': 'Contacto'
    },
    'about': {
      'en-us': 'About',
      'tr': 'Hakkımızda',
      'ar': 'عن المطعم',
      'es': 'Sobre Nosotros'
    },
    'readMore': {
      'en-us': 'Read More',
      'tr': 'Daha Fazla',
      'ar': 'اقرأ المزيد',
      'es': 'Leer Más'
    }
  },
  
  // Home page
  'home': {
    'hero': {
      'title': {
        'en-us': 'Authentic Turkish Döner in Las Vegas',
        'tr': 'Las Vegas\'ta Otantik Türk Döner',
        'ar': 'شاورما تركية أصلية في لاس فيغاس',
        'es': 'Auténtico Döner Turco en Las Vegas'
      },
      'subtitle': {
        'en-us': 'Family recipe, Istanbul roots—crafted fresh daily',
        'tr': 'Aile tarifi, İstanbul kökleri—her gün taze hazırlanır',
        'ar': 'وصفة عائلية، جذور إسطنبول—يتم تحضيرها طازجة يوميًا',
        'es': 'Receta familiar, raíces de Estambul—preparado fresco a diario'
      }
    }
  },
  
  // Menu page
  'menu': {
    'title': {
      'en-us': 'Our Menu',
      'tr': 'Menümüz',
      'ar': 'قائمتنا',
      'es': 'Nuestro Menú'
    },
    'categories': {
      'turkishPita': {
        'en-us': 'Turkish Pita',
        'tr': 'Türk Pidesi',
        'ar': 'بيتا التركية',
        'es': 'Pita Turca'
      },
      'lavashWraps': {
        'en-us': 'Lavash Wraps',
        'tr': 'Lavaş Dürümler',
        'ar': 'لفائف لافاش',
        'es': 'Wraps de Lavash'
      },
      'pitaSandwiches': {
        'en-us': 'Pita Sandwiches',
        'tr': 'Pide Sandviçler',
        'ar': 'ساندويتشات البيتا',
        'es': 'Sándwiches de Pita'
      }
    }
  }
};

/**
 * Get translation for a specific key and language
 * 
 * @param {string} key - Translation key in dot notation (e.g., 'common.orderNow')
 * @param {string} language - Language code (e.g., 'en-us', 'tr')
 * @param {object} customTranslations - Optional custom translations to override defaults
 * @returns {string} - Translated text or fallback to English if not found
 */
export const getTranslation = (key, language = 'en-us', customTranslations = {}) => {
  // Merge default translations with custom translations
  const translations = { ...defaultTranslations, ...customTranslations };
  
  // Split the key by dots to navigate the translations object
  const keys = key.split('.');
  
  // Navigate through the translations object
  let result = translations;
  for (const k of keys) {
    if (result && result[k]) {
      result = result[k];
    } else {
      // Key not found
      console.warn(`Translation key not found: ${key}`);
      return key; // Return the key itself as fallback
    }
  }
  
  // Get the translation for the specified language or fall back to English
  if (result[language]) {
    return result[language];
  } else if (result['en-us']) {
    console.warn(`Translation not available in ${language}, falling back to English for key: ${key}`);
    return result['en-us'];
  } else {
    console.warn(`No translation available for key: ${key}`);
    return key; // Return the key itself as fallback
  }
};

/**
 * Create a translation hook for a component
 * 
 * @param {string} language - Current language code
 * @param {object} customTranslations - Optional custom translations specific to the component
 * @returns {Function} - Translation function that accepts a key and returns translated text
 */
export const createTranslator = (language, customTranslations = {}) => {
  return (key) => getTranslation(key, language, customTranslations);
};

export default {
  getTranslation,
  createTranslator
};
