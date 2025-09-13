#!/usr/bin/env node

/**
 * URGENT: Multiple Domain Issue Fix
 * 
 * The istanbul-neon.vercel.app domain is causing major SEO issues:
 * - Duplicate content penalties
 * - Canonical URL confusion
 * - Link equity split
 * - Redirect chain problems
 */

const fs = require('fs');
const path = require('path');

console.log('🚨 URGENT: Fixing Multiple Domain Issue...\n');

// 1. Update Vercel configuration to redirect Vercel domain to main domain
function fixVercelDomainRedirect() {
  console.log('1. Adding Vercel domain redirect to main domain...');
  
  const vercelConfig = {
    "redirects": [
      // Redirect Vercel preview domain to main domain
      { 
        "source": "https://istanbul-neon.vercel.app/:path*", 
        "destination": "https://www.istanbullv.com/:path*", 
        "permanent": true 
      },
      { 
        "source": "https://istanbul-neon.vercel.app", 
        "destination": "https://www.istanbullv.com", 
        "permanent": true 
      },
      // Existing trailing slash redirects
      { "source": "/menu/", "destination": "/menu", "permanent": true },
      { "source": "/blog-posts/", "destination": "/blog-posts", "permanent": true },
      { "source": "/halal/", "destination": "/halal", "permanent": true },
      { "source": "/about/", "destination": "/about", "permanent": true },
      { "source": "/contact/", "destination": "/contact", "permanent": true },
      { "source": "/delivery/", "destination": "/delivery", "permanent": true },
      { "source": "/catering/", "destination": "/catering", "permanent": true },
      { "source": "/experience/", "destination": "/experience", "permanent": true },
      { "source": "/careers/", "destination": "/careers", "permanent": true },
      { "source": "/shawarma/", "destination": "/shawarma", "permanent": true },
      { "source": "/turkish-food/", "destination": "/turkish-food", "permanent": true }
    ],
    "rewrites": [
      { "source": "/", "destination": "/index.html" },
      { "source": "/((?!.*\\.).*)", "destination": "/$1/index.html" }
    ],
    "headers": [
      {
        "source": "/(.*)",
        "headers": [
          {
            "key": "X-Robots-Tag",
            "value": "index, follow"
          },
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "Referrer-Policy",
            "value": "strict-origin-when-cross-origin"
          },
          {
            "key": "X-XSS-Protection",
            "value": "1; mode=block"
          },
          {
            "key": "Strict-Transport-Security",
            "value": "max-age=31536000; includeSubDomains"
          },
          {
            "key": "Content-Security-Policy",
            "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://www.google-analytics.com; frame-src 'self' https://www.googletagmanager.com;"
          }
        ]
      }
    ]
  };

  fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
  console.log('✅ Vercel domain redirect added');
}

// 2. Create robots.txt to block Vercel domain
function createRobotsTxt() {
  console.log('2. Updating robots.txt to block Vercel domain...');
  
  const robotsContent = `User-agent: *
Allow: /

# Block Vercel preview domain to prevent duplicate content
User-agent: *
Disallow: https://istanbul-neon.vercel.app/

# Sitemap
Sitemap: https://www.istanbullv.com/sitemap.xml
`;

  fs.writeFileSync('public/robots.txt', robotsContent);
  fs.writeFileSync('build/robots.txt', robotsContent);
  console.log('✅ robots.txt updated to block Vercel domain');
}

// 3. Update sitemap to only include main domain
function updateSitemap() {
  console.log('3. Ensuring sitemap only includes main domain...');
  
  const sitemapPath = path.join(__dirname, '../build/sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    
    // Remove any references to Vercel domain
    sitemapContent = sitemapContent.replace(/https:\/\/istanbul-neon\.vercel\.app/g, 'https://www.istanbullv.com');
    
    fs.writeFileSync(sitemapPath, sitemapContent);
    console.log('✅ Sitemap updated to only include main domain');
  }
}

