import React, { useState, forwardRef } from 'react';
import styles from './Image.module.css';

/* =====================================================
   OPTIMIZED IMAGE COMPONENT
   Lazy loading, responsive, with placeholder
   ===================================================== */

const OptimizedImage = forwardRef(({
    src,
    alt,
    width,
    height,
    sizes = '100vw',
    srcSet,
    loading = 'lazy',
    placeholder = 'blur', // 'blur' | 'color' | 'none'
    placeholderColor = '#E5E5E5',
    className = '',
    objectFit = 'cover',
    priority = false, // If true, loads eagerly
    onLoad,
    ...props
}, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = (e) => {
        setIsLoaded(true);
        onLoad?.(e);
    };

    const handleError = () => {
        setHasError(true);
    };

    // Determine loading strategy
    const loadingAttr = priority ? 'eager' : loading;
    const fetchPriority = priority ? 'high' : undefined;

    // Generate WebP srcset if not provided
    const generateSrcSet = () => {
        if (srcSet) return srcSet;
        if (!src) return undefined;

        // Simple responsive sizes
        const baseSrc = src.replace(/\.[^.]+$/, '');
        const ext = src.match(/\.[^.]+$/)?.[0] || '.jpg';

        return `
      ${baseSrc}-640w${ext} 640w,
      ${baseSrc}-1024w${ext} 1024w,
      ${baseSrc}-1920w${ext} 1920w
    `.trim();
    };

    const containerStyle = {
        aspectRatio: width && height ? `${width}/${height}` : undefined,
        backgroundColor: !isLoaded && placeholder === 'color' ? placeholderColor : undefined
    };

    const imgStyle = {
        objectFit
    };

    if (hasError) {
        return (
            <div
                className={`${styles.container} ${styles.error} ${className}`}
                style={containerStyle}
                role="img"
                aria-label={alt}
            >
                <span className={styles.errorText}>Image unavailable</span>
            </div>
        );
    }

    return (
        <div
            className={`${styles.container} ${className}`}
            style={containerStyle}
        >
            {/* Placeholder blur overlay */}
            {placeholder === 'blur' && !isLoaded && (
                <div className={styles.placeholder} aria-hidden="true" />
            )}

            <img
                ref={ref}
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes={sizes}
                srcSet={generateSrcSet()}
                loading={loadingAttr}
                fetchpriority={fetchPriority}
                decoding={priority ? 'sync' : 'async'}
                onLoad={handleLoad}
                onError={handleError}
                className={`${styles.image} ${isLoaded ? styles.loaded : ''}`}
                style={imgStyle}
                {...props}
            />
        </div>
    );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
