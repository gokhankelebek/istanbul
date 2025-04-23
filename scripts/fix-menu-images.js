/**
 * Script to automatically fix menu.json image paths by matching menu items to available images in /public/menu.
 * - Uses regex and slug normalization to match menu items to images (webp, png, jpg, jpeg).
 * - Updates menu.json so the 'img' field always points to the best available match (preferring webp, then png, then jpg).
 */
const fs = require('fs');
const path = require('path');

const MENU_JSON = path.join(__dirname, '../src/data/menu.json');
const MENU_PUBLIC = path.join(__dirname, '../public/menu');

// Recursively get all image files in /public/menu
function getAllImages(dir, prefix = '/menu') {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const relPath = path.join(prefix, file).replace(/\\/g, '/');
    if (fs.statSync(fullPath).isDirectory()) {
      results = results.concat(getAllImages(fullPath, relPath));
    } else if (/(webp|png|jpg|jpeg)$/i.test(file)) {
      results.push(relPath);
    }
  });
  return results;
}

// Normalize a string for best match (remove accents, lowercase, replace &/and, strip non-ascii, etc)
function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[&]/g, 'and')
    .replace(/d[oö]ner|doner/gi, 'doner')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ç/g, 'c')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function bestImageMatch(slug, name, allImages) {
  // Try to match by slug first
  const normSlug = normalize(slug);
  let candidates = allImages.filter(img => normalize(path.basename(img, path.extname(img))).includes(normSlug));

  // If not found, try by name
  if (candidates.length === 0) {
    const normName = normalize(name);
    candidates = allImages.filter(img => normalize(path.basename(img, path.extname(img))).includes(normName));
  }

  // Prefer webp, then png, then jpg/jpeg
  const extPriority = ['.webp', '.png', '.jpg', '.jpeg'];
  candidates.sort((a, b) => {
    return extPriority.indexOf(path.extname(a)) - extPriority.indexOf(path.extname(b));
  });
  return candidates.length > 0 ? candidates[0] : null;
}

function main() {
  const menu = JSON.parse(fs.readFileSync(MENU_JSON, 'utf8'));
  const allImages = getAllImages(MENU_PUBLIC);
  let updated = 0;
  for (const item of menu) {
    const match = bestImageMatch(item.slug, item.name, allImages);
    if (match && item.img !== match) {
      item.img = match;
      updated++;
    }
  }
  fs.writeFileSync(MENU_JSON, JSON.stringify(menu, null, 2));
  console.log(`Updated ${updated} menu items with new image links.`);
}

if (require.main === module) main();
