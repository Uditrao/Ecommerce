import React from 'react';
import styles from './Badge.module.css';

const Badge = ({
    children,
    variant = 'default',  // 'default' | 'success' | 'error' | 'warning' | 'info' | 'sale' | 'mint'
    size = 'md',          // 'sm' | 'md'
    className = '',
    ...props
}) => {
    const classNames = [
        styles.badge,
        styles[variant],
        styles[size],
        className
    ].filter(Boolean).join(' ');

    return (
        <span className={classNames} {...props}>
            {children}
        </span>
    );
};

export default Badge;
