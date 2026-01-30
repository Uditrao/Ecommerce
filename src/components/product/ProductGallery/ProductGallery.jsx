import React, { useState } from 'react';
import ImageZoom from '../../common/ImageZoom/ImageZoom';
import styles from './ProductGallery.module.css';

const ProductGallery = () => {
    const [activeImage, setActiveImage] = useState(0);
    const [isZoomOpen, setIsZoomOpen] = useState(false);
    const images = [
        '/images/product/main.jpg',
        '/images/product/in-shoe.jpg',
        '/images/product/recharge.jpg'
    ];

    return (
        <div className={styles.gallery}>
            <div className={styles.mainImage} onClick={() => setIsZoomOpen(true)}>
                <div className={styles.placeholder}>
                    <span>Product Image (Click to zoom)</span>
                </div>
            </div>
            <div className={styles.thumbs}>
                {images.map((_, i) => (
                    <button
                        key={i}
                        className={`${styles.thumb} ${activeImage === i ? styles.active : ''}`}
                        onClick={() => setActiveImage(i)}
                    >
                        <div className={styles.placeholderThumb}></div>
                    </button>
                ))}
            </div>

            <ImageZoom
                isOpen={isZoomOpen}
                onClose={() => setIsZoomOpen(false)}
                imageUrl={images[activeImage]}
                altText="SneakerFresh Product Image"
            />
        </div>
    );
};

export default ProductGallery;
