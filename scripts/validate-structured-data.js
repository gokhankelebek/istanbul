#!/usr/bin/env node

/**
 * Structured Data Validation Script
 * 
 * This script extracts and validates structured data (JSON-LD) from your website pages.
 * It helps ensure your schema markup is valid and optimized for search engines.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const puppeteer = require('puppeteer');
const chalk = require('chalk');
// Handle ESM vs CommonJS differences in chalk v5+
const chalkColors = {
  red: (text) => typeof chalk.red === 'function' ? chalk.red(text) : (chalk.default ? chalk.default.red(text) : text),
  green: (text) => typeof chalk.green === 'function' ? chalk.green(text) : (chalk.default ? chalk.default.green(text) : text),
  yellow: (text) => typeof chalk.yellow === 'function' ? chalk.yellow(text) : (chalk.default ? chalk.default.yellow(text) : text),
  blue: (text) => typeof chalk.blue === 'function' ? chalk.blue(text) : (chalk.default ? chalk.default.blue(text) : text),
  gray: (text) => typeof chalk.gray === 'function' ? chalk.gray(text) : (chalk.default ? chalk.default.gray(text) : text)
};

// Configuration
const CONFIG = {
  // URL of your development server
  baseUrl: 'http://localhost:3000',
  
  // Routes to test
  routes: [
    '/',
    '/menu',
    '/turkishfood',
    '/halal',
    '/about',
    '/contact',
    '/delivery',
    '/faq',
    '/catering',
    '/blog'
  ],
  
  // Output directory for reports
  outputDir: path.join(__dirname, '../reports'),
  
  // Whether to save JSON-LD to files
  saveJsonLd: true,
  
  // Whether to validate with Google's Structured Data Testing Tool API
  validateWithGoogle: false,
  
  // Google API key (if validateWithGoogle is true)
  googleApiKey: process.env.GOOGLE_API_KEY || '',
  
  // Expected schema types per route
  expectedSchemas: {
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
  },
  
  // Required properties for each schema type
  requiredProperties: {
    'Restaurant': ['name', 'image', 'address', 'servesCuisine', 'priceRange', 'telephone'],
    'LocalBusiness': ['name', 'address', 'telephone', 'openingHours'],
    'FAQPage': ['mainEntity'],
    'Menu': ['hasMenuSection'],
    'Article': ['headline', 'author', 'datePublished', 'image'],
    'Service': ['name', 'description', 'provider'],
    'ItemList': ['itemListElement'],
    'BreadcrumbList': ['itemListElement']
  }
};

// Create output directory if it doesn't exist
if (!fs.existsSync(CONFIG.outputDir)) {
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });
}

/**
 * Extract JSON-LD from a page
 * @param {string} url - URL to extract JSON-LD from
 * @returns {Promise<Array>} - Array of JSON-LD objects
 */
async function extractJsonLd(url) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set viewport size
    await page.setViewport({
      width: 1280,
      height: 800
    });
    
    // Navigate to URL
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Extract JSON-LD scripts
    const jsonLdData = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      return scripts.map(script => {
        try {
          return JSON.parse(script.textContent);
        } catch (e) {
          return { error: e.message, content: script.textContent };
        }
      });
    });
    
    return jsonLdData;
  } catch (error) {
    console.error(`Error extracting JSON-LD from ${url}:`, error);
    return [];
  } finally {
    await browser.close();
  }
}

/**
 * Validate JSON-LD data
 * @param {Object} jsonLd - JSON-LD object to validate
 * @param {string} route - Current route being validated
 * @returns {Object} - Validation results
 */
