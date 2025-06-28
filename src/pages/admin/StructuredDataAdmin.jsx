import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StructuredDataDashboard from '../../components/StructuredDataDashboard';

/**
 * Structured Data Admin Page
 * 
 * This page provides a comprehensive view of structured data validation results
 * across the entire website. It's intended for SEO specialists and developers
 * to monitor and fix structured data issues.
 */
const StructuredDataAdmin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportContent, setReportContent] = useState('');

  // Fetch available reports
  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would fetch data from an API
        // For now, we'll simulate the data
        const mockReports = [
          { id: 1, name: 'summary-report.md', date: '2025-06-28', type: 'summary' },
          { id: 2, name: 'report-home.md', date: '2025-06-28', type: 'route' },
          { id: 3, name: 'report-menu.md', date: '2025-06-28', type: 'route' },
          { id: 4, name: 'report-about.md', date: '2025-06-28', type: 'route' },
          { id: 5, name: 'report-contact.md', date: '2025-06-28', type: 'route' },
          { id: 6, name: 'report-turkishfood.md', date: '2025-06-28', type: 'route' },
        ];
        
        setReports(mockReports);
        
        // Auto-select the summary report
        if (mockReports.length > 0) {
          const summaryReport = mockReports.find(r => r.type === 'summary') || mockReports[0];
          setSelectedReport(summaryReport);
          fetchReportContent(summaryReport.name);
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Fetch report content
  const fetchReportContent = async (reportName) => {
    try {
      // In a real implementation, this would fetch the report content from the server
      // For now, we'll simulate the content based on what we know
      
      let content = '';
      
      if (reportName === 'summary-report.md') {
        content = `# Structured Data Validation Summary Report
Generated on: 2025-06-28

## Overview
- **Total Routes Validated**: 6
- **Routes with Errors**: 1
- **Routes with Warnings**: 3
- **Routes with Missing Schema Types**: 2

## Route Summary

| Route | Status | Expected Schema Types | Missing Schema Types |
|-------|--------|----------------------|---------------------|
| / | ✅ Valid | Restaurant, LocalBusiness, WebSite | None |
| /menu | ⚠️ Warnings | Menu, ItemList, Restaurant | None |
| /about | ✅ Valid | AboutPage, Organization, BreadcrumbList | None |
| /contact | ⚠️ Warnings | LocalBusiness, BreadcrumbList | None |
| /turkishfood | ❌ Errors | Article, BreadcrumbList | BreadcrumbList |
| /blog | ⚠️ Warnings | Blog, ItemList, BreadcrumbList | ItemList |

## Recommendations
1. Add missing BreadcrumbList schema to /turkishfood
2. Add missing ItemList schema to /blog
3. Fix required properties in Restaurant schema on /menu
4. Add recommended properties to LocalBusiness schema on /contact`;
      } else if (reportName === 'report-home.md') {
        content = `# Structured Data Validation Report: Home Page (/)
Generated on: 2025-06-28

## Summary
- **URL**: http://localhost:3000/
- **Expected Schema Types**: Restaurant, LocalBusiness, WebSite
- **Found Schema Types**: Restaurant, LocalBusiness, WebSite
- **Status**: ✅ Valid

## Validation Results

### Schema #1: Restaurant
- **Type**: Restaurant
- **Status**: ✅ Valid
- **Recommendations**:
  - Consider adding 'aggregateRating' property
  - Consider adding 'review' property

### Schema #2: LocalBusiness
- **Type**: LocalBusiness
- **Status**: ✅ Valid
- **Recommendations**:
  - Consider adding 'geo' property with coordinates

### Schema #3: WebSite
- **Type**: WebSite
- **Status**: ✅ Valid
- **Recommendations**: None`;
      } else {
        content = `# Structured Data Validation Report: ${reportName.replace('report-', '').replace('.md', '')}
Generated on: 2025-06-28

## Summary
- **URL**: http://localhost:3000/${reportName.replace('report-', '').replace('.md', '')}
- **Status**: ⚠️ Warnings

This is a placeholder for the ${reportName} content.
In a real implementation, this would show the actual validation results for this route.`;
      }
      
      setReportContent(content);
    } catch (error) {
      console.error('Error fetching report content:', error);
      setReportContent('Error loading report content');
    }
  };

  // Run validation
  const runValidation = () => {
    alert('This would trigger the validate-structured-data.js script in a real implementation');
    // In a real implementation, this would call an API endpoint that runs the validation script
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Structured Data Administration</h1>
        <div className="flex space-x-2">
          <button
            onClick={runValidation}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Run Validation
          </button>
          <Link
            to="/admin"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          >
            Back to Admin
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dashboard */}
        <div className="lg:col-span-3">
          <StructuredDataDashboard />
        </div>
        
        {/* Reports List */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Validation Reports</h2>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {reports.map((report) => (
                <li key={report.id} className="py-2">
                  <button
                    onClick={() => {
                      setSelectedReport(report);
                      fetchReportContent(report.name);
                    }}
                    className={`w-full text-left px-2 py-1 rounded ${
                      selectedReport?.id === report.id
                        ? 'bg-blue-100 text-blue-800'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {report.name.replace('report-', '').replace('.md', '')}
                      </span>
                      <span className="text-xs text-gray-500">{report.date}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {report.type === 'summary' ? 'Summary Report' : 'Route Report'}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Report Content */}
        <div className="bg-white shadow rounded-lg p-4 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">
            {selectedReport ? (
              <>
                {selectedReport.type === 'summary' ? 'Summary Report' : `Route: ${selectedReport.name.replace('report-', '').replace('.md', '')}`}
                <span className="text-sm font-normal text-gray-500 ml-2">
                  {selectedReport.date}
                </span>
              </>
            ) : (
              'Report Content'
            )}
          </h2>
          
          {selectedReport ? (
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md text-sm">
                {reportContent}
              </pre>
            </div>
          ) : (
            <p className="text-gray-500">Select a report to view its content</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StructuredDataAdmin;
