const fs = require('fs');
const path = require('path');

const IMAGE_DIR = path.join(__dirname, 'public', 'menu');

// Manual transliteration for Turkish and common non-ASCII chars
function transliterate(str) {
  return str
    .replace(/[çÇ]/g, 'c')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[ıİ]/g, 'i')
    .replace(/[öÖ]/g, 'o')
    .replace(/[şŞ]/g, 's')
    .replace(/[üÜ]/g, 'u')
    .replace(/&/g, 'and')
    .replace(/@/g, 'at')
    .replace(/[^\x00-\x7F]/g, ''); // Remove other non-ASCII
}

function toAsciiFilename(filename) {
  return transliterate(filename)
    .replace(/[()]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/[^a-zA-Z0-9._-]/g, '')
    .toLowerCase();
}

function renameFilesRecursive(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      renameFilesRecursive(filePath);
    } else {
      const asciiName = toAsciiFilename(file);
      if (asciiName !== file) {
        const newPath = path.join(dir, asciiName);
        fs.renameSync(filePath, newPath);
        console.log(`Renamed: ${file} -> ${asciiName}`);
      }
    }
  });
}

renameFilesRecursive(IMAGE_DIR);
renameFilesRecursive(path.join(__dirname, 'public'));