function validateJsonLd(jsonLd, route) {
  const results = {
    valid: true,
    errors: [],
    warnings: [],
    info: [],
    schemaType: null
  };
  
  // Check if jsonLd is an object
  if (!jsonLd || typeof jsonLd !== 'object') {
    results.valid = false;
    results.errors.push('JSON-LD is not a valid object');
    return results;
  }
  
  // Check if jsonLd has @context
  if (!jsonLd['@context']) {
    results.valid = false;
    results.errors.push('Missing @context property');
  } else if (jsonLd['@context'] !== 'https://schema.org' && 
             !jsonLd['@context'].includes('schema.org')) {
    results.valid = false;
    results.errors.push('@context does not reference schema.org');
  }
  
  // Check if jsonLd has @type
  if (!jsonLd['@type']) {
    results.valid = false;
    results.errors.push('Missing @type property');
    return results;
  }
  
  // Store the schema type
  const type = jsonLd['@type'];
  results.schemaType = type;
  
  // Check if this schema type is expected for this route
  if (route && CONFIG.expectedSchemas[route]) {
    if (!CONFIG.expectedSchemas[route].includes(type)) {
      results.warnings.push(`Schema type '${type}' is not expected for route '${route}'. Expected types: ${CONFIG.expectedSchemas[route].join(', ')}`);
    } else {
      results.info.push(`Schema type '${type}' is correctly implemented for route '${route}'`);
    }
  }
  
  // Check for required properties based on schema type
  if (CONFIG.requiredProperties[type]) {
    for (const prop of CONFIG.requiredProperties[type]) {
      if (!jsonLd[prop]) {
        results.warnings.push(`${type}: Missing required property '${prop}'`);
      }
    }
  }
  
  // Additional validation based on schema type
  switch (type) {
    case 'Restaurant':
      // Check for recommended restaurant properties
      if (!jsonLd.priceRange) {
        results.warnings.push('Restaurant: Missing priceRange property (recommended by Google)');
      }
      if (!jsonLd.aggregateRating) {
        results.info.push('Restaurant: Adding aggregateRating can improve rich results display');
      }
      if (!jsonLd.review && !jsonLd.reviews) {
        results.info.push('Restaurant: Adding reviews can improve rich results display');
      }
      break;
      
    case 'LocalBusiness':
      // Check for geo coordinates
      if (!jsonLd.geo) {
        results.info.push('LocalBusiness: Adding geo coordinates can improve map display in search results');
      }
      // Check for opening hours
      if (!jsonLd.openingHoursSpecification) {
        results.warnings.push('LocalBusiness: Missing openingHoursSpecification (important for Google My Business)');
      }
      break;
      
    case 'Product':
      // Check for product offers
      if (jsonLd.offers) {
        if (!jsonLd.offers.price) {
          results.warnings.push('Product: Missing price in offers');
        }
        if (!jsonLd.offers.priceCurrency) {
          results.warnings.push('Product: Missing priceCurrency in offers');
        }
      }
      break;
      
    case 'FAQPage':
      // Check FAQ structure
      if (jsonLd.mainEntity) {
        if (!Array.isArray(jsonLd.mainEntity)) {
          results.warnings.push('FAQPage: mainEntity should be an array of Question items');
        } else {
          // Check each question
          jsonLd.mainEntity.forEach((item, index) => {
            if (!item['@type'] || item['@type'] !== 'Question') {
              results.warnings.push(`FAQPage: Item ${index} in mainEntity is not of type Question`);
            }
            if (!item.name) {
              results.warnings.push(`FAQPage: Question ${index} is missing name (question text)`);
            }
            if (!item.acceptedAnswer) {
              results.warnings.push(`FAQPage: Question ${index} is missing acceptedAnswer`);
            } else if (!item.acceptedAnswer['@type'] || item.acceptedAnswer['@type'] !== 'Answer') {
              results.warnings.push(`FAQPage: Answer for question ${index} is not of type Answer`);
            } else if (!item.acceptedAnswer.text) {
              results.warnings.push(`FAQPage: Answer for question ${index} is missing text`);
            }
          });
        }
      }
      break;
      
    case 'Article':
    case 'BlogPosting':
      if (!jsonLd.headline) {
        results.warnings.push(`${type}: Missing headline property`);
      }
      if (!jsonLd.author) {
        results.warnings.push(`${type}: Missing author property`);
      } else if (typeof jsonLd.author === 'object') {
        if (!jsonLd.author['@type']) {
          results.warnings.push(`${type}: Author is missing @type property`);
        }
        if (!jsonLd.author.name) {
          results.warnings.push(`${type}: Author is missing name property`);
        }
      }
      if (!jsonLd.datePublished) {
        results.warnings.push(`${type}: Missing datePublished property`);
      }
      if (!jsonLd.image) {
        results.warnings.push(`${type}: Missing image property`);
      }
      break;
      
    case 'BreadcrumbList':
      // Check breadcrumb structure
      if (jsonLd.itemListElement) {
        if (!Array.isArray(jsonLd.itemListElement)) {
          results.warnings.push('BreadcrumbList: itemListElement should be an array');
        } else {
          // Check each breadcrumb item
          jsonLd.itemListElement.forEach((item, index) => {
            if (!item['@type'] || item['@type'] !== 'ListItem') {
              results.warnings.push(`BreadcrumbList: Item ${index} is not of type ListItem`);
            }
            if (!item.position) {
              results.warnings.push(`BreadcrumbList: Item ${index} is missing position`);
            }
            if (!item.name && !item.item?.name) {
              results.warnings.push(`BreadcrumbList: Item ${index} is missing name`);
            }
            if (!item.item?.['@id'] && !item.item?.url) {
              results.warnings.push(`BreadcrumbList: Item ${index} is missing URL`);
            }
          });
        }
      }
      break;
      
    default:
      // No specific validation for this type
      results.info.push(`No specific validation rules for schema type '${type}'`);
      break;
  }
  
  // Check if there are any errors
  if (results.errors.length > 0) {
    results.valid = false;
  }
  
  return results;
}

