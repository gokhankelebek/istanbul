/**
 * SEO Performance Monitor
 * 
 * A utility for tracking, measuring, and analyzing SEO performance metrics
 * including Core Web Vitals, search rankings, and structured data validation.
 */

// Core Web Vitals measurement and reporting
export const coreWebVitals = {
  /**
   * Initialize Core Web Vitals monitoring
   * Uses web-vitals library to measure LCP, FID, CLS, TTFB, and FCP
   */
  init: () => {
    if (typeof window === 'undefined') return;
    
    import('web-vitals').then(({ getLCP, getFID, getCLS, getTTFB, getFCP }) => {
      // Largest Contentful Paint
      getLCP(metric => {
        coreWebVitals.reportToAnalytics('LCP', metric);
        coreWebVitals.storeMetric('LCP', metric.value);
      });
      
      // First Input Delay
      getFID(metric => {
        coreWebVitals.reportToAnalytics('FID', metric);
        coreWebVitals.storeMetric('FID', metric.value);
      });
      
      // Cumulative Layout Shift
      getCLS(metric => {
        coreWebVitals.reportToAnalytics('CLS', metric);
        coreWebVitals.storeMetric('CLS', metric.value);
      });
      
      // Time to First Byte
      getTTFB(metric => {
        coreWebVitals.reportToAnalytics('TTFB', metric);
        coreWebVitals.storeMetric('TTFB', metric.value);
      });
      
      // First Contentful Paint
      getFCP(metric => {
        coreWebVitals.reportToAnalytics('FCP', metric);
        coreWebVitals.storeMetric('FCP', metric.value);
      });
    });
  },
  
  /**
   * Report Core Web Vitals metrics to Google Analytics
   * @param {string} name - Metric name
   * @param {Object} metric - Metric object from web-vitals
   */
  reportToAnalytics: (name, metric) => {
    if (window.gtag) {
      window.gtag('event', name, {
        value: Math.round(name === 'CLS' ? metric.value * 1000 : metric.value),
        metric_id: metric.id,
        metric_value: metric.value,
        metric_delta: metric.delta,
        event_category: 'Web Vitals',
        non_interaction: true,
      });
    }
  },
  
  /**
   * Store Core Web Vitals metrics in localStorage for historical tracking
   * @param {string} name - Metric name
   * @param {number} value - Metric value
   */
  storeMetric: (name, value) => {
    try {
      const now = new Date().toISOString();
      const pageUrl = window.location.pathname;
      
      // Get existing metrics or initialize empty array
      const storedMetrics = JSON.parse(localStorage.getItem('seo_cwv_metrics') || '[]');
      
      // Add new metric
      storedMetrics.push({
        name,
        value,
        timestamp: now,
        page: pageUrl,
      });
      
      // Keep only last 100 entries to avoid localStorage limits
      const trimmedMetrics = storedMetrics.slice(-100);
      
      // Save back to localStorage
      localStorage.setItem('seo_cwv_metrics', JSON.stringify(trimmedMetrics));
    } catch (error) {
      console.error('Error storing Core Web Vitals metric:', error);
    }
  },
  
  /**
   * Get stored Core Web Vitals metrics
   * @returns {Array} Array of stored metrics
   */
  getStoredMetrics: () => {
    try {
      return JSON.parse(localStorage.getItem('seo_cwv_metrics') || '[]');
    } catch (error) {
      console.error('Error retrieving Core Web Vitals metrics:', error);
      return [];
    }
  },
  
  /**
   * Calculate average Core Web Vitals scores
   * @returns {Object} Average scores for each metric
   */
  getAverageScores: () => {
    const metrics = coreWebVitals.getStoredMetrics();
    const scores = {};
    
    // Group metrics by name
    metrics.forEach(metric => {
      if (!scores[metric.name]) {
        scores[metric.name] = {
          sum: 0,
          count: 0,
        };
      }
      
      scores[metric.name].sum += metric.value;
      scores[metric.name].count += 1;
    });
    
    // Calculate averages
    const averages = {};
    Object.entries(scores).forEach(([name, data]) => {
      averages[name] = data.sum / data.count;
    });
    
    return averages;
  },
  
  /**
   * Check if Core Web Vitals pass Google's thresholds
   * @returns {Object} Pass/fail status for each metric
   */
  checkThresholds: () => {
    const averages = coreWebVitals.getAverageScores();
    
    return {
      LCP: averages.LCP ? { 
        value: averages.LCP,
        passes: averages.LCP < 2500, // Good < 2.5s
        status: averages.LCP < 2500 ? 'good' : (averages.LCP < 4000 ? 'needs-improvement' : 'poor')
      } : null,
      FID: averages.FID ? {
        value: averages.FID,
        passes: averages.FID < 100, // Good < 100ms
        status: averages.FID < 100 ? 'good' : (averages.FID < 300 ? 'needs-improvement' : 'poor')
      } : null,
      CLS: averages.CLS ? {
        value: averages.CLS,
        passes: averages.CLS < 0.1, // Good < 0.1
        status: averages.CLS < 0.1 ? 'good' : (averages.CLS < 0.25 ? 'needs-improvement' : 'poor')
      } : null,
      FCP: averages.FCP ? {
        value: averages.FCP,
        passes: averages.FCP < 1800, // Good < 1.8s
        status: averages.FCP < 1800 ? 'good' : (averages.FCP < 3000 ? 'needs-improvement' : 'poor')
      } : null,
      TTFB: averages.TTFB ? {
        value: averages.TTFB,
        passes: averages.TTFB < 800, // Good < 800ms
        status: averages.TTFB < 800 ? 'good' : (averages.TTFB < 1800 ? 'needs-improvement' : 'poor')
      } : null,
    };
  }
};

