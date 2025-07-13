#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

console.log('🖼️ Image SEO Audit for Istanbul Mediterranean');
console.log('===========================================\n');

async function auditImageSEO() {
  const issues = [];
  const recommendations = [];
  let totalImages = 0;
  let optimizedImages = 0;

  try {
    // Find all JSX files
    const findJSXFiles = async (dir) => {
      const files = [];
      const items = await fs.readdir(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = await fs.stat(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && !item.includes('node_modules')) {
          files.push(...await findJSXFiles(fullPath));
        } else if (item.endsWith('.jsx') || item.endsWith('.js')) {
          files.push(fullPath);
        }
      }
      return files;
    };

    const jsxFiles = await findJSXFiles('src');
    console.log(`📄 Found ${jsxFiles.length} JSX/JS files to audit\n`);

    // Audit each file
    for (const file of jsxFiles) {
      const content = await fs.readFile(file, 'utf8');
      const relativePath = path.relative(process.cwd(), file);
      
      // Find img tags
      const imgMatches = content.match(/<img[^>]*>/gi) || [];
      
      for (const imgTag of imgMatches) {
        totalImages++;
        
        // Check for alt attribute
        const altMatch = imgTag.match(/alt\s*=\s*["']([^"']*)["']/i);
        const srcMatch = imgTag.match(/src\s*=\s*["']([^"']*)["']/i);
        const src = srcMatch ? srcMatch[1] : 'unknown';
        
        if (!altMatch || !altMatch[1] || altMatch[1].trim() === '') {
          issues.push(`❌ Missing/empty alt text: ${src} in ${relativePath}`);
        } else {
          const altText = altMatch[1];
          
          // Check alt text quality
          if (altText.length < 10) {
            issues.push(`⚠️ Alt text too short (${altText.length} chars): "${altText}" for ${src} in ${relativePath}`);
          } else if (altText.length > 125) {
            issues.push(`⚠️ Alt text too long (${altText.length} chars): "${altText}" for ${src} in ${relativePath}`);
          } else {
            optimizedImages++;
          }
          
          // Check for keyword relevance
          const hasRelevantKeywords = /turkish|mediterranean|halal|food|restaurant|istanbul|kebab|shawarma|baklava|döner|gyro/i.test(altText);
          if (!hasRelevantKeywords && !src.includes('avatar') && !src.includes('icon')) {
            recommendations.push(`💡 Add relevant keywords to alt text: "${altText}" for ${src} in ${relativePath}`);
          }
        }
        
        // Check for lazy loading
        if (!imgTag.includes('loading=') && !imgTag.includes('OptimizedImage')) {
          recommendations.push(`💡 Add lazy loading: ${src} in ${relativePath}`);
        }
        
        // Check for WebP format
        if (src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.png')) {
          recommendations.push(`💡 Consider WebP format: ${src} in ${relativePath}`);
        }
      }
    }

    // Audit public/menu directory
    console.log('🍽️ Auditing menu images...');
    const menuDir = 'public/menu';
    try {
      const menuItems = await fs.readdir(menuDir, { recursive: true });
      const imageFiles = menuItems.filter(file => 
        file.endsWith('.jpg') || file.endsWith('.jpeg') || 
        file.endsWith('.png') || file.endsWith('.webp')
      );
      
      console.log(`📸 Found ${imageFiles.length} menu images`);
      
      // Check for WebP versions
      const jpgPngFiles = imageFiles.filter(file => 
        file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')
      );
      
      for (const file of jpgPngFiles) {
        const webpVersion = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        if (!imageFiles.includes(webpVersion)) {
          recommendations.push(`💡 Create WebP version of: /menu/${file}`);
        }
      }
    } catch (error) {
      console.log('⚠️ Could not audit menu directory');
    }

    // Generate report
    console.log('\n📊 IMAGE SEO AUDIT REPORT');
    console.log('========================\n');
    
    console.log(`📈 Summary:`);
    console.log(`  • Total images found: ${totalImages}`);
    console.log(`  • Images with good alt text: ${optimizedImages}`);
    console.log(`  • Optimization rate: ${totalImages > 0 ? Math.round((optimizedImages / totalImages) * 100) : 0}%\n`);
    
    if (issues.length > 0) {
      console.log(`🚨 Critical Issues (${issues.length}):`);
      issues.forEach(issue => console.log(`  ${issue}`));
      console.log('');
    }
    
    if (recommendations.length > 0) {
      console.log(`💡 Recommendations (${recommendations.length}):`);
      recommendations.slice(0, 10).forEach(rec => console.log(`  ${rec}`));
      if (recommendations.length > 10) {
        console.log(`  ... and ${recommendations.length - 10} more recommendations`);
      }
      console.log('');
    }
    
    // SEO best practices
    console.log('🎯 Image SEO Best Practices:');
    console.log('  ✅ Alt text: 10-125 characters, descriptive, keyword-rich');
    console.log('  ✅ File names: Use descriptive names (gyro-plate.jpg vs img123.jpg)');
    console.log('  ✅ Format: WebP for modern browsers, with fallbacks');
    console.log('  ✅ Loading: Lazy load below-the-fold images');
    console.log('  ✅ Size: Optimize file sizes for web (target <100KB per image)');
    console.log('  ✅ Responsive: Use srcSet for different screen sizes\n');
    
    // Generate suggested improvements
    console.log('🔧 Quick Fixes:');
    console.log('  1. Add descriptive alt text to all images');
    console.log('  2. Convert existing images to WebP format');
    console.log('  3. Use OptimizedImage component for all new images');
    console.log('  4. Audit menu item images for SEO-friendly file names');
    console.log('  5. Add structured data for menu item images\n');
    
    // Overall score
    const score = totalImages > 0 ? Math.round((optimizedImages / totalImages) * 100) : 100;
    const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F';
    
    console.log(`🏆 Overall Image SEO Score: ${score}% (${grade})`);
    
    if (score < 80) {
      console.log('⚠️ Recommendation: Focus on adding quality alt text to improve SEO ranking');
    } else {
      console.log('✅ Good job! Your images are well-optimized for SEO');
    }

  } catch (error) {
    console.error('❌ Error during audit:', error.message);
    process.exit(1);
  }
}

auditImageSEO();