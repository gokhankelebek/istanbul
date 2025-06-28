import React, { useState, useEffect, useRef } from 'react';

/**
 * OptimizedImage Component
 * 
 * A highly optimized image component that implements:
 * - Lazy loading with IntersectionObserver
 * - Blur-up image loading technique
 * - WebP format with fallbacks
 * - Responsive image sizes
 * - Proper image dimensions
 * - Accessibility attributes
 * 
 * This component significantly improves Core Web Vitals metrics like LCP and CLS,
 * which directly impact SEO rankings.
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Main image source URL
 * @param {string} props.alt - Alt text for the image (required for SEO)
 * @param {string} props.webpSrc - WebP version of the image
 * @param {string} props.placeholderSrc - Low-quality image placeholder
 * @param {number} props.width - Image width in pixels
 * @param {number} props.height - Image height in pixels
 * @param {string} props.sizes - Responsive image sizes attribute
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.imgProps - Additional props for the img element
 * @returns {JSX.Element} - Optimized image component
 */
const OptimizedImage = ({
  src,
  alt,
  webpSrc,
  placeholderSrc,
  width,
  height,
  sizes = '100vw',
  className = '',
  imgProps = {},
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  // Set up intersection observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px', // Start loading when image is 200px from viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Generate srcSet for responsive images
  const generateSrcSet = (baseSrc) => {
    if (!baseSrc) return undefined;
    
    // Extract base filename and extension
    const lastDotIndex = baseSrc.lastIndexOf('.');
    const baseFilename = lastDotIndex !== -1 ? baseSrc.substring(0, lastDotIndex) : baseSrc;
    const extension = lastDotIndex !== -1 ? baseSrc.substring(lastDotIndex) : '';
    
    // Generate srcSet for different sizes
    return [0.5, 1, 1.5, 2].map(scale => {
      const width = Math.round(scale * (props.width || 800));
      return `${baseFilename}-${width}w${extension} ${width}w`;
    }).join(', ');
  };

  // Handle image load event
  const handleImageLoad = () => {
    setIsLoaded(true);
    
    // Report to analytics if available
    if (window.gtag) {
      window.gtag('event', 'image_loaded', {
        event_category: 'Performance',
        event_label: src,
        non_interaction: true
      });
    }
  };

  // Combine classes for container
  const containerClasses = `optimized-image-container relative overflow-hidden ${className}`;
  
  // Combine classes for image
  const imageClasses = `optimized-image transition-opacity duration-500 ${
    isLoaded ? 'opacity-100' : 'opacity-0'
  }`;
  
  // Combine classes for placeholder
  const placeholderClasses = `placeholder-image absolute inset-0 w-full h-full transition-opacity duration-500 ${
    isLoaded ? 'opacity-0' : 'opacity-100'
  } blur-sm scale-105`;

  return (
    <div 
      className={containerClasses}
      ref={imgRef}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        aspectRatio: width && height ? `${width} / ${height}` : undefined,
      }}
    >
      {/* Placeholder image (low quality) */}
      {placeholderSrc && (
        <img
          src={placeholderSrc}
          alt=""
          className={placeholderClasses}
          aria-hidden="true"
          loading="eager"
          width={width}
          height={height}
        />
      )}
      
      {/* Main image (lazy loaded) */}
      {isInView && (
        <picture>
          {/* WebP version */}
          {webpSrc && (
            <source
              type="image/webp"
              srcSet={generateSrcSet(webpSrc)}
              sizes={sizes}
            />
          )}
          
          {/* Original format */}
          <img
            src={src}
            alt={alt}
            className={imageClasses}
            width={width}
            height={height}
            loading="lazy"
            onLoad={handleImageLoad}
            srcSet={generateSrcSet(src)}
            sizes={sizes}
            {...imgProps}
          />
        </picture>
      )}
      
      {/* Placeholder div to prevent layout shifts */}
      {!isInView && (
        <div
          className="placeholder-div bg-gray-200 w-full h-full"
          style={{
            aspectRatio: width && height ? `${width} / ${height}` : undefined,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default OptimizedImage;