// SEO metadata tracking
export const metadataTracker = {
  /**
   * Extract and analyze current page metadata
   * @returns {Object} Metadata analysis results
   */
  analyzePage: () => {
    if (typeof document === 'undefined') return {};
    
    const title = document.title;
    const metaDescription = document.querySelector('meta[name="description"]')?.content;
    const canonicalUrl = document.querySelector('link[rel="canonical"]')?.href;
    const hreflangTags = Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')).map(tag => ({
      lang: tag.getAttribute('hreflang'),
      href: tag.getAttribute('href')
    }));
    const structuredData = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(script => {
      try {
        return JSON.parse(script.textContent);
      } catch (e) {
        return { error: 'Invalid JSON-LD' };
      }
    });
    
    // Analyze title
    const titleAnalysis = {
      length: title?.length || 0,
      hasKeywords: false,
      isOptimalLength: false
    };
    
    if (title) {
      // Check if title contains important keywords (simplified example)
      const keywords = ['istanbul', 'mediterranean', 'turkish', 'doner', 'restaurant', 'las vegas'];
      titleAnalysis.hasKeywords = keywords.some(keyword => title.toLowerCase().includes(keyword));
      
      // Check if title is optimal length (50-60 characters)
      titleAnalysis.isOptimalLength = title.length >= 50 && title.length <= 60;
    }
    
    // Analyze meta description
    const descriptionAnalysis = {
      length: metaDescription?.length || 0,
      hasKeywords: false,
      isOptimalLength: false
    };
    
    if (metaDescription) {
      // Check if description contains important keywords (simplified example)
      const keywords = ['istanbul', 'mediterranean', 'turkish', 'doner', 'restaurant', 'las vegas'];
      descriptionAnalysis.hasKeywords = keywords.some(keyword => metaDescription.toLowerCase().includes(keyword));
      
      // Check if description is optimal length (120-158 characters)
      descriptionAnalysis.isOptimalLength = metaDescription.length >= 120 && metaDescription.length <= 158;
    }
    
    return {
      url: window.location.href,
      title,
      titleAnalysis,
      metaDescription,
      descriptionAnalysis,
      canonicalUrl,
      hreflangTags,
      structuredData,
      timestamp: new Date().toISOString()
    };
  },
  
  /**
   * Store metadata analysis in localStorage
   */
  trackCurrentPage: () => {
    try {
      const analysis = metadataTracker.analyzePage();
      const storedAnalyses = JSON.parse(localStorage.getItem('seo_metadata_analyses') || '[]');
      
      // Check if we already have an analysis for this URL
      const existingIndex = storedAnalyses.findIndex(item => item.url === analysis.url);
      
      if (existingIndex >= 0) {
        // Update existing analysis
        storedAnalyses[existingIndex] = analysis;
      } else {
        // Add new analysis
        storedAnalyses.push(analysis);
      }
      
      // Keep only last 50 entries
      const trimmedAnalyses = storedAnalyses.slice(-50);
      
      localStorage.setItem('seo_metadata_analyses', JSON.stringify(trimmedAnalyses));
    } catch (error) {
      console.error('Error storing metadata analysis:', error);
    }
  },
  
  /**
   * Get stored metadata analyses
   * @returns {Array} Array of stored analyses
   */
  getStoredAnalyses: () => {
    try {
      return JSON.parse(localStorage.getItem('seo_metadata_analyses') || '[]');
    } catch (error) {
      console.error('Error retrieving metadata analyses:', error);
      return [];
    }
  },
  
  /**
   * Get metadata analysis for a specific URL
   * @param {string} url - URL to get analysis for
   * @returns {Object|null} Analysis object or null if not found
   */
  getAnalysisForUrl: (url) => {
    const analyses = metadataTracker.getStoredAnalyses();
    return analyses.find(analysis => analysis.url === url) || null;
  }
};

