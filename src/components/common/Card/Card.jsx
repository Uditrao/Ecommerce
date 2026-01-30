import React from 'react';
import styles from './Card.module.css';

const Card = ({
    children,
    variant = 'default',  // 'default' | 'product' | 'info' | 'review' | 'cartItem'
    hoverable = false,
    padding = 'md',       // 'sm' | 'md' | 'lg' | 'none'
    className = '',
    onClick,
    ...props
}) => {
    const classNames = [
        styles.card,
        styles[variant],
        styles[`padding-${padding}`],
        hoverable && styles.hoverable,
        onClick && styles.clickable,
        className
    ].filter(Boolean).join(' ');

    return (
        <div
            className={classNames}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
