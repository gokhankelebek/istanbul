import React, { useState, useEffect } from 'react';
import { validateCurrentPageSchemas } from '../utils/schemaValidator';

/**
 * Schema Markup Tester Component
 * 
 * This component allows developers to test and debug structured data
 * implementation directly within the development environment.
 * 
 * It extracts all JSON-LD scripts from the current page, validates them,
 * and displays the results in a user-friendly interface.
 */
const SchemaMarkupTester = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Only visible in development mode
  if (process.env.NODE_ENV !== 'development') return null;

  // Test current page schemas
  const testCurrentPage = async () => {
    setIsLoading(true);
    try {
      const validationResults = await validateCurrentPageSchemas();
      setResults(validationResults);
      setActiveTab(0); // Reset to first tab
    } catch (error) {
      console.error('Error validating schemas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    if (!isVisible && results.length === 0) {
      testCurrentPage();
    }
  };

  // Format JSON for display
  const formatJson = (json) => {
    return JSON.stringify(json, null, 2);
  };

  // Get schema type label
  const getSchemaTypeLabel = (schema) => {
    if (!schema) return 'Invalid Schema';
    return schema['@type'] || 'Unknown Type';
  };

  // Get status badge
  const getStatusBadge = (result) => {
    if (!result.valid) {
      return (
        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
          Invalid
        </span>
      );
    }
    
    if (result.warnings.length > 0) {
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

  return (
    <div className="fixed bottom-0 left-0 z-50">
      {/* Toggle Button */}
      <button
        onClick={toggleVisibility}
        className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-tr-md shadow-lg flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        {isVisible ? 'Hide Schema Tester' : 'Schema Tester'}
      </button>

      {/* Tester Panel */}
      {isVisible && (
        <div className="bg-white shadow-xl border border-gray-200 rounded-tr-lg p-4 w-[800px] h-[600px] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Schema Markup Tester</h2>
            <button
              onClick={testCurrentPage}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Testing...
                </>
              ) : (
                'Test Current Page'
              )}
            </button>
          </div>

          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <p>Click "Test Current Page" to analyze structured data</p>
            </div>
          ) : (
            <div>
              {/* Tabs */}
              <div className="border-b border-gray-200 mb-4">
                <nav className="flex -mb-px overflow-x-auto">
                  {results.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`mr-4 py-2 px-3 font-medium text-sm whitespace-nowrap flex items-center ${
                        activeTab === index
                          ? 'border-b-2 border-purple-500 text-purple-600'
                          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Schema {index + 1}: {getSchemaTypeLabel(result.schema)}
                      <span className="ml-2">{getStatusBadge(result.result)}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Active Tab Content */}
              {results[activeTab] && (
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Schema Content */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Schema Content</h3>
                      <div className="bg-gray-50 p-4 rounded-md overflow-auto h-96">
                        <pre className="text-xs">{formatJson(results[activeTab].schema)}</pre>
                      </div>
                    </div>

                    {/* Schema Type Coverage */}
                    <div className="mb-6 p-4 border rounded-lg border-purple-200 bg-purple-50">
                      <h3 className="font-semibold text-lg mb-2">Schema Type Coverage</h3>
                      <p className="text-sm mb-2">Expected schema types for this page:</p>
                      
                      {window.location.pathname && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {results.length === 0 ? (
                            <span className="text-red-600">No schema markup found on this page</span>
                          ) : (
                            <>
                              {/* Get unique schema types from results */}
                              {Array.from(new Set(results
                                .filter(r => r.result.schemaType)
                                .map(r => r.result.schemaType)))
                                .map(type => (
                                  <span key={type} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                    {type}
                                  </span>
                                ))
                              }
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Results */}
                  {results.map((result, index) => (
                    <div 
                      key={index} 
                      className={`mb-6 p-4 border rounded-lg ${activeTab === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <button 
                            onClick={() => setActiveTab(index)}
                            className="text-lg font-semibold flex items-center"
                          >
                            <span className="mr-2">{getSchemaTypeLabel(result.schema)}</span>
                            {getStatusBadge(result.result)}
                          </button>
                        </div>
                      </div>
                      
                      {activeTab === index && (
                        <div className="mt-4">
                          {/* Errors */}
                          {result.result.errors && result.result.errors.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-red-600 mb-2">Errors:</h4>
                              <ul className="list-disc pl-5">
                                {result.result.errors.map((error, i) => (
                                  <li key={i} className="text-red-600">{error}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {/* Warnings */}
                          {result.result.warnings && result.result.warnings.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-yellow-600 mb-2">Warnings:</h4>
                              <ul className="list-disc pl-5">
                                {result.result.warnings.map((warning, i) => (
                                  <li key={i} className="text-yellow-600">{warning}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {/* Info/Recommendations */}
                          {result.result.info && result.result.info.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-blue-600 mb-2">Recommendations:</h4>
                              <ul className="list-disc pl-5">
                                {result.result.info.map((info, i) => (
                                  <li key={i} className="text-blue-600">{info}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {/* JSON-LD */}
                          <div>
                            <h4 className="font-semibold mb-2">JSON-LD:</h4>
                            <pre className="bg-gray-800 text-green-400 p-4 rounded-md overflow-auto max-h-96">
                              {result.schema ? formatJson(result.schema) : 'Invalid JSON'}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Google Testing Tools */}
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">External Testing Tools</h3>
                    <div className="flex space-x-2">
                      <a
                        href="https://search.google.com/test/rich-results"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm"
                      >
                        Google Rich Results Test
                      </a>
                      <a
                        href="https://validator.schema.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-md text-sm"
                      >
                        Schema.org Validator
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SchemaMarkupTester;
