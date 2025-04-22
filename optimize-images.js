const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const IMAGE_DIR = path.join(__dirname, "public");
const SKIP = [
  path.join(__dirname, "public", "favicon.png"),
];
const MAX_WIDTH = 800; // adjust as needed
const QUALITY = 75;    // 60-80 is typical for web

function getAllImages(dir) {
  let results = [];
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllImages(filePath));
    } else if (/\.(jpe?g|png)$/i.test(file) && !SKIP.includes(filePath)) {
      results.push(filePath);
    }
  });
  return results;
}

(async () => {
  const images = getAllImages(IMAGE_DIR);
  for (const img of images) {
    const ext = path.extname(img).toLowerCase();
    const tempOut = img + '.optimized';
    const webpOut = img.replace(/\.(jpe?g|png)$/i, '.webp');
    try {
      const pipeline = sharp(img).resize({ width: MAX_WIDTH, withoutEnlargement: true });
      // Optimize original
      if (ext === ".png") {
        await pipeline.png({ quality: QUALITY, compressionLevel: 9 }).toFile(tempOut);
      } else {
        await pipeline.jpeg({ quality: QUALITY }).toFile(tempOut);
      }
      fs.renameSync(tempOut, img);
      console.log(`Optimized: ${img}`);
      // Generate WebP
      await pipeline.webp({ quality: QUALITY }).toFile(webpOut);
      console.log(`WebP created: ${webpOut}`);
    } catch (e) {
      if (fs.existsSync(tempOut)) fs.unlinkSync(tempOut);
      if (fs.existsSync(webpOut)) fs.unlinkSync(webpOut);
      console.error(`Failed to optimize ${img}:`, e);
    }
  }
})();
