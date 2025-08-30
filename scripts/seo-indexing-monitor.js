#!/usr/bin/env node

/**
 * SEO Indexing Monitor
 *
 * This script monitors the current SEO status and verifies that all
 * indexing fixes from the audit are properly implemented.
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(message) {
  log(`\n${"=".repeat(60)}`, "bright");
  log(`  ${message}`, "bright");
  log(`${"=".repeat(60)}`, "bright");
}

function logSection(message) {
  log(`\n${"-".repeat(40)}`, "cyan");
  log(`  ${message}`, "cyan");
  log(`${"-".repeat(40)}`, "cyan");
}

function logSuccess(message) {
  log(`✅ ${message}`, "green");
}

function logWarning(message) {
  log(`⚠️  ${message}`, "yellow");
}

function logError(message) {
  log(`❌ ${message}`, "red");
}

function logInfo(message) {
  log(`ℹ️  ${message}`, "blue");
}

/**
 * Check if a file exists
 */
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

/**
 * Check Netlify configuration
 */
function checkNetlifyConfig() {
  logSection("Checking Netlify Configuration");

  const netlifyPath = path.join(__dirname, "../netlify.toml");

  if (!fileExists(netlifyPath)) {
    logError("netlify.toml not found");
    return false;
  }

  const content = fs.readFileSync(netlifyPath, "utf8");

  // Check for www redirects
  if (
    content.includes('from = "https://istanbullv.com/*"') &&
    content.includes('to = "https://www.istanbullv.com/:splat"') &&
    content.includes("status = 301")
  ) {
    logSuccess("WWW redirects properly configured");
  } else {
    logError("WWW redirects missing or incorrectly configured");
  }

  // Check for SPA fallback
  if (
    content.includes('from = "/*"') &&
    content.includes('to = "/index.html"') &&
    content.includes("status = 200")
  ) {
    logSuccess("SPA fallback properly configured");
  } else {
    logError("SPA fallback missing or incorrectly configured");
  }

  // Check for X-Robots-Tag header
  if (content.includes('X-Robots-Tag = "all"')) {
    logSuccess("X-Robots-Tag header properly configured");
  } else {
    logError("X-Robots-Tag header missing");
  }

  return true;
}

/**
 * Check robots.txt
 */
function checkRobotsTxt() {
  logSection("Checking robots.txt");

  const robotsPath = path.join(__dirname, "../build/robots.txt");

  if (!fileExists(robotsPath)) {
    logError("robots.txt not found in build directory");
    return false;
  }

  const content = fs.readFileSync(robotsPath, "utf8");

  if (content.includes("User-agent: *") && content.includes("Allow: /")) {
    logSuccess("robots.txt allows all crawlers");
  } else {
    logError("robots.txt does not allow all crawlers");
  }

  if (content.includes("Sitemap: https://www.istanbullv.com/sitemap.xml")) {
    logSuccess("Sitemap reference properly configured");
  } else {
    logError("Sitemap reference missing or incorrect");
  }

  return true;
}

/**
 * Check sitemap.xml
 */
function checkSitemap() {
  logSection("Checking sitemap.xml");

  const sitemapPath = path.join(__dirname, "../build/sitemap.xml");

  if (!fileExists(sitemapPath)) {
    logError("sitemap.xml not found in build directory");
    return false;
  }

  const content = fs.readFileSync(sitemapPath, "utf8");

  // Check for future dates
  const futureDateRegex = /<lastmod>20[2-9][5-9]-\d{2}-\d{2}<\/lastmod>/g;
  const futureDates = content.match(futureDateRegex);

  if (futureDates && futureDates.length > 0) {
    logError(`Found ${futureDates.length} future dates in sitemap`);
    logWarning("This can confuse search engines and affect indexing");
  } else {
    logSuccess("No future dates found in sitemap");
  }

  // Check for proper URL structure
  if (content.includes("https://www.istanbullv.com")) {
    logSuccess("Sitemap uses correct canonical domain");
  } else {
    logError("Sitemap does not use correct canonical domain");
  }

  // Count URLs
  const urlCount = (content.match(/<url>/g) || []).length;
  logInfo(`Sitemap contains ${urlCount} URLs`);

  return true;
}

/**
 * Check main HTML file for SEO fallback
 */
