/**
 * Configuration utility for Istanbul Mediterranean website
 * Centralizes environment variables and default values
 */

// Site configuration
export const SITE_CONFIG = {
  url: process.env.REACT_APP_SITE_URL || 'https://www.istanbullv.com',
  orderUrl: process.env.REACT_APP_ORDER_URL || 'https://orderdoner.com',
  name: 'Istanbul Mediterranean',
  tagline: 'Authentic Turkish & Mediterranean Cuisine',
};

// Contact information
export const CONTACT_INFO = {
  phone: process.env.REACT_APP_RESTAURANT_PHONE || '(702) 123-4567',
  address: process.env.REACT_APP_RESTAURANT_ADDRESS || '3645 S Las Vegas Blvd, Las Vegas, NV 89109',
  email: 'info@istanbullv.com',
  hours: {
    'Monday - Thursday': '11:00 AM - 4:00 AM',
    'Friday - Saturday': '11:00 AM - 5:00 AM',
    'Sunday': '11:00 AM - 4:00 AM'
  }
};

// Social media links
export const SOCIAL_LINKS = {
  facebook: process.env.REACT_APP_FACEBOOK_URL || 'https://facebook.com/istanbullv',
  instagram: process.env.REACT_APP_INSTAGRAM_URL || 'https://instagram.com/istanbullv',
  yelp: process.env.REACT_APP_YELP_URL || 'https://yelp.com/biz/istanbul-mediterranean',
  google: 'https://g.page/istanbul-mediterranean-lv'
};

// Analytics configuration
export const ANALYTICS_CONFIG = {
  gtmId: process.env.REACT_APP_GTM_ID || 'GTM-NJLK8BB',
  gaId: process.env.REACT_APP_GA_ID || null
};

// Feature flags
export const FEATURES = {
  enableAnalytics: process.env.NODE_ENV === 'production',
  enableSEODashboard: process.env.NODE_ENV === 'development',
  enableServiceWorker: true
};

// Menu item URL helper
export const getMenuItemOrderUrl = (token) => {
  if (!token) return SITE_CONFIG.orderUrl;
  return `${SITE_CONFIG.orderUrl}/#${token}`;
};

// Generate canonical URL helper
export const getCanonicalUrl = (path = '') => {
  return `${SITE_CONFIG.url}${path.startsWith('/') ? path : '/' + path}`;
};