import React from 'react';
import Spinner from '../Loader/Spinner';
import styles from './Button.module.css';

const Button = ({
    children,
    variant = 'primary',    // 'primary' | 'secondary' | 'text' | 'icon'
    size = 'md',            // 'sm' | 'md' | 'lg'
    fullWidth = false,
    loading = false,
    disabled = false,
    type = 'button',
    onClick,
    className = '',
    ...props
}) => {
    const classNames = [
        styles.btn,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        loading && styles.loading,
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={classNames}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading && <Spinner size="sm" color={variant === 'primary' ? 'white' : 'primary'} />}
            <span className={loading ? styles.hiddenText : ''}>{children}</span>
        </button>
    );
};

export default Button;