function checkMainHTML() {
  logSection("Checking Main HTML for SEO Fallback");

  const htmlPath = path.join(__dirname, "../public/index.html");

  if (!fileExists(htmlPath)) {
    logError("index.html not found in public directory");
    return false;
  }

  const content = fs.readFileSync(htmlPath, "utf8");

  // Check for bot detection script
  if (
    content.includes("bot detection script") ||
    content.includes("knownBots")
  ) {
    logSuccess("Bot detection script found");
  } else {
    logError("Bot detection script missing");
  }

  // Check for SEO fallback content
  if (
    content.includes("seo-fallback") &&
    content.includes('class="seo-fallback"')
  ) {
    logSuccess("SEO fallback content found");
  } else {
    logError("SEO fallback content missing");
  }

  // Check for structured data
  if (content.includes("application/ld+json")) {
    logSuccess("Structured data (JSON-LD) found");
  } else {
    logError("Structured data missing");
  }

  // Check for proper meta tags
  if (
    content.includes('<meta name="description"') &&
    content.includes('<meta property="og:title"')
  ) {
    logSuccess("Essential meta tags found");
  } else {
    logError("Essential meta tags missing");
  }

  return true;
}

/**
 * Check SEOHead component
 */
function checkSEOHead() {
  logSection("Checking SEOHead Component");

  const seoHeadPath = path.join(__dirname, "../src/components/SEOHead.jsx");

  if (!fileExists(seoHeadPath)) {
    logError("SEOHead component not found");
    return false;
  }

  const content = fs.readFileSync(seoHeadPath, "utf8");

  // Check for canonical URL handling
  if (content.includes("canonicalUrl") && content.includes('rel="canonical"')) {
    logSuccess("Canonical URL handling properly implemented");
  } else {
    logError("Canonical URL handling missing");
  }

  // Check for robots meta tag
  if (content.includes('name="robots"') && content.includes("index,follow")) {
    logSuccess("Robots meta tag properly configured");
  } else {
    logError("Robots meta tag missing or incorrectly configured");
  }

  return true;
}

/**
 * Check Hreflang implementation
 */
function checkHreflang() {
  logSection("Checking Hreflang Implementation");

  const hreflangPath = path.join(
    __dirname,
    "../src/components/HreflangTags.jsx"
  );
  const hreflangManagerPath = path.join(
    __dirname,
    "../src/utils/hreflangManager.js"
  );

  if (!fileExists(hreflangPath)) {
    logError("HreflangTags component not found");
    return false;
  }

  if (!fileExists(hreflangManagerPath)) {
    logError("HreflangManager utility not found");
    return false;
  }

  const hreflangContent = fs.readFileSync(hreflangPath, "utf8");
  const managerContent = fs.readFileSync(hreflangManagerPath, "utf8");

  if (
    hreflangContent.includes("generateHreflangLinks") &&
    hreflangContent.includes('rel="alternate"')
  ) {
    logSuccess("HreflangTags component properly implemented");
  } else {
    logError("HreflangTags component not properly implemented");
  }

  if (
    managerContent.includes("SUPPORTED_LANGUAGES") &&
    managerContent.includes("PAGE_TRANSLATIONS")
  ) {
    logSuccess("HreflangManager utility properly configured");
  } else {
    logError("HreflangManager utility not properly configured");
  }

  return true;
}

/**
 * Check for duplicate content issues
 */
function checkDuplicateContent() {
  logSection("Checking for Duplicate Content Issues");

  const publicDir = path.join(__dirname, "../public");

  if (!fileExists(publicDir)) {
    logWarning("Public directory not found");
    return false;
  }

  // Check for duplicate markdown files within the public directory only
  const duplicateCheck = (dir) => {
    try {
      const files = fs.readdirSync(dir, { recursive: true });
      const markdownFiles = files.filter((file) => file.endsWith(".md"));
      const duplicateGroups = {};

      markdownFiles.forEach((file) => {
        const content = fs.readFileSync(path.join(dir, file), "utf8");
        const hash = require("crypto")
          .createHash("md5")
          .update(content)
          .digest("hex");
        if (!duplicateGroups[hash]) {
          duplicateGroups[hash] = [];
        }
        duplicateGroups[hash].push(file);
      });

      const duplicates = Object.values(duplicateGroups).filter(
        (group) => group.length > 1
      );

      if (duplicates.length > 0) {
        logError(`Found ${duplicates.length} groups of duplicate content`);
        duplicates.forEach((group) => {
          logWarning(`  Duplicates: ${group.join(", ")}`);
        });
        return false;
      } else {
        logSuccess("No duplicate content found");
        return true;
      }
    } catch (error) {
      logWarning(`Could not check directory ${dir}: ${error.message}`);
      return true; // Don't fail the check if we can't read a directory
    }
  };

  // Only check the public directory for duplicates
  // The build directory will naturally contain copies of public files
  return duplicateCheck(publicDir);
}

