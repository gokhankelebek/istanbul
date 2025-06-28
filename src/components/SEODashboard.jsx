import React, { useState, useEffect } from 'react';

/**
 * SEO Dashboard Component
 * 
 * This component provides a simple interface to monitor SEO metrics
 * and performance data. In a production environment, this would connect
 * to real analytics APIs (Google Search Console, Google Analytics, etc.)
 * 
 * For now, it uses mock data for demonstration purposes.
 */
export default function SEODashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data - in production, this would come from real APIs
  const mockData = {
    overview: {
      impressions: 12450,
      clicks: 1245,
      ctr: 10.0,
      avgPosition: 8.3,
      indexedPages: 32,
      crawlErrors: 2,
    },
    keywords: [
      { keyword: 'turkish food las vegas', position: 3, volume: 720, change: 2 },
      { keyword: 'halal restaurant las vegas strip', position: 2, volume: 590, change: 5 },
      { keyword: 'doner kebab las vegas', position: 1, volume: 320, change: 0 },
      { keyword: 'best turkish restaurant las vegas', position: 4, volume: 210, change: -1 },
      { keyword: 'baklava las vegas', position: 7, volume: 180, change: 3 },
    ],
    pages: [
      { url: '/', impressions: 5230, clicks: 520, ctr: 9.9, position: 7.2 },
      { url: '/turkishfood', impressions: 2340, clicks: 312, ctr: 13.3, position: 3.1 },
      { url: '/menu', impressions: 1870, clicks: 201, ctr: 10.7, position: 5.4 },
      { url: '/halal', impressions: 1560, clicks: 145, ctr: 9.3, position: 6.8 },
      { url: '/about', impressions: 1450, clicks: 67, ctr: 4.6, position: 12.3 },
    ],
    issues: [
      { type: 'warning', message: 'Missing alt text on 3 images', url: '/menu' },
      { type: 'error', message: 'Mobile usability issue: Clickable elements too close together', url: '/contact' },
      { type: 'info', message: 'Consider adding FAQ schema to increase visibility', url: '/about' },
    ]
  };
  
  // Toggle dashboard visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  
  // Only visible to admin users or in development mode
  const isAdmin = process.env.NODE_ENV === 'development' || localStorage.getItem('isAdmin') === 'true';
  
  if (!isAdmin) return null;
  
  return (
    <div className="fixed bottom-0 right-0 z-50">
      {/* Toggle Button */}
      <button 
        onClick={toggleVisibility}
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-tl-md shadow-lg"
      >
        {isVisible ? 'Hide SEO Dashboard' : 'Show SEO Dashboard'}
      </button>
      
      {/* Dashboard Panel */}
      {isVisible && (
        <div className="bg-white shadow-xl border border-gray-200 rounded-tl-lg p-4 w-[800px] h-[500px] overflow-auto">
          <h2 className="text-xl font-bold mb-4">SEO Performance Dashboard</h2>
          
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-4">
            <nav className="flex -mb-px">
              {['overview', 'keywords', 'pages', 'issues'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`mr-8 py-2 px-1 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="py-2">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Impressions (30 days)</p>
                  <p className="text-2xl font-bold">{mockData.overview.impressions.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Clicks (30 days)</p>
                  <p className="text-2xl font-bold">{mockData.overview.clicks.toLocaleString()}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">CTR</p>
                  <p className="text-2xl font-bold">{mockData.overview.ctr}%</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Avg. Position</p>
                  <p className="text-2xl font-bold">{mockData.overview.avgPosition}</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Indexed Pages</p>
                  <p className="text-2xl font-bold">{mockData.overview.indexedPages}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Crawl Errors</p>
                  <p className="text-2xl font-bold">{mockData.overview.crawlErrors}</p>
                </div>
              </div>
            )}
            
            {/* Keywords Tab */}
            {activeTab === 'keywords' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockData.keywords.map((keyword, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{keyword.keyword}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{keyword.position}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{keyword.volume}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            keyword.change > 0 
                              ? 'bg-green-100 text-green-800' 
                              : keyword.change < 0 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                            {keyword.change > 0 ? '+' : ''}{keyword.change}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Pages Tab */}
            {activeTab === 'pages' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impressions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockData.pages.map((page, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{page.url}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.impressions.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.clicks.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.ctr}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.position}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Issues Tab */}
            {activeTab === 'issues' && (
              <div className="space-y-4">
                {mockData.issues.map((issue, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-md ${
                      issue.type === 'error' 
                        ? 'bg-red-50 border-l-4 border-red-400' 
                        : issue.type === 'warning'
                          ? 'bg-yellow-50 border-l-4 border-yellow-400'
                          : 'bg-blue-50 border-l-4 border-blue-400'
                    }`}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        {issue.type === 'error' ? (
                          <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        ) : issue.type === 'warning' ? (
                          <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-800">{issue.message}</h3>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>URL: {issue.url}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-4 text-xs text-gray-500">
            <p>Note: This is a demonstration dashboard with mock data. In production, connect to Google Search Console and Analytics APIs.</p>
          </div>
        </div>
      )}
    </div>
  );
}
