/**
 * Hreflang Manager Utility
 * 
 * This utility helps manage hreflang tags for international SEO.
 * Hreflang tags tell search engines which language you're using on a specific page,
 * so they can show the right version to the right users.
 */

/**
 * Supported languages configuration
 * Add or remove languages as needed
 */
export const SUPPORTED_LANGUAGES = {
  'en-us': {
    name: 'English (US)',
    defaultPath: '/',
    flag: '🇺🇸'
  },
  'tr': {
    name: 'Turkish',
    defaultPath: '/tr',
    flag: '🇹🇷'
  },
  'ar': {
    name: 'Arabic',
    defaultPath: '/ar',
    flag: '🇸🇦',
    rtl: true
  },
  'es': {
    name: 'Spanish',
    defaultPath: '/es',
    flag: '🇪🇸'
  },
  'ja': {
    name: '日本語',
    defaultPath: '/ja',
    flag: '🇯🇵'
  },
  'fr': {
    name: 'Français',
    defaultPath: '/fr',
    flag: '🇫🇷'
  }
};

/**
 * Page translations mapping
 * Maps page paths to their translations in different languages
 */
export const PAGE_TRANSLATIONS = {
  // Home page
  '/': {
    'en-us': '/',
    'tr': '/tr',
    'ar': '/ar',
    'es': '/es',
    'ja': '/ja',
    'fr': '/fr'
  },
  // Menu page
  '/menu': {
    'en-us': '/menu',
    'tr': '/tr/menu',
    'ar': '/ar/menu',
    'es': '/es/menu',
    'ja': '/ja/menu',
    'fr': '/fr/menu'
  },
  // Turkish Food page
  '/turkishfood': {
    'en-us': '/turkishfood',
    'tr': '/tr/turk-yemekleri',
    'ar': '/ar/الطعام-التركي',
    'es': '/es/comida-turca'
  },
  // Halal page
  '/halal': {
    'en-us': '/halal',
    'tr': '/tr/helal',
    'ar': '/ar/حلال',
    'es': '/es/halal'
  },
  // About page
  '/about': {
    'en-us': '/about',
    'tr': '/tr/hakkimizda',
    'ar': '/ar/عن-المطعم',
    'es': '/es/sobre-nosotros'
  },
  // Contact page
  '/contact': {
    'en-us': '/contact',
    'tr': '/tr/iletisim',
    'ar': '/ar/اتصل-بنا',
    'es': '/es/contacto'
  }
};

/**
 * Get the base URL for the site
 * @returns {string} The base URL
 */
export const getBaseUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? 'https://www.istanbullv.com'
    : 'http://localhost:3000';
};

/**
 * Get the current language from the URL path
 * @param {string} path - The current URL path
 * @returns {string} The language code
 */
export const getCurrentLanguage = (path) => {
  // Check if path starts with a language code
  const pathSegments = path.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  
  // Check if first segment is a supported language code
  for (const langCode in SUPPORTED_LANGUAGES) {
    const langPath = SUPPORTED_LANGUAGES[langCode].defaultPath.replace('/', '');
    if (langPath === firstSegment) {
      return langCode;
    }
  }
  
  // Default to English if no language code found
  return 'en-us';
};

/**
 * Get the canonical path for a given path and language
 * @param {string} path - The current URL path
 * @param {string} langCode - The language code
 * @returns {string} The canonical path
 */
export const getCanonicalPath = (path, langCode = 'en-us') => {
  // Remove language prefix if present
  let cleanPath = path;
  for (const code in SUPPORTED_LANGUAGES) {
    const langPath = SUPPORTED_LANGUAGES[code].defaultPath;
    if (langPath !== '/' && path.startsWith(langPath)) {
      cleanPath = path.substring(langPath.length) || '/';
      break;
    }
  }
  
  // Find the translation for this path
  for (const basePath in PAGE_TRANSLATIONS) {
    if (cleanPath === basePath) {
      return PAGE_TRANSLATIONS[basePath][langCode] || cleanPath;
    }
  }
  
  // If no translation found, use the clean path with language prefix
  if (langCode === 'en-us') {
    return cleanPath;
  } else {
    const langPath = SUPPORTED_LANGUAGES[langCode].defaultPath;
    return `${langPath}${cleanPath === '/' ? '' : cleanPath}`;
  }
};

/**
 * Generate hreflang link tags for the current page
 * @param {string} currentPath - The current URL path
 * @returns {Array} Array of objects with hreflang and href properties
 */
export const generateHreflangLinks = (currentPath) => {
  const baseUrl = getBaseUrl();
  const currentLang = getCurrentLanguage(currentPath);
  const links = [];
  
  // Find the base path for translations
  let basePath = currentPath;
  for (const code in SUPPORTED_LANGUAGES) {
    const langPath = SUPPORTED_LANGUAGES[code].defaultPath;
    if (langPath !== '/' && currentPath.startsWith(langPath)) {
      basePath = currentPath.substring(langPath.length) || '/';
      break;
    }
  }
  
  // Find translations for this path
  let translations = null;
  for (const path in PAGE_TRANSLATIONS) {
    if (path === basePath) {
      translations = PAGE_TRANSLATIONS[path];
      break;
    }
  }
  
  // If no specific translations found, generate default ones
  if (!translations) {
    translations = {};
    for (const langCode in SUPPORTED_LANGUAGES) {
      if (langCode === 'en-us') {
        translations[langCode] = basePath;
      } else {
        const langPath = SUPPORTED_LANGUAGES[langCode].defaultPath;
        translations[langCode] = `${langPath}${basePath === '/' ? '' : basePath}`;
      }
    }
  }
  
  // Generate link objects for each language
  for (const langCode in translations) {
    links.push({
      hreflang: langCode,
      href: `${baseUrl}${translations[langCode]}`
    });
  }
  
  // Add x-default hreflang
  links.push({
    hreflang: 'x-default',
    href: `${baseUrl}${translations['en-us'] || '/'}`
  });
  
  return links;
};

/**
 * Generate language switcher data for UI
 * @param {string} currentPath - The current URL path
 * @returns {Array} Array of objects with language name, code, and URL
 */
export const generateLanguageSwitcher = (currentPath) => {
  const hreflangLinks = generateHreflangLinks(currentPath);
  
  return hreflangLinks
    .filter(link => link.hreflang !== 'x-default')
    .map(link => ({
      code: link.hreflang,
      name: SUPPORTED_LANGUAGES[link.hreflang]?.name || link.hreflang,
      url: link.href
    }));
};

export default {
  SUPPORTED_LANGUAGES,
  PAGE_TRANSLATIONS,
  getCurrentLanguage,
  getCanonicalPath,
  generateHreflangLinks,
  generateLanguageSwitcher
};
