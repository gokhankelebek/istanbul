/**
 * Prerender Middleware for SEO
 * 
 * This middleware detects search engine crawlers and serves pre-rendered HTML versions
 * of your React pages, ensuring optimal indexing of your JavaScript-heavy site.
 * 
 * This gives your React site a significant SEO advantage over WordPress sites
 * by ensuring all content is fully indexable, even for crawlers with limited JS support.
 */

const path = require('path');
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Configuration
const PRERENDER_SERVICE_URL = process.env.PRERENDER_SERVICE_URL || 'http://localhost:3001';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in ms
const CACHE_DIR = path.join(__dirname, '../prerender-cache');

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// List of known bot user agents
const botUserAgents = [
  'googlebot',
  'bingbot',
  'yandexbot',
  'duckduckbot',
  'slurp',
  'baiduspider',
  'facebookexternalhit',
  'twitterbot',
  'rogerbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest/0.',
  'developers.google.com/+/web/snippet',
  'www.google.com/webmasters/tools/richsnippets',
  'slackbot',
  'vkshare',
  'w3c_validator',
  'redditbot',
  'applebot',
  'whatsapp',
  'flipboard',
  'tumblr',
  'bitlybot',
  'skypeuripreview',
  'nuzzel',
  'discordbot',
  'google page speed',
  'qwantify',
  'pinterestbot',
  'bitrix link preview',
  'xing-contenttabreceiver',
  'chrome-lighthouse',
  'telegrambot'
];

// Extensions to ignore
const extensionsToIgnore = [
  '.js',
  '.css',
  '.xml',
  '.less',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.pdf',
  '.doc',
  '.txt',
  '.ico',
  '.rss',
  '.zip',
  '.mp3',
  '.rar',
  '.exe',
  '.wmv',
  '.doc',
  '.avi',
  '.ppt',
  '.mpg',
  '.mpeg',
  '.tif',
  '.wav',
  '.mov',
  '.psd',
  '.ai',
  '.xls',
  '.mp4',
  '.m4a',
  '.swf',
  '.dat',
  '.dmg',
  '.iso',
  '.flv',
  '.m4v',
  '.torrent',
  '.woff',
  '.woff2',
  '.ttf',
  '.svg',
  '.webp'
];

/**
 * Check if request is from a bot
 * @param {Object} req - Express request object
 * @returns {boolean} - Whether request is from a bot
 */
function isBot(req) {
  // Check user agent
  const userAgent = req.headers['user-agent'] || '';
  if (userAgent === '') return false;
  
  const isUserAgentBot = botUserAgents.some(bot => 
    userAgent.toLowerCase().includes(bot)
  );
  
  // Check _escaped_fragment_ query param (AJAX crawling scheme)
  const hasEscapedFragment = Object.prototype.hasOwnProperty.call(
    req.query,
    '_escaped_fragment_'
  );
  
  // Check prerender specific headers
  const prerenderHeader = req.headers['x-prerender'] === '1';
  
  return isUserAgentBot || hasEscapedFragment || prerenderHeader;
}

/**
 * Check if URL should be prerendered
 * @param {Object} req - Express request object
 * @returns {boolean} - Whether URL should be prerendered
 */
function shouldPrerender(req) {
  // Only prerender GET requests
  if (req.method !== 'GET') return false;
  
  // Don't prerender requests with extensions to ignore
  const extension = path.extname(req.path).toLowerCase();
  if (extensionsToIgnore.includes(extension)) return false;
  
  // Don't prerender if _escaped_fragment_ is empty
  if (
    Object.prototype.hasOwnProperty.call(req.query, '_escaped_fragment_') && 
    !req.query._escaped_fragment_
  ) {
    return false;
  }
  
  return true;
}

/**
 * Get cache key for URL
 * @param {string} url - URL to get cache key for
 * @returns {string} - Cache key
 */
function getCacheKey(url) {
  // Convert URL to a valid filename
  return url
    .replace(/^https?:\/\//, '')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .toLowerCase();
}

/**
 * Get cached HTML for URL
 * @param {string} url - URL to get cached HTML for
 * @returns {string|null} - Cached HTML or null if not cached
 */
function getCachedHTML(url) {
  const cacheKey = getCacheKey(url);
  const cachePath = path.join(CACHE_DIR, `${cacheKey}.html`);
  
  try {
    // Check if cache file exists and is not expired
    const stats = fs.statSync(cachePath);
    const cacheAge = Date.now() - stats.mtime.getTime();
    
    if (cacheAge < CACHE_DURATION) {
      return fs.readFileSync(cachePath, 'utf8');
    }
  } catch (err) {
    // File doesn't exist or can't be read
    return null;
  }
  
  return null;
}

/**
 * Save HTML to cache
 * @param {string} url - URL to save HTML for
 * @param {string} html - HTML to save
 */
function saveToCache(url, html) {
  const cacheKey = getCacheKey(url);
  const cachePath = path.join(CACHE_DIR, `${cacheKey}.html`);
  
  try {
    fs.writeFileSync(cachePath, html);
  } catch (err) {
    console.error(`Error saving to cache: ${err.message}`);
  }
}

/**
 * Prerender middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function prerenderMiddleware(req, res, next) {
  // Check if request is from a bot and should be prerendered
  if (!isBot(req) || !shouldPrerender(req)) {
    return next();
  }
  
  // Get full URL
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const url = `${protocol}://${host}${req.originalUrl}`;
  
  // Check cache first
  const cachedHTML = getCachedHTML(url);
  if (cachedHTML) {
    res.set('X-Prerender-Cache', 'hit');
    return res.send(cachedHTML);
  }
  
  // If not in cache, proxy to prerender service
  const prerenderProxy = createProxyMiddleware({
    target: PRERENDER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: () => `/render?url=${encodeURIComponent(url)}`,
    onProxyRes: (proxyRes, req, res) => {
      let responseBody = '';
      
      // Collect response body
      proxyRes.on('data', (chunk) => {
        responseBody += chunk;
      });
      
      // Save to cache when response ends
      proxyRes.on('end', () => {
        if (proxyRes.statusCode === 200) {
          saveToCache(url, responseBody);
        }
      });
    }
  });
  
  res.set('X-Prerender-Cache', 'miss');
  return prerenderProxy(req, res, next);
}

module.exports = prerenderMiddleware;
