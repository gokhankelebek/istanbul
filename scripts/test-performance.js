#!/usr/bin/env node

// Performance Test Script for Istanbul Mediterranean
// Run with: node scripts/test-performance.js

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runPerformanceTest() {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance']};
  const runnerResult = await lighthouse('http://localhost:3000', options);

  console.log('Performance Score:', runnerResult.lhr.categories.performance.score * 100);
  
  // Core Web Vitals
  const cwv = runnerResult.lhr.audits;
  console.log('LCP:', cwv['largest-contentful-paint'].displayValue);
  console.log('FID:', cwv['max-potential-fid'].displayValue);
  console.log('CLS:', cwv['cumulative-layout-shift'].displayValue);

  await chrome.kill();
}

runPerformanceTest();