/**
 * Validate JSON-LD with Google's Structured Data Testing Tool API
 * @param {Object} jsonLd - JSON-LD object to validate
 * @returns {Promise<Object>} - Validation results
 */
async function validateWithGoogle(jsonLd) {
  // This would normally use Google's API, but we'll simulate it
  console.log(chalkColors.yellow('Note: Google Structured Data Testing Tool API simulation is being used.'));
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = {
        valid: true,
        errors: [],
        warnings: []
      };
      
      // Simulate some validation checks
      if (!jsonLd['@context'] || !jsonLd['@type']) {
        results.valid = false;
        results.errors.push('Missing required properties: @context and/or @type');
      }
      
      // Add some random warnings for demonstration
      const possibleWarnings = [
        'Consider adding more specific properties for better rich results',
        'Image URL should use HTTPS for better security',
        'Consider adding aggregateRating for better visibility'
      ];
      
      if (Math.random() > 0.5) {
        results.warnings.push(possibleWarnings[Math.floor(Math.random() * possibleWarnings.length)]);
      }
      
      resolve(results);
    }, 1000);
  });
}

/**
 * Save JSON-LD to file
 * @param {string} route - Route the JSON-LD was extracted from
 * @param {Array} jsonLdArray - Array of JSON-LD objects
 */
