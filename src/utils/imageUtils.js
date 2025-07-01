/**
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
          .map(size => `${basePath}-${size}.webp ${size}w`)
          .concat(`${basePath}.webp`)
          .join(', ')}
        sizes={sizes}
      />
      
      {/* Original format fallback */}
      <source
        srcSet={breakpoints
          .map(size => `${basePath}-${size}${ext} ${size}w`)
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
