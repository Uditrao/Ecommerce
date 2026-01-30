import React from 'react';
import { Star } from 'lucide-react';
import styles from './Rating.module.css';

const Rating = ({
    value,
    maxStars = 5,
    size = 'md',
    interactive = false,
    onChange
}) => {
    const sizes = { sm: 12, md: 16, lg: 20 };
    const starSize = sizes[size];

    return (
        <div className={styles.rating}>
            {[...Array(maxStars)].map((_, i) => (
                <button
                    key={i}
                    type="button"
                    className={`${styles.star} ${i < value ? styles.filled : ''}`}
                    onClick={() => interactive && onChange?.(i + 1)}
                    disabled={!interactive}
                >
                    <Star size={starSize} fill={i < value ? 'currentColor' : 'none'} />
                </button>
            ))}
        </div>
    );
};

export default Rating;
