/**
 * Canonical URL Manager
 * 
 * This utility helps manage canonical URLs across the site to prevent duplicate content issues,
 * which is critical for SEO. It ensures that search engines understand the preferred version
 * of a page when multiple URLs might serve similar content.
 */

const BASE_URL = 'https://www.istanbullv.com';

/**
 * Generate a canonical URL for a given path
 * 
 * @param {string} path - The path to generate a canonical URL for
 * @param {Object} options - Options for generating the canonical URL
 * @param {boolean} options.trailingSlash - Whether to add a trailing slash
 * @param {boolean} options.lowercase - Whether to lowercase the URL
 * @param {boolean} options.removeQueryParams - Whether to remove query parameters
 * @param {string[]} options.preserveQueryParams - Query parameters to preserve
 * @returns {string} - The canonical URL
 */
export const getCanonicalUrl = (path, options = {}) => {
  const {
    trailingSlash = false,
    lowercase = true,
    removeQueryParams = true,
    preserveQueryParams = []
  } = options;
  
  // Handle absolute URLs
  if (path.startsWith('http')) {
    const url = new URL(path);
    path = url.pathname + url.search;
  }
  
  // Remove leading slash if present
  let cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Handle query parameters
  let queryParams = '';
  if (cleanPath.includes('?')) {
    const [pathPart, queryPart] = cleanPath.split('?');
    cleanPath = pathPart;
    
    if (!removeQueryParams && queryPart) {
      const params = new URLSearchParams(queryPart);
      
      // Filter query parameters if needed
      if (preserveQueryParams.length > 0) {
        const filteredParams = new URLSearchParams();
        preserveQueryParams.forEach(param => {
          if (params.has(param)) {
            filteredParams.set(param, params.get(param));
          }
        });
        queryParams = filteredParams.toString();
      } else {
        queryParams = queryPart;
      }
      
      if (queryParams) {
        queryParams = `?${queryParams}`;
      }
    }
  }
  
  // Apply lowercase if needed
  if (lowercase) {
    cleanPath = cleanPath.toLowerCase();
  }
  
  // Add trailing slash if needed
  if (trailingSlash && !cleanPath.endsWith('/') && !cleanPath.includes('.')) {
    cleanPath = `${cleanPath}/`;
  }
  
  // Remove trailing slash if not needed
  if (!trailingSlash && cleanPath.endsWith('/') && cleanPath !== '') {
    cleanPath = cleanPath.slice(0, -1);
  }
  
  // Handle home page
  if (cleanPath === '') {
    return `${BASE_URL}${trailingSlash ? '/' : ''}`;
  }
  
  return `${BASE_URL}/${cleanPath}${queryParams}`;
};

/**
 * Get alternate language URLs for a page
 * 
 * @param {string} path - The current path
 * @param {Object} translations - Object mapping language codes to translated paths
 * @returns {Object} - Object mapping language codes to full URLs
 */
export const getAlternateLanguageUrls = (path, translations) => {
  const alternateUrls = {};
  
  Object.entries(translations).forEach(([langCode, translatedPath]) => {
    alternateUrls[langCode] = getCanonicalUrl(translatedPath);
  });
  
  return alternateUrls;
};

/**
 * Generate a sitemap entry for a page
 * 
 * @param {string} path - The path to generate a sitemap entry for
 * @param {Object} options - Options for the sitemap entry
 * @param {string} options.changefreq - How frequently the page changes
 * @param {number} options.priority - Priority of the page (0.0 to 1.0)
 * @param {string} options.lastmod - Last modified date (ISO format)
 * @param {Object} options.alternateLanguages - Alternate language versions
 * @returns {Object} - Sitemap entry object
 */
export const getSitemapEntry = (path, options = {}) => {
  const {
    changefreq = 'monthly',
    priority = 0.5,
    lastmod = new Date().toISOString(),
    alternateLanguages = {}
  } = options;
  
  return {
    url: getCanonicalUrl(path),
    changefreq,
    priority,
    lastmod,
    alternateLanguages: Object.entries(alternateLanguages).map(([langCode, langPath]) => ({
      lang: langCode,
      url: getCanonicalUrl(langPath)
    }))
  };
};

/**
 * Detect and handle potential duplicate content URLs
 * 
 * @param {string} currentUrl - The current URL
 * @returns {Object} - Object with canonical URL and whether a redirect is needed
 */
export const handleDuplicateContent = (currentUrl) => {
  const url = new URL(currentUrl);
  const path = url.pathname;
  
  // Define canonical version rules
  const shouldHaveTrailingSlash = !path.includes('.');
  const shouldBeLowercase = true;
  
  // Check if URL matches our canonical format
  const isTrailingSlashCorrect = shouldHaveTrailingSlash ? path.endsWith('/') : !path.endsWith('/');
  const isLowercaseCorrect = shouldBeLowercase ? path === path.toLowerCase() : true;
  
  // Generate canonical URL
  const canonicalUrl = getCanonicalUrl(path, {
    trailingSlash: shouldHaveTrailingSlash,
    lowercase: shouldBeLowercase
  });
  
  // Determine if redirect is needed
  const needsRedirect = !isTrailingSlashCorrect || !isLowercaseCorrect;
  
  return {
    canonicalUrl,
    needsRedirect
  };
};

export default {
  getCanonicalUrl,
  getAlternateLanguageUrls,
  getSitemapEntry,
  handleDuplicateContent
};