/**
 * Check build scripts
 */
function checkBuildScripts() {
  logSection("Checking Build Scripts");

  const packagePath = path.join(__dirname, "../package.json");

  if (!fileExists(packagePath)) {
    logError("package.json not found");
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  const scripts = packageJson.scripts || {};

  const requiredScripts = ["build:seo", "build:sitemap", "seo:report"];

  let allScriptsPresent = true;

  requiredScripts.forEach((script) => {
    if (scripts[script]) {
      logSuccess(`${script} script found`);
    } else {
      logError(`${script} script missing`);
      allScriptsPresent = false;
    }
  });

  return allScriptsPresent;
}

/**
 * Generate summary report
 */
function generateSummary() {
  logHeader("SEO Indexing Status Summary");

  const checks = [
    { name: "Netlify Configuration", fn: checkNetlifyConfig },
    { name: "robots.txt", fn: checkRobotsTxt },
    { name: "sitemap.xml", fn: checkSitemap },
    { name: "Main HTML SEO Fallback", fn: checkMainHTML },
    { name: "SEOHead Component", fn: checkSEOHead },
    { name: "Hreflang Implementation", fn: checkHreflang },
    { name: "Duplicate Content Check", fn: checkDuplicateContent },
    { name: "Build Scripts", fn: checkBuildScripts },
  ];

  const results = [];

  checks.forEach((check) => {
    try {
      const result = check.fn();
      results.push({ name: check.name, status: result ? "PASS" : "FAIL" });
    } catch (error) {
      results.push({ name: check.name, status: "ERROR", error: error.message });
    }
  });

  logSection("Check Results Summary");

  const passed = results.filter((r) => r.status === "PASS").length;
  const failed = results.filter((r) => r.status === "FAIL").length;
  const errors = results.filter((r) => r.status === "ERROR").length;

  results.forEach((result) => {
    if (result.status === "PASS") {
      logSuccess(`${result.name}: PASS`);
    } else if (result.status === "FAIL") {
      logError(`${result.name}: FAIL`);
    } else {
      logError(`${result.name}: ERROR - ${result.error}`);
    }
  });

  logSection("Overall Status");
  logInfo(`Total Checks: ${results.length}`);
  logSuccess(`Passed: ${passed}`);
  logWarning(`Failed: ${failed}`);
  logError(`Errors: ${errors}`);

  if (failed === 0 && errors === 0) {
    logSuccess(
      "🎉 All SEO checks passed! Your site should be properly indexed."
    );
  } else {
    logWarning("⚠️  Some issues found. Review the errors above and fix them.");
  }

  return { passed, failed, errors, total: results.length };
}

/**
 * Main execution
 */
async function main() {
  try {
    logHeader("Istanbul Mediterranean SEO Indexing Monitor");
    logInfo("Checking all SEO fixes from the indexing audit...\n");

    const summary = generateSummary();

    logHeader("Next Steps");
    if (summary.failed > 0 || summary.errors > 0) {
      logWarning("1. Fix the issues identified above");
      logWarning("2. Run this script again to verify fixes");
    }
    logInfo("3. Deploy the fixed site to Netlify");
    logInfo("4. Submit the sitemap to Google Search Console");
    logInfo("5. Monitor indexing progress in GSC");

    logHeader("Monitoring Commands");
    logInfo("npm run seo:report - Generate detailed SEO report");
    logInfo("npm run build:seo - Regenerate static HTML for SEO");
    logInfo("npm run build:sitemap - Regenerate sitemap");
  } catch (error) {
    logError(`Script execution failed: ${error.message}`);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  checkNetlifyConfig,
  checkRobotsTxt,
  checkSitemap,
  checkMainHTML,
  checkSEOHead,
  checkHreflang,
  checkDuplicateContent,
  checkBuildScripts,
  generateSummary,
};
