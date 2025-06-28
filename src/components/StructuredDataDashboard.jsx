import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Structured Data Dashboard Component
 * 
 * This component displays a summary of structured data validation results
 * across all routes of the application. It helps developers and SEO specialists
 * monitor schema markup implementation and identify issues.
 */
const StructuredDataDashboard = () => {
  const [validationSummary, setValidationSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('summary');

  // Only visible in development mode
  if (process.env.NODE_ENV !== 'development') return null;

  // Expected schema types per route
  const EXPECTED_SCHEMAS = {
    '/': ['Restaurant', 'LocalBusiness', 'WebSite', 'FAQPage'],
    '/menu': ['Menu', 'ItemList', 'Restaurant'],
    '/turkishfood': ['Article', 'BreadcrumbList'],
    '/halal': ['Article', 'BreadcrumbList'],
    '/about': ['AboutPage', 'Organization', 'BreadcrumbList'],
    '/contact': ['LocalBusiness', 'BreadcrumbList'],
    '/delivery': ['Service', 'BreadcrumbList'],
    '/faq': ['FAQPage', 'BreadcrumbList'],
    '/catering': ['Service', 'BreadcrumbList'],
    '/blog': ['Blog', 'ItemList', 'BreadcrumbList']
  };

  // Load validation summary from reports
  useEffect(() => {
    const fetchValidationSummary = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would fetch data from an API
        // For now, we'll simulate the data based on what we know
        const summary = {
          routes: Object.keys(EXPECTED_SCHEMAS).map(route => {
            // Simulate validation status
            const randomStatus = Math.random();
            let status = 'valid';
            if (randomStatus < 0.3) status = 'warnings';
            else if (randomStatus < 0.1) status = 'errors';
            
            return {
              path: route,
              expectedSchemas: EXPECTED_SCHEMAS[route],
              status,
              missingSchemas: randomStatus < 0.5 ? 
                EXPECTED_SCHEMAS[route].filter((_, i) => i === 0) : []
            };
          }),
          lastUpdated: new Date().toLocaleString(),
          totalErrors: 2,
          totalWarnings: 8,
          totalMissingSchemas: 12
        };
        
        setValidationSummary(summary);
      } catch (error) {
        console.error('Error fetching validation summary:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchValidationSummary();
  }, []);

  // Get status badge
  const getStatusBadge = (status) => {
    if (status === 'errors') {
      return (
        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
          Errors
        </span>
      );
    }
    
    if (status === 'warnings') {
      return (
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
          Warnings
        </span>
      );
    }
    
    return (
      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
        Valid
      </span>
    );
  };

  // Run validation
  const runValidation = () => {
    alert('This would trigger the validation script in a real implementation');
    // In a real implementation, this would call an API endpoint that runs the validation script
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-bold mb-4">Structured Data Dashboard</h2>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Structured Data Dashboard</h2>
        <button
          onClick={runValidation}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Run Validation
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-2 px-1 border-b-2 ${
              activeTab === 'summary'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => setActiveTab('routes')}
            className={`py-2 px-1 border-b-2 ${
              activeTab === 'routes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Routes
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`py-2 px-1 border-b-2 ${
              activeTab === 'recommendations'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Recommendations
          </button>
        </nav>
      </div>

      {/* Summary Tab */}
      {activeTab === 'summary' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Schema Coverage</h3>
              <p className="text-3xl font-bold text-blue-600">
                {validationSummary.routes.length - validationSummary.totalMissingSchemas}/{validationSummary.routes.length * 2}
              </p>
              <p className="text-sm text-blue-600">Expected schema types implemented</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-red-800">Errors</h3>
              <p className="text-3xl font-bold text-red-600">{validationSummary.totalErrors}</p>
              <p className="text-sm text-red-600">Critical issues to fix</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800">Warnings</h3>
              <p className="text-3xl font-bold text-yellow-600">{validationSummary.totalWarnings}</p>
              <p className="text-sm text-yellow-600">Recommendations to improve</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-4">
            Last updated: {validationSummary.lastUpdated}
          </p>
        </div>
      )}

      {/* Routes Tab */}
      {activeTab === 'routes' && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expected Schemas
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Missing Schemas
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {validationSummary.routes.map((route, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    <Link to={route.path}>{route.path}</Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1">
                      {route.expectedSchemas.map((schema, i) => (
                        <span key={i} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                          {schema}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {route.missingSchemas.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {route.missingSchemas.map((schema, i) => (
                          <span key={i} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                            {schema}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-green-600">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getStatusBadge(route.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Recommendations Tab */}
      {activeTab === 'recommendations' && (
        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2">Critical Issues</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-red-700">Fix missing required properties in Restaurant schema</li>
              <li className="text-red-700">Add BreadcrumbList schema to all content pages</li>
            </ul>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Improvements</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-yellow-700">Add aggregateRating to Restaurant schema</li>
              <li className="text-yellow-700">Include reviews in Restaurant schema</li>
              <li className="text-yellow-700">Add geo coordinates to LocalBusiness schema</li>
              <li className="text-yellow-700">Implement FAQPage schema on the homepage</li>
            </ul>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Next Steps</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-blue-700">Test all pages with Google's Rich Results Test</li>
              <li className="text-blue-700">Monitor schema implementation in Google Search Console</li>
              <li className="text-blue-700">Schedule regular validation checks</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default StructuredDataDashboard;
