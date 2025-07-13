#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

console.log('⚡ Core Web Vitals Optimization for Istanbul Mediterranean');
console.log('======================================================\n');

async function optimizeCoreWebVitals() {
  const optimizations = [];
  const issues = [];

  try {
    // Check for performance-related patterns
    console.log('🔍 Analyzing code for Core Web Vitals opportunities...\n');

    // 1. Check for lazy loading implementation
    console.log('📦 Checking lazy loading implementation...');
    const jsxFiles = await findFiles('src', ['.jsx', '.js']);
    let lazyLoadingUsed = false;
    let imagesWithoutLazyLoading = 0;

    for (const file of jsxFiles) {
      const content = await fs.readFile(file, 'utf8');
      
      // Check for React.lazy usage
      if (content.includes('React.lazy')) {
        lazyLoadingUsed = true;
      }
      
      // Check images without lazy loading
      const imgTags = content.match(/<img[^>]*>/gi) || [];
      for (const imgTag of imgTags) {
        if (!imgTag.includes('loading=') && !imgTag.includes('OptimizedImage')) {
          imagesWithoutLazyLoading++;
        }
      }
    }

    if (lazyLoadingUsed) {
      optimizations.push('✅ React.lazy() component splitting implemented');
    } else {
      issues.push('❌ No component lazy loading detected');
    }

    if (imagesWithoutLazyLoading > 0) {
      issues.push(`⚠️ ${imagesWithoutLazyLoading} images without lazy loading`);
    } else {
      optimizations.push('✅ All images use lazy loading');
    }

    // 2. Check bundle optimization
    console.log('📦 Checking bundle optimization...');
    const packageJsonExists = await fs.access('package.json').then(() => true).catch(() => false);
    if (packageJsonExists) {
      const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
      
      if (packageJson.scripts && packageJson.scripts.analyze) {
        optimizations.push('✅ Bundle analyzer script available');
      } else {
        issues.push('❌ No bundle analyzer script found');
      }
    }

    // 3. Check for performance monitoring
    console.log('📊 Checking performance monitoring...');
    const webVitalsExists = await fs.access('src/utils/webVitals.js').then(() => true).catch(() => false);
    if (webVitalsExists) {
      optimizations.push('✅ Web Vitals monitoring implemented');
    } else {
      issues.push('❌ No Web Vitals monitoring found');
    }

    // 4. Check for resource hints
    console.log('🔗 Checking resource hints...');
    const resourceHintsExists = await fs.access('src/components/ResourceHints.jsx').then(() => true).catch(() => false);
    if (resourceHintsExists) {
      optimizations.push('✅ Resource hints (preconnect, dns-prefetch) implemented');
    } else {
      issues.push('❌ No resource hints found');
    }

    // 5. Check for image optimization
    console.log('🖼️ Checking image optimization...');
    const optimizedImageExists = await fs.access('src/components/OptimizedImage.jsx').then(() => true).catch(() => false);
    if (optimizedImageExists) {
      optimizations.push('✅ OptimizedImage component available');
    } else {
      issues.push('❌ No OptimizedImage component found');
    }

    // Generate Core Web Vitals improvement recommendations
    console.log('\n⚡ CORE WEB VITALS OPTIMIZATION REPORT');
    console.log('=====================================\n');

    console.log('📊 Current Optimizations:');
    optimizations.forEach(opt => console.log(`  ${opt}`));
    console.log('');

    if (issues.length > 0) {
      console.log('🚨 Issues to Fix:');
      issues.forEach(issue => console.log(`  ${issue}`));
      console.log('');
    }

    // Specific CWV recommendations
    console.log('🎯 Core Web Vitals Improvement Plan:');
    console.log('');

    console.log('1. 📈 Largest Contentful Paint (LCP) - Target: <2.5s');
    console.log('   ✅ Optimize hero images with WebP format');
    console.log('   ✅ Preload critical above-the-fold images');
    console.log('   ✅ Use resource hints for external domains');
    console.log('   💡 Consider critical CSS inlining');
    console.log('   💡 Optimize font loading strategy');
    console.log('');

    console.log('2. 🖱️ First Input Delay (FID) - Target: <100ms');
    console.log('   ✅ Code splitting with React.lazy()');
    console.log('   ✅ Defer non-critical JavaScript');
    console.log('   💡 Break up long-running tasks');
    console.log('   💡 Use web workers for heavy computations');
    console.log('');

    console.log('3. 📐 Cumulative Layout Shift (CLS) - Target: <0.1');
    console.log('   ✅ Include size attributes on images');
    console.log('   ✅ Reserve space for dynamic content');
    console.log('   💡 Avoid inserting content above existing content');
    console.log('   💡 Use CSS aspect-ratio for images');
    console.log('');

    console.log('4. 🚀 Additional Performance Optimizations:');
    console.log('   💡 Enable gzip/brotli compression');
    console.log('   💡 Implement service worker caching');
    console.log('   💡 Optimize third-party scripts');
    console.log('   💡 Use HTTP/2 server push for critical resources');
    console.log('');

    // Generate specific action items
    console.log('🔧 IMMEDIATE ACTION ITEMS:');
    console.log('=========================\n');

    if (imagesWithoutLazyLoading > 0) {
      console.log(`1. 🖼️ Add lazy loading to ${imagesWithoutLazyLoading} images`);
      console.log('   - Replace <img> with <OptimizedImage> component');
      console.log('   - Add loading="lazy" to below-the-fold images');
    }

    console.log('2. 📦 Bundle Size Optimization');
    console.log('   - Run: npm run analyze (if available)');
    console.log('   - Remove unused dependencies');
    console.log('   - Tree shake unused code');

    console.log('3. 🎨 Critical CSS');
    console.log('   - Inline critical above-the-fold CSS');
    console.log('   - Defer non-critical CSS loading');

    console.log('4. 📊 Performance Monitoring');
    console.log('   - Monitor Core Web Vitals in production');
    console.log('   - Set up performance budgets');
    console.log('   - Track performance regressions');

    // Generate performance test script
    await generatePerformanceTestScript();

    console.log('\n✅ Core Web Vitals optimization analysis complete!');
    console.log('📈 Focus on the action items above to improve your Core Web Vitals scores.');

  } catch (error) {
    console.error('❌ Error during optimization analysis:', error.message);
    process.exit(1);
  }
}

async function findFiles(dir, extensions) {
  const files = [];
  const items = await fs.readdir(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = await fs.stat(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && !item.includes('node_modules')) {
      files.push(...await findFiles(fullPath, extensions));
    } else if (extensions.some(ext => item.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files;
}

async function generatePerformanceTestScript() {
  const script = `#!/usr/bin/env node

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

runPerformanceTest();`;

  await fs.writeFile('scripts/test-performance.js', script);
  console.log('📝 Generated performance test script: scripts/test-performance.js');
}

optimizeCoreWebVitals();