// SEO ranking tracker (mock implementation - would need to be connected to real ranking data API)
export const rankingTracker = {
  /**
   * Mock function to fetch keyword rankings
   * In a real implementation, this would connect to Search Console API or a third-party SEO tool
   * @returns {Promise<Array>} Promise resolving to array of keyword rankings
   */
  fetchRankings: async () => {
    // This is a mock implementation
    // In a real app, you would connect to Google Search Console API or a third-party SEO tool
    
    // Mock data
    const mockRankings = [
      { keyword: 'turkish restaurant las vegas', position: 3, previousPosition: 5, url: 'https://www.istanbullv.com/' },
      { keyword: 'doner kebab las vegas', position: 2, previousPosition: 2, url: 'https://www.istanbullv.com/' },
      { keyword: 'mediterranean food near me', position: 8, previousPosition: 12, url: 'https://www.istanbullv.com/' },
      { keyword: 'halal food las vegas', position: 5, previousPosition: 7, url: 'https://www.istanbullv.com/halal' },
      { keyword: 'shawarma las vegas', position: 4, previousPosition: 6, url: 'https://www.istanbullv.com/shawarma' },
    ];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockRankings;
  },
  
  /**
   * Store keyword rankings in localStorage
   * @param {Array} rankings - Array of keyword rankings
   */
  storeRankings: (rankings) => {
    try {
      const now = new Date().toISOString();
      
      // Get existing rankings history
      const rankingsHistory = JSON.parse(localStorage.getItem('seo_rankings_history') || '[]');
      
      // Add new rankings snapshot
      rankingsHistory.push({
        timestamp: now,
        rankings
      });
      
      // Keep only last 30 snapshots
      const trimmedHistory = rankingsHistory.slice(-30);
      
      localStorage.setItem('seo_rankings_history', JSON.stringify(trimmedHistory));
    } catch (error) {
      console.error('Error storing keyword rankings:', error);
    }
  },
  
  /**
   * Get stored rankings history
   * @returns {Array} Array of ranking snapshots
   */
  getRankingsHistory: () => {
    try {
      return JSON.parse(localStorage.getItem('seo_rankings_history') || '[]');
    } catch (error) {
      console.error('Error retrieving rankings history:', error);
      return [];
    }
  },
  
  /**
   * Calculate ranking changes and trends
   * @returns {Object} Ranking trends
   */
  calculateTrends: () => {
    const history = rankingTracker.getRankingsHistory();
    
    if (history.length < 2) {
      return { insufficient: true };
    }
    
    const latest = history[history.length - 1];
    const previous = history[history.length - 2];
    
    const trends = {
      improved: [],
      declined: [],
      unchanged: [],
      averageChange: 0
    };
    
    let totalChange = 0;
    let keywordCount = 0;
    
    // Compare latest rankings with previous
    latest.rankings.forEach(latestRanking => {
      const previousRanking = previous.rankings.find(r => r.keyword === latestRanking.keyword);
      
      if (previousRanking) {
        const change = previousRanking.position - latestRanking.position; // Positive means improvement
        
        if (change > 0) {
          trends.improved.push({
            keyword: latestRanking.keyword,
            position: latestRanking.position,
            change
          });
        } else if (change < 0) {
          trends.declined.push({
            keyword: latestRanking.keyword,
            position: latestRanking.position,
            change
          });
        } else {
          trends.unchanged.push({
            keyword: latestRanking.keyword,
            position: latestRanking.position
          });
        }
        
        totalChange += change;
        keywordCount++;
      }
    });
    
    trends.averageChange = keywordCount > 0 ? totalChange / keywordCount : 0;
    
    return trends;
  }
};

// Initialize SEO performance monitoring
export const initSEOPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;
  
  // Initialize Core Web Vitals monitoring
  coreWebVitals.init();
  
  // Track metadata for current page
  metadataTracker.trackCurrentPage();
  
  // Track page navigation for SPA
  const originalPushState = window.history.pushState;
  window.history.pushState = function() {
    originalPushState.apply(this, arguments);
    
    // Wait for React to update the DOM
    setTimeout(() => {
      metadataTracker.trackCurrentPage();
    }, 300);
  };
  
  // Track browser back/forward navigation
  window.addEventListener('popstate', () => {
    // Wait for React to update the DOM
    setTimeout(() => {
      metadataTracker.trackCurrentPage();
    }, 300);
  });
  
  console.log('SEO Performance Monitoring initialized');
};

export default {
  initSEOPerformanceMonitoring,
  coreWebVitals,
  metadataTracker,
  rankingTracker
};
