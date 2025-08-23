#!/usr/bin/env node

/**
 * Live Schema Markup Tester for Istanbul Mediterranean
 * Tests structured data from the running website
 */

const https = require("https");
const http = require("http");

console.log("🚀 LIVE SCHEMA MARKUP TEST");
console.log("==========================\n");

// Function to fetch page content
async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https:") ? https : http;

    protocol
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

// Function to extract and validate JSON-LD
function extractAndValidateSchemas(html, pageName) {
  console.log(`\n🔍 Testing: ${pageName}`);
  console.log("=".repeat(50));

  const jsonLdRegex =
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  const matches = [];
  let match;

  while ((match = jsonLdRegex.exec(html)) !== null) {
    matches.push(match[1]);
  }

  if (matches.length === 0) {
    console.log("❌ No JSON-LD structured data found");
    return { valid: 0, total: 0, schemas: [] };
  }

  let validCount = 0;
  const schemas = [];

  matches.forEach((jsonContent, index) => {
    try {
      const parsed = JSON.parse(jsonContent.trim());
      const schemaType = Array.isArray(parsed)
        ? parsed.map((p) => p["@type"]).join(", ")
        : parsed["@type"];

      console.log(`✅ Schema #${index + 1}: ${schemaType}`);

      // Validate specific fields
      if (Array.isArray(parsed)) {
        parsed.forEach((schema, subIndex) => {
          validateSchemaFields(schema, `Schema #${index + 1}.${subIndex + 1}`);
        });
      } else {
        validateSchemaFields(parsed, `Schema #${index + 1}`);
      }

      validCount++;
      schemas.push({
        type: schemaType,
        valid: true,
        data: parsed,
      });
    } catch (error) {
      console.log(`❌ Schema #${index + 1}: INVALID - ${error.message}`);
      schemas.push({
        type: "Invalid",
        valid: false,
        error: error.message,
      });
    }
  });

  return { valid: validCount, total: matches.length, schemas };
}

// Function to validate schema fields
function validateSchemaFields(schema, schemaName) {
  const requiredFields = {
    Restaurant: ["@context", "@type", "name", "address"],
    FAQPage: ["@context", "@type", "mainEntity"],
    LocalBusiness: ["@context", "@type", "name", "address"],
    Product: ["@context", "@type", "name"],
    BreadcrumbList: ["@context", "@type", "itemListElement"],
  };

  const schemaType = schema["@type"];
  const required = requiredFields[schemaType];

  if (required) {
    const missing = required.filter((field) => !schema[field]);
    if (missing.length > 0) {
      console.log(`   ⚠️  ${schemaName} missing: ${missing.join(", ")}`);
    } else {
      console.log(`   ✅ ${schemaName} has all required fields`);
    }
  }

  // Check for common issues
  if (schema.telephone && !schema.telephone.startsWith("+")) {
    console.log(`   ⚠️  ${schemaName}: Phone should include country code (+1)`);
  }

  if (schema.address && schema.address["@region"]) {
    console.log(
      `   ⚠️  ${schemaName}: Use 'addressRegion' instead of '@region'`
    );
  }
}

// Test pages
async function testSchemas() {
  const baseUrl = "http://localhost:3000";
  const testPages = [
    { path: "/", name: "Homepage" },
    { path: "/shawarma", name: "Shawarma Page" },
    { path: "/menu", name: "Menu Page" },
    { path: "/faq/what-is-halal", name: "FAQ Halal Page" },
    { path: "/about", name: "About Page" },
  ];

  let totalValid = 0;
  let totalSchemas = 0;
  const allResults = [];

  for (const page of testPages) {
    try {
      const html = await fetchPage(`${baseUrl}${page.path}`);
      const result = extractAndValidateSchemas(html, page.name);

      totalValid += result.valid;
      totalSchemas += result.total;
      allResults.push({ ...page, ...result });
    } catch (error) {
      console.log(`\n❌ Error testing ${page.name}: ${error.message}`);
      allResults.push({ ...page, valid: 0, total: 0, error: error.message });
    }
  }

  // Summary
  console.log("\n📊 SCHEMA VALIDATION SUMMARY");
  console.log("============================");
  console.log(`✅ Valid Schemas: ${totalValid}`);
  console.log(`❌ Invalid Schemas: ${totalSchemas - totalValid}`);
  console.log(`📈 Total Schemas: ${totalSchemas}`);
  console.log(
    `🎯 Success Rate: ${
      totalSchemas > 0 ? Math.round((totalValid / totalSchemas) * 100) : 0
    }%`
  );

  // Schema types found
  const schemaTypes = {};
  allResults.forEach((result) => {
    if (result.schemas) {
      result.schemas.forEach((schema) => {
        if (schema.valid) {
          schemaTypes[schema.type] = (schemaTypes[schema.type] || 0) + 1;
        }
      });
    }
  });

  console.log("\n🎯 SCHEMA TYPES FOUND:");
  console.log("======================");
  Object.entries(schemaTypes).forEach(([type, count]) => {
    console.log(`📊 ${type}: ${count} instance(s)`);
  });

  // Recommendations
  console.log("\n💡 GOOGLE TESTING URLS:");
  console.log("========================");
  testPages.forEach((page) => {
    const testUrl = `https://search.google.com/test/rich-results?url=${encodeURIComponent(
      baseUrl + page.path
    )}`;
    console.log(`🔗 ${page.name}: ${testUrl}`);
  });

  console.log("\n🚀 NEXT STEPS:");
  console.log("===============");
  console.log("1. Test each URL above in Google Rich Results Test");
  console.log("2. Fix any schema validation errors");
  console.log("3. Submit updated sitemap to Google Search Console");
  console.log("4. Monitor for rich snippets in search results");

  return { totalValid, totalSchemas, success: totalValid === totalSchemas };
}

// Check if server is running
async function checkServer() {
  try {
    await fetchPage("http://localhost:3000/");
    return true;
  } catch (error) {
    console.log("❌ Server not running on localhost:3000");
    console.log('📝 Please run "npm start" first, then run this test again');
    return false;
  }
}

// Main execution
checkServer().then((serverRunning) => {
  if (serverRunning) {
    testSchemas().then((result) => {
      if (result.success) {
        console.log("\n🎉 All schemas are valid! Ready for Google indexing!");
      } else {
        console.log("\n⚠️  Some schemas need fixing. Check errors above.");
      }
    });
  }
});
