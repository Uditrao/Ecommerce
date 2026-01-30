import React from 'react';
import styles from './Loader.module.css';

const Skeleton = ({
    variant = 'text',  // 'text' | 'title' | 'avatar' | 'thumbnail' | 'button'
    width,
    height,
    className = '',
    count = 1
}) => {
    const style = {};
    if (width) style.width = width;
    if (height) style.height = height;

    const classNames = [
        styles.skeleton,
        styles[`skeleton-${variant}`],
        className
    ].filter(Boolean).join(' ');

    if (count > 1) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {[...Array(count)].map((_, i) => (
                    <div key={i} className={classNames} style={style} />
                ))}
            </div>
        );
    }

    return <div className={classNames} style={style} />;
};

export default Skeleton;
