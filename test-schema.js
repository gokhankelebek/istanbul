#!/usr/bin/env node

/**
 * Schema Markup Validator for Istanbul Mediterranean
 * Tests all structured data across the website
 */

const fs = require("fs");
const path = require("path");

console.log("🔍 SCHEMA MARKUP VALIDATION TEST");
console.log("================================\n");

// Function to extract and validate JSON-LD schemas
function validateJsonLd(content, filename) {
  const jsonLdMatches = content.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  );

  if (!jsonLdMatches) {
    console.log(`❌ ${filename}: No JSON-LD found`);
    return { valid: false, schemas: [] };
  }

  const schemas = [];
  let allValid = true;

  jsonLdMatches.forEach((match, index) => {
    try {
      // Extract JSON content
      const jsonContent = match
        .replace(/<script type="application\/ld\+json">/, "")
        .replace(/<\/script>/, "")
        .trim();

      // Remove template literals and parse
      const cleanJson = jsonContent
        .replace(/`/g, "")
        .replace(/\$\{[^}]*\}/g, '"placeholder"');
      const parsed = JSON.parse(cleanJson);

      schemas.push({
        index: index + 1,
        type: Array.isArray(parsed)
          ? parsed.map((p) => p["@type"]).join(", ")
          : parsed["@type"],
        valid: true,
        data: parsed,
      });

      console.log(
        `✅ ${filename} Schema #${index + 1}: ${
          Array.isArray(parsed)
            ? parsed.map((p) => p["@type"]).join(", ")
            : parsed["@type"]
        }`
      );
    } catch (error) {
      allValid = false;
      schemas.push({
        index: index + 1,
        type: "Invalid",
        valid: false,
        error: error.message,
      });

      console.log(
        `❌ ${filename} Schema #${index + 1}: INVALID - ${error.message}`
      );
    }
  });

  return { valid: allValid, schemas };
}

// Test specific pages with schema markup
const pagesToTest = [
  "src/pages/Shawarma.jsx",
  "src/pages/Menu.jsx",
  "src/pages/FaqWhatIsHalal.jsx",
  "src/pages/Home.jsx",
  "src/pages/About.jsx",
];

console.log("📋 TESTING SCHEMA MARKUP IN SOURCE FILES:");
console.log("=========================================\n");

let totalSchemas = 0;
let validSchemas = 0;
const results = {};

pagesToTest.forEach((filePath) => {
  const fullPath = path.join(__dirname, filePath);

  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, "utf8");
    const result = validateJsonLd(content, path.basename(filePath));

    results[filePath] = result;
    totalSchemas += result.schemas.length;
    validSchemas += result.schemas.filter((s) => s.valid).length;

    console.log("");
  } else {
    console.log(`⚠️  ${filePath}: File not found\n`);
  }
});

// Test common schema types
console.log("🎯 SCHEMA TYPE ANALYSIS:");
console.log("========================\n");

const schemaTypes = {};
Object.values(results).forEach((result) => {
  result.schemas.forEach((schema) => {
    if (schema.valid) {
      const type = schema.type;
      schemaTypes[type] = (schemaTypes[type] || 0) + 1;
    }
  });
});

Object.entries(schemaTypes).forEach(([type, count]) => {
  console.log(`📊 ${type}: ${count} instance(s)`);
});

console.log("\n📈 VALIDATION SUMMARY:");
console.log("======================");
console.log(`✅ Valid Schemas: ${validSchemas}`);
console.log(`❌ Invalid Schemas: ${totalSchemas - validSchemas}`);
console.log(`📊 Total Schemas: ${totalSchemas}`);
console.log(
  `🎯 Success Rate: ${
    totalSchemas > 0 ? Math.round((validSchemas / totalSchemas) * 100) : 0
  }%\n`
);

// Schema recommendations
console.log("💡 SCHEMA RECOMMENDATIONS:");
console.log("===========================");

const recommendedSchemas = [
  "Restaurant",
  "FAQPage",
  "Product",
  "BreadcrumbList",
  "LocalBusiness",
  "MenuSection",
];

const foundTypes = Object.keys(schemaTypes);
const missingTypes = recommendedSchemas.filter(
  (type) => !foundTypes.includes(type)
);

if (missingTypes.length > 0) {
  console.log("📝 Consider adding these schema types:");
  missingTypes.forEach((type) => {
    console.log(`   - ${type}`);
  });
} else {
  console.log("🎉 All recommended schema types are implemented!");
}

// Generate validation URLs
console.log("\n🔗 VALIDATION TOOLS:");
console.log("====================");
console.log(
  "🌐 Google Rich Results Test: https://search.google.com/test/rich-results"
);
console.log("🔍 Schema.org Validator: https://validator.schema.org/");
console.log(
  "⚡ Google Structured Data Testing Tool: https://developers.google.com/search/docs/appearance/structured-data"
);

console.log("\n🚀 NEXT STEPS:");
console.log("===============");
console.log("1. Test each page URL in Google Rich Results Test");
console.log("2. Submit sitemap to Google Search Console");
console.log("3. Monitor rich snippets in search results");
console.log("4. Check for schema warnings in GSC");

console.log("\n✅ Schema validation complete! 🎉");
