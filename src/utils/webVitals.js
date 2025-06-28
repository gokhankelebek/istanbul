import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

/**
 * Web Vitals reporting utility
 * 
 * This module tracks Core Web Vitals metrics and sends them to your analytics
 * platform of choice (Google Analytics, custom endpoint, etc.)
 * 
 * Core Web Vitals are critical for SEO as they directly impact Google's ranking algorithm
 */

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Largest Contentful Paint
    getLCP(metric => {
      const vitalsData = {
        name: 'LCP',
        value: metric.value,
        rating: getRating('LCP', metric.value),
        delta: metric.delta,
        id: metric.id
      };
      
      console.log('Web Vitals: LCP', vitalsData);
      onPerfEntry(vitalsData);
    });
    
    // First Input Delay
    getFID(metric => {
      const vitalsData = {
        name: 'FID',
        value: metric.value,
        rating: getRating('FID', metric.value),
        delta: metric.delta,
        id: metric.id
      };
      
      console.log('Web Vitals: FID', vitalsData);
      onPerfEntry(vitalsData);
    });
    
    // Cumulative Layout Shift
    getCLS(metric => {
      const vitalsData = {
        name: 'CLS',
        value: metric.value,
        rating: getRating('CLS', metric.value),
        delta: metric.delta,
        id: metric.id
      };
      
      console.log('Web Vitals: CLS', vitalsData);
      onPerfEntry(vitalsData);
    });
    
    // First Contentful Paint
    getFCP(metric => {
      const vitalsData = {
        name: 'FCP',
        value: metric.value,
        rating: getRating('FCP', metric.value),
        delta: metric.delta,
        id: metric.id
      };
      
      console.log('Web Vitals: FCP', vitalsData);
      onPerfEntry(vitalsData);
    });
    
    // Time to First Byte
    getTTFB(metric => {
      const vitalsData = {
        name: 'TTFB',
        value: metric.value,
        rating: getRating('TTFB', metric.value),
        delta: metric.delta,
        id: metric.id
      };
      
      console.log('Web Vitals: TTFB', vitalsData);
      onPerfEntry(vitalsData);
    });
  }
};

/**
 * Get performance rating based on Google's thresholds
 * 
 * @param {string} metric - The metric name (LCP, FID, CLS, FCP, TTFB)
 * @param {number} value - The metric value
 * @returns {string} - 'good', 'needs-improvement', or 'poor'
 */
function getRating(metric, value) {
  switch (metric) {
    case 'LCP':
      // Largest Contentful Paint (should be <= 2500ms)
      return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
    
    case 'FID':
      // First Input Delay (should be <= 100ms)
      return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
    
    case 'CLS':
      // Cumulative Layout Shift (should be <= 0.1)
      return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
    
    case 'FCP':
      // First Contentful Paint (should be <= 1800ms)
      return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
    
    case 'TTFB':
      // Time to First Byte (should be <= 800ms)
      return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
    
    default:
      return 'unknown';
  }
}

/**
 * Send web vitals data to Google Analytics
 * 
 * @param {Object} vitalsData - Web vitals metric data
 */
export const sendToGoogleAnalytics = (vitalsData) => {
  // Assumes the global `gtag()` function exists, installed from analytics.js
  if (window.gtag) {
    window.gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: vitalsData.id,
      value: Math.round(vitalsData.value), // Use rounded values for GA
      metric_id: vitalsData.id,
      metric_name: vitalsData.name,
      metric_value: vitalsData.value,
      metric_rating: vitalsData.rating,
      metric_delta: vitalsData.delta,
      non_interaction: true, // Avoids affecting bounce rate
    });
  }
};

/**
 * Send web vitals data to a custom endpoint
 * 
 * @param {Object} vitalsData - Web vitals metric data
 */
export const sendToCustomEndpoint = (vitalsData) => {
  const body = JSON.stringify(vitalsData);
  
  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/web-vitals', body);
  } else {
    fetch('/api/web-vitals', {
      body,
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

export default reportWebVitals;