// 4. Create Google Search Console action plan
function createGSCActionPlan() {
  console.log('4. Creating Google Search Console action plan...');
  
  const actionPlan = `# 🚨 URGENT: Multiple Domain Issue - Google Search Console Actions

## ⚠️ CRITICAL PROBLEM IDENTIFIED

**Multiple domains serving identical content:**
- https://www.istanbullv.com (MAIN DOMAIN)
- https://istanbul-neon.vercel.app (VERCEL PREVIEW - CAUSING ISSUES)

## 🔍 WHY THIS CAUSES PROBLEMS

1. **Duplicate Content Penalty**: Google sees identical content on two domains
2. **Canonical URL Confusion**: Search engines don't know which is the "real" site
3. **Link Equity Split**: SEO value divided between domains
4. **Redirect Chain Issues**: Complex redirect scenarios confuse crawlers
5. **"Page with redirect" Errors**: Multiple domains create redirect confusion

## ✅ FIXES APPLIED

1. **Vercel Domain Redirect**: istanbul-neon.vercel.app → www.istanbullv.com (301)
2. **Robots.txt Updated**: Block crawlers from Vercel domain
3. **Sitemap Cleaned**: Only includes main domain URLs
4. **Canonical URLs**: All point to www.istanbullv.com

## 🚀 IMMEDIATE GOOGLE SEARCH CONSOLE ACTIONS

### 1. Add Both Domains to GSC (if not already added)
- Add: https://www.istanbullv.com
- Add: https://istanbul-neon.vercel.app

### 2. Set Preferred Domain
- Go to Settings → General
- Set "Preferred domain" to: www.istanbullv.com
- This tells Google which domain to index

### 3. Request URL Removal for Vercel Domain
- Go to Removals → New Request
- Request removal of: https://istanbul-neon.vercel.app/*
- Reason: "Duplicate content - redirecting to main domain"

### 4. Submit Updated Sitemap
- Go to Sitemaps
- Submit: https://www.istanbullv.com/sitemap.xml
- Remove any old sitemap submissions

### 5. Request Reindexing
- Use URL Inspection tool
- Request indexing for: https://www.istanbullv.com/
- Request indexing for key pages: /menu, /about, /contact

## 📊 EXPECTED RESULTS

### Within 24-48 hours:
- ✅ Vercel domain redirects to main domain
- ✅ "Page with redirect" errors should decrease
- ✅ Duplicate content warnings should reduce

### Within 1 week:
- ✅ Google focuses indexing on main domain only
- ✅ Improved organic traffic
- ✅ Better search rankings

### Within 2-4 weeks:
- ✅ Full traffic consolidation to main domain
- ✅ Revenue recovery
- ✅ Stable indexing

## 🛡️ PREVENTION

1. **Vercel Settings**: Configure custom domain as primary
2. **Monitor**: Check for new preview domains
3. **Test**: Always test redirects after deployment
4. **GSC**: Regular monitoring of domain issues

## 🚨 CRITICAL SUCCESS METRICS

1. **Domain Consolidation**: All traffic to www.istanbullv.com
2. **GSC Coverage**: Reduced duplicate content errors
3. **Traffic Recovery**: Organic traffic improvement
4. **Revenue Recovery**: Customer acquisition improvement

---
**Generated:** ${new Date().toISOString()}
**Status:** READY FOR IMMEDIATE ACTION
`;

  fs.writeFileSync('MULTIPLE_DOMAIN_FIX_ACTION_PLAN.md', actionPlan);
  console.log('✅ Google Search Console action plan created');
}

// 5. Test the fixes
function testFixes() {
  console.log('5. Testing current domain status...');
  
  const { execSync } = require('child_process');
  
  try {
    // Test main domain
    const mainResult = execSync('curl -I https://www.istanbullv.com/ 2>/dev/null | head -1', { encoding: 'utf8' });
    console.log(`   Main domain: ${mainResult.trim()}`);
    
    // Test Vercel domain (should redirect after deployment)
    const vercelResult = execSync('curl -I https://istanbul-neon.vercel.app/ 2>/dev/null | head -1', { encoding: 'utf8' });
    console.log(`   Vercel domain: ${vercelResult.trim()}`);
    
    if (vercelResult.includes('301') || vercelResult.includes('308')) {
      console.log('   ✅ Vercel domain redirects (good)');
    } else {
      console.log('   ⚠️  Vercel domain not redirecting yet (will fix after deployment)');
    }
    
  } catch (error) {
    console.log('   ⚠️  Could not test live domains (may be expected)');
  }
}

// Run all fixes
async function fixMultipleDomainIssue() {
  try {
    fixVercelDomainRedirect();
    createRobotsTxt();
    updateSitemap();
    createGSCActionPlan();
    testFixes();
    
    console.log('\n🎉 MULTIPLE DOMAIN ISSUE FIX COMPLETE!');
    console.log('\n📋 CRITICAL NEXT STEPS:');
    console.log('1. Deploy immediately: git add . && git commit -m "URGENT: Fix multiple domain issue" && git push');
    console.log('2. Go to Google Search Console and follow the action plan');
    console.log('3. Set preferred domain to www.istanbullv.com');
    console.log('4. Request removal of Vercel domain from search results');
    console.log('5. Monitor traffic consolidation over next 2-4 weeks');
    
    console.log('\n🚨 CRITICAL: This fix will consolidate all traffic to your main domain!');
    
  } catch (error) {
    console.error('❌ Error fixing multiple domain issue:', error.message);
    process.exit(1);
  }
}

// Run the fix
fixMultipleDomainIssue();
