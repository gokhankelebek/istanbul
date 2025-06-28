const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Configuration
const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];
const WEBP_QUALITY = 80;
const MAX_IMAGE_WIDTH = 1920;
const SIZES = [320, 640, 1024, 1920]; // Responsive image sizes

// Function to recursively find all images
async function findImages(directory) {
  const files = await readdir(directory);
  const imageFiles = [];
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = await stat(filePath);
    
    if (stats.isDirectory()) {
      // Recursively search subdirectories
      const subDirImages = await findImages(filePath);
      imageFiles.push(...subDirImages);
    } else if (IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())) {
      imageFiles.push(filePath);
    }
  }
  
  return imageFiles;
}

// Function to optimize an image
async function optimizeImage(imagePath) {
  try {
    const ext = path.extname(imagePath).toLowerCase();
    const dir = path.dirname(imagePath);
    const baseName = path.basename(imagePath, ext);
    
    // Skip already processed images
    if (baseName.includes('-optimized')) {
      return;
    }
    
    // Load the image
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    // Skip if image is already smaller than our max width
    const targetWidth = Math.min(metadata.width, MAX_IMAGE_WIDTH);
    
    // Generate WebP version
    const webpPath = path.join(dir, `${baseName}.webp`);
    await image
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpPath);
    
    console.log(`Created WebP version: ${webpPath}`);
    
    // Generate responsive sizes for important images
    // Only do this for images in specific directories to avoid excessive processing
    const isImportantImage = imagePath.includes('/menu/') || 
                            imagePath.includes('/hero') || 
                            imagePath.includes('/banner');
    
    if (isImportantImage) {
      for (const size of SIZES) {
        // Skip sizes larger than the original
        if (size >= metadata.width) continue;
        
        const responsiveWebpPath = path.join(dir, `${baseName}-${size}.webp`);
        await sharp(imagePath)
          .resize({ width: size, withoutEnlargement: true })
          .webp({ quality: WEBP_QUALITY })
          .toFile(responsiveWebpPath);
        
        console.log(`Created responsive WebP (${size}px): ${responsiveWebpPath}`);
      }
    }
  } catch (error) {
    console.error(`Error optimizing ${imagePath}:`, error);
  }
}

// Generate a picture element helper script
function generatePictureElementHelper() {
  const helperPath = path.join(__dirname, '../src/utils/imageUtils.js');
  
  const helperContent = `/**
 * Utility function to generate responsive picture elements
 * @param {string} src - The base image source path
 * @param {string} alt - Alt text for the image
 * @param {Object} options - Additional options
 * @returns {JSX.Element} A responsive picture element
 */
export function ResponsiveImage({ src, alt, className = '', width, height, loading = 'lazy', sizes = '100vw' }) {
  // Extract base path and extension
  const ext = src.substring(src.lastIndexOf('.'));
  const basePath = src.substring(0, src.lastIndexOf('.'));
  
  // Responsive sizes
  const breakpoints = [320, 640, 1024, 1920];
  
  return (
    <picture>
      {/* WebP sources */}
      <source
        type="image/webp"
        srcSet={breakpoints
          .map(size => \`\${basePath}-\${size}.webp \${size}w\`)
          .concat(\`\${basePath}.webp\`)
          .join(', ')}
        sizes={sizes}
      />
      
      {/* Original format fallback */}
      <source
        srcSet={breakpoints
          .map(size => \`\${basePath}-\${size}\${ext} \${size}w\`)
          .concat(src)
          .join(', ')}
        sizes={sizes}
      />
      
      {/* Fallback img element */}
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
      />
    </picture>
  );
}
`;

  fs.writeFileSync(helperPath, helperContent);
  console.log(`Created responsive image helper at: ${helperPath}`);
}

// Main function
async function optimizeImages() {
  try {
    console.log('Finding images to optimize...');
    const images = await findImages(PUBLIC_DIR);
    console.log(`Found ${images.length} images to process`);
    
    // Process images in batches to avoid memory issues
    const BATCH_SIZE = 5;
    for (let i = 0; i < images.length; i += BATCH_SIZE) {
      const batch = images.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map(img => optimizeImage(img)));
      console.log(`Processed batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(images.length / BATCH_SIZE)}`);
    }
    
    // Generate helper component
    generatePictureElementHelper();
    
    console.log('Image optimization completed!');
  } catch (error) {
    console.error('Error during optimization:', error);
  }
}

// Run the optimization
optimizeImages();
