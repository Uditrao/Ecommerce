import React, { useEffect } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import styles from './ImageZoom.module.css';

const ImageZoom = ({ isOpen, onClose, imageUrl, altText }) => {
    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            const handleEsc = (e) => {
                if (e.key === 'Escape') onClose();
            };
            window.addEventListener('keydown', handleEsc);
            return () => window.removeEventListener('keydown', handleEsc);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <X size={32} />
                </button>

                <div className={styles.imageWrapper}>
                    {/* In a real app, we'd use a high-res image here */}
                    <div className={styles.placeholderLarge}>
                        <img
                            src={imageUrl}
                            alt={altText || 'Product Image Zoomed'}
                            className={styles.mainImage}
                        />
                        <div className={styles.zoomHint}>
                            <ZoomIn size={16} />
                            Click to close
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageZoom;
