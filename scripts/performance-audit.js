#!/usr/bin/env node

/**
 * Performance Audit Script
 * Tracks bundle sizes and Core Web Vitals improvements
 */

const fs = require("fs");
const path = require("path");

// Get bundle sizes
function getBundleSizes() {
  const buildDir = path.join(__dirname, "../build/static/js");
  if (!fs.existsSync(buildDir)) {
    console.log("❌ Build directory not found. Run npm run build first.");
    return null;
  }

  const files = fs.readdirSync(buildDir);
  const mainJs = files.find((f) => f.startsWith("main.") && f.endsWith(".js"));

  if (!mainJs) {
    console.log("❌ Main bundle not found.");
    return null;
  }

  const mainPath = path.join(buildDir, mainJs);
  const stats = fs.statSync(mainPath);

  return {
    mainBundle: {
      file: mainJs,
      size: stats.size,
      sizeKB: Math.round(stats.size / 1024),
      sizeMB: Math.round((stats.size / 1024 / 1024) * 100) / 100,
    },
  };
}

// Performance targets
const targets = {
  mainBundleKB: 100, // Target: under 100KB
  totalJSKB: 300, // Target: under 300KB total
  imageOptimization: 80, // Target: 80% WebP adoption
};

// Audit function
function auditPerformance() {
  console.log("🔍 Performance Audit - Istanbul Mediterranean");
  console.log("=".repeat(50));

  const bundleSizes = getBundleSizes();
  if (!bundleSizes) return;

  const { mainBundle } = bundleSizes;

  console.log("📦 Bundle Analysis:");
  console.log(
    `   Main Bundle: ${mainBundle.sizeKB}KB (${mainBundle.sizeMB}MB)`
  );

  // Grade bundle size
  let bundleGrade = "F";
  if (mainBundle.sizeKB < 50) bundleGrade = "A+";
  else if (mainBundle.sizeKB < 100) bundleGrade = "A";
  else if (mainBundle.sizeKB < 150) bundleGrade = "B";
  else if (mainBundle.sizeKB < 200) bundleGrade = "C";
  else if (mainBundle.sizeKB < 300) bundleGrade = "D";

  console.log(`   Grade: ${bundleGrade}`);

  if (mainBundle.sizeKB > targets.mainBundleKB) {
    console.log(
      `   ⚠️  OVER TARGET by ${mainBundle.sizeKB - targets.mainBundleKB}KB`
    );
  } else {
    console.log(
      `   ✅ UNDER TARGET by ${targets.mainBundleKB - mainBundle.sizeKB}KB`
    );
  }

  // Check images optimization
  const publicDir = path.join(__dirname, "../public");
  const webpCount = countFilesByExtension(publicDir, ".webp");
  const imgCount = countFilesByExtension(publicDir, [".jpg", ".jpeg", ".png"]);
  const webpRatio =
    imgCount > 0 ? Math.round((webpCount / (webpCount + imgCount)) * 100) : 0;

  console.log("\n🖼️  Image Optimization:");
  console.log(`   WebP Images: ${webpCount}`);
  console.log(`   Legacy Images: ${imgCount}`);
  console.log(`   WebP Adoption: ${webpRatio}%`);

  if (webpRatio >= targets.imageOptimization) {
    console.log("   ✅ EXCELLENT image optimization");
  } else {
    console.log(
      `   ⚠️  Need ${
        targets.imageOptimization - webpRatio
      }% more WebP conversion`
    );
  }

  // Overall grade
  console.log("\n📊 Overall Performance Grade:");
  const overallGrade = calculateOverallGrade(bundleGrade, webpRatio);
  console.log(`   ${overallGrade}`);

  // Recommendations
  console.log("\n💡 Recommendations:");
  if (mainBundle.sizeKB > 200) {
    console.log(
      "   🔥 CRITICAL: Bundle size too large - remove unused dependencies"
    );
  }
  if (mainBundle.sizeKB > 100) {
    console.log("   ⚠️  WARNING: Consider code splitting and lazy loading");
  }
  if (webpRatio < 80) {
    console.log("   📸 Convert more images to WebP format");
  }
  if (bundleGrade === "A" || bundleGrade === "A+") {
    console.log("   🎉 Excellent bundle optimization!");
  }
}

function countFilesByExtension(dir, extensions) {
  if (!fs.existsSync(dir)) return 0;

  const exts = Array.isArray(extensions) ? extensions : [extensions];
  let count = 0;

  function countRecursive(currentDir) {
    const files = fs.readdirSync(currentDir);
    files.forEach((file) => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        countRecursive(filePath);
      } else {
        const ext = path.extname(file).toLowerCase();
        if (exts.includes(ext)) {
          count++;
        }
      }
    });
  }

  countRecursive(dir);
  return count;
}

function calculateOverallGrade(bundleGrade, webpRatio) {
  const bundleScore =
    {
      "A+": 100,
      A: 90,
      B: 80,
      C: 70,
      D: 60,
      F: 50,
    }[bundleGrade] || 50;

  const imageScore = webpRatio;
  const overall = Math.round((bundleScore + imageScore) / 2);

  if (overall >= 95) return "🏆 A+ (EXCELLENT)";
  if (overall >= 85) return "🥇 A (GREAT)";
  if (overall >= 75) return "🥈 B (GOOD)";
  if (overall >= 65) return "🥉 C (NEEDS WORK)";
  if (overall >= 55) return "⚠️  D (POOR)";
  return "🚨 F (CRITICAL)";
}

// Save audit results
function saveAuditResults() {
  const timestamp = new Date().toISOString();
  const bundleSizes = getBundleSizes();

  if (!bundleSizes) return;

  const results = {
    timestamp,
    mainBundleSizeKB: bundleSizes.mainBundle.sizeKB,
    grade: calculateOverallGrade(
      getBundleGrade(bundleSizes.mainBundle.sizeKB),
      80
    ),
  };

  const resultsPath = path.join(
    __dirname,
    "../reports/performance-history.json"
  );
  let history = [];

  if (fs.existsSync(resultsPath)) {
    history = JSON.parse(fs.readFileSync(resultsPath, "utf8"));
  }

  history.push(results);

  // Keep only last 50 entries
  if (history.length > 50) {
    history = history.slice(-50);
  }

  // Ensure reports directory exists
  const reportsDir = path.dirname(resultsPath);
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  fs.writeFileSync(resultsPath, JSON.stringify(history, null, 2));
  console.log(`\n💾 Results saved to ${resultsPath}`);
}

function getBundleGrade(sizeKB) {
  if (sizeKB < 50) return "A+";
  if (sizeKB < 100) return "A";
  if (sizeKB < 150) return "B";
  if (sizeKB < 200) return "C";
  if (sizeKB < 300) return "D";
  return "F";
}

// Run audit
if (require.main === module) {
  auditPerformance();
  saveAuditResults();
}

module.exports = { auditPerformance, getBundleSizes };
