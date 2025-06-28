const fs = require('fs');
const path = require('path');

// Configuration
const SRC_DIR = path.join(__dirname, '../src');
const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];

// Keywords to use for generating alt text
const FOOD_KEYWORDS = [
  'Turkish food', 'Mediterranean cuisine', 'Döner kebab', 'Shawarma', 
  'Baklava', 'Halal food', 'Turkish restaurant', 'Las Vegas restaurant',
  'Middle Eastern food', 'Authentic Turkish', 'Istanbul Mediterranean'
];

// Process JSX files to add missing alt text
function processJsxFiles(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      // Recursively process subdirectories
      processJsxFiles(filePath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      // Process JSX/JS files
      addAltTextToImages(filePath);
    }
  });
}

// Add alt text to images in JSX files
function addAltTextToImages(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Find img tags without alt text or with empty alt
    const imgRegex = /<img\s+(?![^>]*alt=["'][^"']+["'])[^>]*src=["']([^"']+)["'][^>]*\/?>/g;
    
    content = content.replace(imgRegex, (match, src) => {
      modified = true;
      
      // Generate alt text based on filename and keywords
      const fileName = path.basename(src, path.extname(src));
      const altText = generateAltText(fileName);
      
      // Add alt text to the img tag
      if (match.includes('alt=')) {
        // Replace empty alt
        return match.replace(/alt=["']["']/, `alt="${altText}"`);
      } else {
        // Add alt attribute before closing tag
        return match.replace(/(\/?>)$/, ` alt="${altText}"$1`);
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Added alt text to images in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

// Generate alt text based on filename and keywords
function generateAltText(fileName) {
  // Convert filename to readable format
  const readable = fileName
    .replace(/[-_]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase();
  
  // Select a relevant keyword
  const keyword = FOOD_KEYWORDS.find(k => 
    readable.includes(k.toLowerCase()) || 
    k.toLowerCase().includes(readable)
  ) || FOOD_KEYWORDS[Math.floor(Math.random() * FOOD_KEYWORDS.length)];
  
  return `${readable} - ${keyword} at Istanbul Mediterranean Las Vegas`;
}

// Generate image sitemap
function generateImageSitemap() {
  const pages = [];
  const imageMap = new Map();
  
  // Find all JSX files and extract image references
  function findImagesInJsx(directory) {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        // Recursively process subdirectories
        findImagesInJsx(filePath);
      } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
        // Extract page path from file path
        let pagePath = '';
        if (filePath.includes('/pages/')) {
          pagePath = '/' + path.basename(filePath, path.extname(filePath)).toLowerCase();
          if (pagePath === '/home') pagePath = '/';
          
          // Extract image references
          const content = fs.readFileSync(filePath, 'utf8');
          const imgRegex = /src=["']([^"']+\.(jpg|jpeg|png|webp|svg))["']/g;
          const images = [];
          let match;
          
          while ((match = imgRegex.exec(content)) !== null) {
            const imgSrc = match[1];
            if (!imgSrc.startsWith('http')) {
              // Only include local images
              images.push(imgSrc.startsWith('/') ? imgSrc : `/${imgSrc}`);
            }
          }
          
          if (images.length > 0) {
            imageMap.set(pagePath, images);
            pages.push(pagePath);
          }
        }
      }
    });
  }
  
  findImagesInJsx(SRC_DIR);
  
  // Generate the image sitemap XML
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;
  
  pages.forEach(page => {
    const images = imageMap.get(page) || [];
    if (images.length > 0) {
      sitemap += `
  <url>
    <loc>https://www.istanbullv.com${page}</loc>`;
      
      images.forEach(img => {
        const fileName = path.basename(img, path.extname(img));
        const title = fileName
          .replace(/[-_]/g, ' ')
          .replace(/([a-z])([A-Z])/g, '$1 $2')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        
        sitemap += `
    <image:image>
      <image:loc>https://www.istanbullv.com${img}</image:loc>
      <image:title>${title}</image:title>
      <image:caption>${title} - Istanbul Mediterranean Restaurant Las Vegas</image:caption>
    </image:image>`;
      });
      
      sitemap += `
  </url>`;
    }
  });
  
  sitemap += `
</urlset>`;
  
  // Write the image sitemap
  fs.writeFileSync(path.join(PUBLIC_DIR, 'image-sitemap.xml'), sitemap);
  console.log('Image sitemap generated successfully!');
}

// Main execution
console.log('Starting image SEO optimization...');
processJsxFiles(SRC_DIR);
generateImageSitemap();
console.log('Image SEO optimization completed!');
