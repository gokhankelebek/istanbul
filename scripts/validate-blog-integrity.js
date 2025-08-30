#!/usr/bin/env node
/**
 * Blog Content Integrity Validator
 * Ensures all blog content is properly synchronized and valid before builds
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// Paths to check
const CONTENT_BLOG = path.join(__dirname, "../content/blog");
const PUBLIC_CONTENT = path.join(__dirname, "../public/content/blog");
const PUBLIC_ROOT = path.join(__dirname, "../public");
const SRC_DATA = path.join(__dirname, "../src/data");

console.log("🔍 Starting Blog Content Integrity Validation...\n");

let errorCount = 0;
let warningCount = 0;

function logError(message) {
  console.error(`❌ ERROR: ${message}`);
  errorCount++;
}

function logWarning(message) {
  console.warn(`⚠️  WARNING: ${message}`);
  warningCount++;
}

function logSuccess(message) {
  console.log(`✅ ${message}`);
}

// Validation 1: Check source directory exists and has content
function validateSourceContent() {
  console.log("📁 Validating source content...");

  if (!fs.existsSync(CONTENT_BLOG)) {
    logError(`Source blog directory does not exist: ${CONTENT_BLOG}`);
    return false;
  }

  const sourceFiles = fs
    .readdirSync(CONTENT_BLOG)
    .filter((file) => file.endsWith(".md"));

  if (sourceFiles.length === 0) {
    logError("No markdown files found in source directory");
    return false;
  }

  logSuccess(`Found ${sourceFiles.length} source markdown files`);

  // Validate each markdown file
  let validFiles = 0;
  sourceFiles.forEach((file) => {
    const filePath = path.join(CONTENT_BLOG, file);
    try {
      const content = fs.readFileSync(filePath, "utf8");
      const parsed = matter(content);

      // Check for required frontmatter
      if (!parsed.data.title) {
        logWarning(`${file}: Missing title in frontmatter`);
      }
      if (!parsed.data.slug) {
        logWarning(`${file}: Missing slug in frontmatter`);
      }
      if (!parsed.content || parsed.content.trim().length < 100) {
        logWarning(
          `${file}: Content seems too short (${parsed.content.length} chars)`
        );
      }

      validFiles++;
    } catch (error) {
      logError(`${file}: Failed to parse - ${error.message}`);
    }
  });

  logSuccess(`Validated ${validFiles} source files successfully`);
  return true;
}

// Validation 2: Check synchronization between directories
function validateSynchronization() {
  console.log("\n🔄 Validating file synchronization...");

  const sourceFiles = fs
    .readdirSync(CONTENT_BLOG)
    .filter((file) => file.endsWith(".md"));

  // Check public/content/blog sync
  if (!fs.existsSync(PUBLIC_CONTENT)) {
    logError(`Public content directory does not exist: ${PUBLIC_CONTENT}`);
    return false;
  }

  const publicContentFiles = fs
    .readdirSync(PUBLIC_CONTENT)
    .filter((file) => file.endsWith(".md"));

  if (sourceFiles.length !== publicContentFiles.length) {
    logError(
      `File count mismatch: Source (${sourceFiles.length}) vs Public Content (${publicContentFiles.length})`
    );
  }

  // Check each source file exists in public/content/blog
  sourceFiles.forEach((file) => {
    const publicPath = path.join(PUBLIC_CONTENT, file);

    if (!fs.existsSync(publicPath)) {
      logError(`Missing in public/content/blog: ${file}`);
    }
  });

  logSuccess(`Synchronization check completed`);
  return true;
}

// Validation 3: Check metadata consistency
function validateMetadata() {
  console.log("\n📋 Validating metadata consistency...");

  const postsJsonPath = path.join(SRC_DATA, "posts.json");

  if (!fs.existsSync(postsJsonPath)) {
    logWarning("posts.json does not exist in src/data");
    return true; // Not critical error
  }

  try {
    const postsData = JSON.parse(fs.readFileSync(postsJsonPath, "utf8"));
    const sourceFiles = fs
      .readdirSync(CONTENT_BLOG)
      .filter((file) => file.endsWith(".md"));

    console.log(
      `📊 Found ${postsData.length} posts in JSON, ${sourceFiles.length} markdown files`
    );

    if (postsData.length !== sourceFiles.length) {
      logWarning(
        `Post count mismatch: JSON (${postsData.length}) vs Markdown (${sourceFiles.length})`
      );
    }

    // Check each markdown file has corresponding JSON entry
    sourceFiles.forEach((file) => {
      const slug = file.replace(".md", "");
      const jsonEntry = postsData.find((post) => post.slug === slug);

      if (!jsonEntry) {
        logWarning(`No JSON metadata found for: ${slug}`);
      }
    });

    logSuccess("Metadata validation completed");
  } catch (error) {
    logError(`Failed to validate metadata: ${error.message}`);
    return false;
  }

  return true;
}

// Validation 4: Check for duplicate content
function validateUniqueContent() {
  console.log("\n🔍 Checking for duplicate content...");

  const sourceFiles = fs
    .readdirSync(CONTENT_BLOG)
    .filter((file) => file.endsWith(".md"));
  const slugs = new Set();
  const titles = new Set();

  sourceFiles.forEach((file) => {
    try {
      const content = fs.readFileSync(path.join(CONTENT_BLOG, file), "utf8");
      const parsed = matter(content);

      if (parsed.data.slug) {
        if (slugs.has(parsed.data.slug)) {
          logError(`Duplicate slug found: ${parsed.data.slug} in ${file}`);
        }
        slugs.add(parsed.data.slug);
      }

      if (parsed.data.title) {
        if (titles.has(parsed.data.title)) {
          logWarning(`Duplicate title found: ${parsed.data.title} in ${file}`);
        }
        titles.add(parsed.data.title);
      }
    } catch (error) {
      logError(`Failed to check duplicates in ${file}: ${error.message}`);
    }
  });

  logSuccess("Duplicate content check completed");
  return true;
}

// Main validation function
function runValidation() {
  const startTime = Date.now();

  console.log("🛡️  Blog Content Integrity Validation");
  console.log("=====================================\n");

  const validations = [
    validateSourceContent,
    validateSynchronization,
    validateMetadata,
    validateUniqueContent,
  ];

  let allPassed = true;

  validations.forEach((validation) => {
    try {
      const result = validation();
      if (!result) allPassed = false;
    } catch (error) {
      logError(`Validation failed: ${error.message}`);
      allPassed = false;
    }
  });

  const duration = Date.now() - startTime;

  console.log("\n=====================================");
  console.log("📊 Validation Summary:");
  console.log(`⏱️  Duration: ${duration}ms`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`⚠️  Warnings: ${warningCount}`);

  if (allPassed && errorCount === 0) {
    console.log("\n🎉 All validations passed! Blog content is safe to build.");
    process.exit(0);
  } else {
    console.log("\n🚨 Validation failed! Please fix errors before building.");
    console.log("💡 See BLOG_CONTENT_BACKUP.md for recovery procedures.");
    process.exit(1);
  }
}

// Run validation if called directly
if (require.main === module) {
  runValidation();
}

module.exports = { runValidation };