function saveJsonLdToFile(route, jsonLdArray) {
  const routeName = route === '/' ? 'home' : route.replace(/\//g, '-').replace(/^-/, '');
  const filePath = path.join(CONFIG.outputDir, `jsonld-${routeName}.json`);
  
  fs.writeFileSync(filePath, JSON.stringify(jsonLdArray, null, 2));
  console.log(chalkColors.green(`Saved JSON-LD for ${route} to ${filePath}`));
}

/**
 * Generate report for a route
 * @param {string} route - Route to generate report for
 * @param {Array} jsonLdArray - Array of JSON-LD objects
 * @param {Array} validationResults - Array of validation results
 */
function generateReport(route, jsonLdArray, validationResults) {
  const routeName = route === '/' ? 'home' : route.replace(/\//g, '-').replace(/^-/, '');
  const filePath = path.join(CONFIG.outputDir, `report-${routeName}.md`);
  
  let report = `# Structured Data Report for ${route}\n\n`;
  report += `Generated on: ${new Date().toLocaleString()}\n\n`;
  
  // Add expected schema types for this route
  if (CONFIG.expectedSchemas[route]) {
    report += `## Expected Schema Types\n\n`;
    report += `The following schema types are expected for this route:\n\n`;
    CONFIG.expectedSchemas[route].forEach(type => {
      report += `- ${type}\n`;
    });
    report += '\n';
  }
  
  // Collect all schema types found
  const schemaTypesFound = new Set();
  validationResults.forEach(result => {
    if (result.schemaType) {
      schemaTypesFound.add(result.schemaType);
    }
  });
  
  // Check for missing schema types
  if (CONFIG.expectedSchemas[route]) {
    const missingTypes = CONFIG.expectedSchemas[route].filter(type => 
      !Array.from(schemaTypesFound).includes(type)
    );
    
    if (missingTypes.length > 0) {
      report += `## Missing Schema Types\n\n`;
      report += `⚠️ The following expected schema types were not found:\n\n`;
      missingTypes.forEach(type => {
        report += `- ${type}\n`;
      });
      report += '\n';
    }
  }
  
  if (jsonLdArray.length === 0) {
    report += '## No JSON-LD found on this page\n\n';
    report += 'Consider adding structured data to improve SEO.\n\n';
  } else {
    report += `## Found ${jsonLdArray.length} JSON-LD block(s)\n\n`;
    
    jsonLdArray.forEach((jsonLd, index) => {
      report += `### JSON-LD Block ${index + 1}\n\n`;
      
      if (jsonLd.error) {
        report += `**ERROR**: Could not parse JSON-LD: ${jsonLd.error}\n\n`;
        report += '```\n' + jsonLd.content + '\n```\n\n';
        return;
      }
      
      const type = jsonLd['@type'] || 'Unknown';
      report += `**Type**: ${type}\n\n`;
      
      const validation = validationResults[index];
      
      if (validation.valid) {
        report += '**Validation**: ✅ Valid\n\n';
      } else {
        report += '**Validation**: ❌ Invalid\n\n';
      }
      
      if (validation.errors.length > 0) {
        report += '**Errors**:\n\n';
        validation.errors.forEach(error => {
          report += `- ❌ ${error}\n`;
        });
        report += '\n';
      }
      
      if (validation.warnings.length > 0) {
        report += '**Warnings**:\n\n';
        validation.warnings.forEach(warning => {
          report += `- ⚠️ ${warning}\n`;
        });
        report += '\n';
      }
      
      if (validation.info && validation.info.length > 0) {
        report += '**Recommendations**:\n\n';
        validation.info.forEach(info => {
          report += `- ℹ️ ${info}\n`;
        });
        report += '\n';
      }
      
      report += '**JSON-LD Content**:\n\n';
      report += '```json\n' + JSON.stringify(jsonLd, null, 2) + '\n```\n\n';
    });
    
    // Add summary section
    report += '## Summary\n\n';
    
    const totalErrors = validationResults.reduce((count, result) => 
      count + (result.errors ? result.errors.length : 0), 0);
    const totalWarnings = validationResults.reduce((count, result) => 
      count + (result.warnings ? result.warnings.length : 0), 0);
    
    report += `- Total JSON-LD blocks: ${jsonLdArray.length}\n`;
    report += `- Schema types found: ${Array.from(schemaTypesFound).join(', ')}\n`;
    report += `- Total errors: ${totalErrors}\n`;
    report += `- Total warnings: ${totalWarnings}\n`;
    
    if (totalErrors === 0 && totalWarnings === 0) {
      report += '\n✅ **All structured data is valid!**\n';
    } else if (totalErrors === 0) {
      report += '\n⚠️ **Structured data is valid but has warnings to address.**\n';
    } else {
      report += '\n❌ **Structured data has errors that need to be fixed.**\n';
    }
  }
  
  fs.writeFileSync(filePath, report);
  console.log(chalkColors.green(`Generated report for ${route} at ${filePath}`));
}

/**
 * Main function
 */
async function main() {
  console.log(chalkColors.blue('Starting Structured Data Validation...'));
  
  // Check if development server is running
  try {
    execSync('curl -s http://localhost:3000 > /dev/null');
    console.log(chalkColors.green('Development server is running.'));
  } catch (error) {
    console.log(chalkColors.yellow('Development server is not running. Starting it...'));
    
    // Start development server in background
    const serverProcess = require('child_process').spawn('npm', ['start'], {
      detached: true,
      stdio: 'ignore'
    });
    
    serverProcess.unref();
    
    // Wait for server to start
    console.log(chalkColors.yellow('Waiting for development server to start...'));
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
  
  // Process each route
  for (const route of CONFIG.routes) {
    const url = `${CONFIG.baseUrl}${route}`;
    console.log(chalkColors.blue(`Processing ${url}...`));
    
    // Extract JSON-LD
    const jsonLdArray = await extractJsonLd(url);
    console.log(chalkColors.green(`Found ${jsonLdArray.length} JSON-LD block(s) on ${route}`));
    
    // Validate JSON-LD
    const validationResults = [];
    let schemaTypesFound = new Set();
    let expectedSchemaTypes = CONFIG.expectedSchemas[route] || [];
    let missingSchemaTypes = new Set(expectedSchemaTypes);
    
    for (const jsonLd of jsonLdArray) {
      if (jsonLd.error) {
        validationResults.push({
          valid: false,
          errors: [`Parse error: ${jsonLd.error}`],
          warnings: [],
          info: [],
          schemaType: null
        });
        continue;
      }
      
      // Pass the route to validateJsonLd for route-specific validation
      const validation = validateJsonLd(jsonLd, route);
      
      // Track schema types for reporting
      if (validation.schemaType) {
        schemaTypesFound.add(validation.schemaType);
        missingSchemaTypes.delete(validation.schemaType);
      }
      
      if (CONFIG.validateWithGoogle) {
        const googleValidation = await validateWithGoogle(jsonLd);
        validation.errors = [...validation.errors, ...googleValidation.errors];
        validation.warnings = [...validation.warnings, ...googleValidation.warnings];
        validation.valid = validation.valid && googleValidation.valid;
      }
      
      validationResults.push(validation);
    }
    
    // Save JSON-LD to file
    if (CONFIG.saveJsonLd && jsonLdArray.length > 0) {
      saveJsonLdToFile(route, jsonLdArray);
    }
    
    // Report missing schema types in console
    if (missingSchemaTypes.size > 0) {
      console.log(chalkColors.yellow(`Warning: Missing expected schema types for ${route}: ${Array.from(missingSchemaTypes).join(', ')}`));
    }
    
    // Generate report
    generateReport(route, jsonLdArray, validationResults);
  }
  
  // Generate summary report
  generateSummaryReport(CONFIG.routes);
  
  console.log(chalkColors.blue('Structured Data Validation complete!'));
  console.log(chalkColors.green(`Reports saved to ${CONFIG.outputDir}`));
}

/**
 * Generate a summary report for all routes
 * @param {Array} routes - All routes that were validated
 */
function generateSummaryReport(routes) {
  const filePath = path.join(CONFIG.outputDir, 'summary-report.md');
  
  let report = `# Structured Data Validation Summary Report\n\n`;
  report += `Generated on: ${new Date().toLocaleString()}\n\n`;
  report += `## Routes Validated\n\n`;
  
  report += `| Route | Expected Schema Types | Status |\n`;
  report += `| ----- | -------------------- | ------ |\n`;
  
  routes.forEach(route => {
    const routeName = route === '/' ? 'home' : route.replace(/\//g, '-').replace(/^-/, '');
    const reportPath = `report-${routeName}.md`;
    const expectedTypes = CONFIG.expectedSchemas[route] ? CONFIG.expectedSchemas[route].join(', ') : 'None specified';
    
    // Check if report exists
    const fullReportPath = path.join(CONFIG.outputDir, reportPath);
    if (fs.existsSync(fullReportPath)) {
      const reportContent = fs.readFileSync(fullReportPath, 'utf8');
      
      // Determine status based on report content
      let status = '✅ Valid';
      if (reportContent.includes('❌ **Structured data has errors')) {
        status = '❌ Has errors';
      } else if (reportContent.includes('⚠️ **Structured data is valid but has warnings')) {
        status = '⚠️ Has warnings';
      } else if (reportContent.includes('No JSON-LD found on this page')) {
        status = '⚠️ No schema found';
      }
      
      report += `| [${route}](./${reportPath}) | ${expectedTypes} | ${status} |\n`;
    } else {
      report += `| ${route} | ${expectedTypes} | ❓ Not validated |\n`;
    }
  });
  
  report += '\n## Recommendations\n\n';
  report += '1. **Fix all errors** - These will prevent rich results from appearing in search results\n';
  report += '2. **Address warnings** - These may impact the effectiveness of your structured data\n';
  report += '3. **Add missing schema types** - Ensure all expected schema types are implemented\n';
  report += '4. **Test with Google** - Use [Google\'s Rich Results Test](https://search.google.com/test/rich-results) to verify\n';
  report += '5. **Monitor regularly** - Run this validation script regularly to catch issues\n';
  
  fs.writeFileSync(filePath, report);
  console.log(chalkColors.green(`Generated summary report at ${filePath}`));
}

// Run main function
main().catch(error => {
  console.error(chalkColors.red('Error:'), error);
  process.exit(1);
});
