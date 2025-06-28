import React, { useState, useEffect } from 'react';
import { coreWebVitals, metadataTracker, rankingTracker } from '../utils/seoPerformanceMonitor';
import StructuredDataDashboard from './StructuredDataDashboard';

/**
 * Enhanced SEO Dashboard Component
 * 
 * Displays real-time Core Web Vitals and other SEO metrics collected by the
 * seoPerformanceMonitor utility. Only visible in development mode or for admin users.
 */
const EnhancedSEODashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('webVitals');
  const [webVitalsData, setWebVitalsData] = useState({});
  const [metadataData, setMetadataData] = useState([]);
  const [rankingsData, setRankingsData] = useState([]);
  const [rankingTrends, setRankingTrends] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);

  // Check if user is admin or in development mode
  useEffect(() => {
    // Check if in development mode
    setIsDevMode(process.env.NODE_ENV === 'development');
    
    // Check if user is admin (simplified example)
    const checkAdminStatus = () => {
      // In a real app, this would check authentication status
      // For now, just check for a localStorage flag
      return localStorage.getItem('isAdmin') === 'true';
    };
    
    setIsAdmin(checkAdminStatus());
  }, []);

  // Load data when dashboard becomes visible
  useEffect(() => {
    if (isVisible) {
      // Load Core Web Vitals data
      const vitalsData = coreWebVitals.checkThresholds();
      setWebVitalsData(vitalsData);
      
      // Load metadata analyses
      const metadataAnalyses = metadataTracker.getStoredAnalyses();
      setMetadataData(metadataAnalyses);
      
      // Load rankings data
      const fetchRankings = async () => {
        try {
          const rankings = await rankingTracker.fetchRankings();
          setRankingsData(rankings);
          
          const trends = rankingTracker.calculateTrends();
          setRankingTrends(trends);
        } catch (error) {
          console.error('Error fetching rankings:', error);
        }
      };
      
      fetchRankings();
    }
  }, [isVisible]);

  // Only render if in development mode or user is admin
  if (!isDevMode && !isAdmin) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Dashboard toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg flex items-center justify-center w-12 h-12"
        title="Toggle SEO Dashboard"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>
      
      {/* Dashboard panel */}
      {isVisible && (
        <div className="fixed bottom-20 right-4 bg-white rounded-lg shadow-xl border border-gray-200 w-96 max-h-[80vh] overflow-auto">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">SEO Performance Dashboard</h2>
            <p className="text-sm text-gray-500">
              {isDevMode ? 'Development Mode' : 'Admin View'}
            </p>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('webVitals')}
              className={`flex-1 py-2 px-4 text-sm font-medium ${activeTab === 'webVitals' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Core Web Vitals
            </button>
            <button
              onClick={() => setActiveTab('metadata')}
              className={`flex-1 py-2 px-4 text-sm font-medium ${activeTab === 'metadata' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Metadata
            </button>
            <button
              onClick={() => setActiveTab('rankings')}
              className={`flex-1 py-2 px-4 text-sm font-medium ${activeTab === 'rankings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Rankings
            </button>
            <button
              onClick={() => setActiveTab('structuredData')}
              className={`flex-1 py-2 px-4 text-sm font-medium ${activeTab === 'structuredData' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Schema Data
            </button>
          </div>
          
          {/* Tab content */}
          <div className="p-4">
            {/* Core Web Vitals tab */}
            {activeTab === 'webVitals' && (
              <div>
                <h3 className="text-md font-medium mb-3">Core Web Vitals</h3>
                
                {Object.entries(webVitalsData).map(([metric, data]) => (
                  data && (
                    <div key={metric} className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{metric}</span>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                          data.status === 'good' ? 'bg-green-100 text-green-800' :
                          data.status === 'needs-improvement' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {data.value.toFixed(1)} {metric === 'CLS' ? '' : 'ms'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            data.status === 'good' ? 'bg-green-500' :
                            data.status === 'needs-improvement' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{
                            width: `${Math.min(100, metric === 'CLS' 
                              ? (data.value / 0.25) * 100 
                              : (data.value / (metric === 'LCP' ? 4000 : 3000)) * 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  )
                ))}
                
                <div className="mt-4 text-xs text-gray-500">
                  <p>LCP: Largest Contentful Paint (target: &lt;2.5s)</p>
                  <p>FID: First Input Delay (target: &lt;100ms)</p>
                  <p>CLS: Cumulative Layout Shift (target: &lt;0.1)</p>
                  <p>TTFB: Time to First Byte (target: &lt;800ms)</p>
                </div>
              </div>
            )}
            
            {/* Metadata tab */}
            {activeTab === 'metadata' && (
              <div>
                <h3 className="text-md font-medium mb-3">Page Metadata</h3>
                
                {metadataData.length > 0 ? (
                  <div className="space-y-4">
                    {metadataData.slice(-5).map((page, index) => (
                      <div key={index} className="border border-gray-200 rounded p-3">
                        <h4 className="font-medium text-sm truncate">{page.url}</h4>
                        
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Title</span>
                            <span className={`text-xs ${page.titleAnalysis.isOptimalLength ? 'text-green-600' : 'text-yellow-600'}`}>
                              {page.title?.length || 0} chars
                            </span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Meta Description</span>
                            <span className={`text-xs ${page.descriptionAnalysis.isOptimalLength ? 'text-green-600' : 'text-yellow-600'}`}>
                              {page.metaDescription?.length || 0} chars
                            </span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Canonical URL</span>
                            <span className="text-xs">{page.canonicalUrl ? '✓' : '✗'}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Hreflang Tags</span>
                            <span className="text-xs">{page.hreflangTags?.length || 0}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-500">Structured Data</span>
                            <span className="text-xs">{page.structuredData?.length || 0} schemas</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No metadata analyses available yet.</p>
                )}
              </div>
            )}
            
            {/* Rankings tab */}
            {activeTab === 'rankings' && (
              <div>
                <h3 className="text-md font-medium mb-3">Keyword Rankings</h3>
                
                {rankingsData.length > 0 ? (
                  <div className="space-y-2">
                    {rankingsData.map((keyword, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm truncate max-w-[60%]">{keyword.keyword}</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">{keyword.position}</span>
                          {keyword.position !== keyword.previousPosition && (
                            <span className={`ml-1 text-xs ${keyword.position < keyword.previousPosition ? 'text-green-600' : 'text-red-600'}`}>
                              {keyword.position < keyword.previousPosition ? '↑' : '↓'}
                              {Math.abs(keyword.position - keyword.previousPosition)}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {!rankingTrends.insufficient && (
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <p className="text-xs font-medium">
                          Average change: 
                          <span className={rankingTrends.averageChange > 0 ? 'text-green-600' : rankingTrends.averageChange < 0 ? 'text-red-600' : 'text-gray-600'}>
                            {' '}{rankingTrends.averageChange > 0 ? '+' : ''}{rankingTrends.averageChange.toFixed(1)}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No ranking data available yet.</p>
                )}
                
                <div className="mt-4 text-xs text-gray-500">
                  <p>Note: This is simulated ranking data. Connect to Search Console API for real data.</p>
                </div>
              </div>
            )}
            
            {/* Structured Data tab */}
            {activeTab === 'structuredData' && (
              <div>
                <h3 className="text-md font-medium mb-3">Structured Data Validation</h3>
                <div className="text-sm">
                  <p className="mb-2">Click the button below to run a full structured data validation across all routes:</p>
                  <button
                    onClick={() => {
                      alert('This would run the validate-structured-data.js script in a real implementation');
                    }}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm mb-3"
                  >
                    Run Full Validation
                  </button>
                  
                  <div className="bg-blue-50 p-3 rounded-md mb-3">
                    <h4 className="font-medium text-blue-800 mb-1">Current Page Schema</h4>
                    <p className="text-xs text-blue-600 mb-2">Found on {window.location.pathname}</p>
                    <button
                      onClick={() => {
                        // This would open the SchemaMarkupTester component in a real implementation
                        alert('This would open the Schema Markup Tester for the current page');
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md text-xs"
                    >
                      Test Current Page Schema
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-500 mb-2">
                    For more detailed analysis and a full dashboard view, click below:
                  </p>
                  <button
                    onClick={() => {
                      window.open('/admin/seo/structured-data', '_blank');
                    }}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-sm"
                  >
                    Open Full Schema Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-3 border-t border-gray-200 bg-gray-50 text-right">
            <button
              onClick={() => setIsVisible(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSEODashboard;
