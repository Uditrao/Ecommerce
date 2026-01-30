import React from 'react';
import styles from './Input.module.css';

const Input = ({
    label,
    error,
    helperText,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
    fullWidth = true,
    className = '',
    ...props
}) => {
    const inputId = name || `input-${Math.random().toString(36).substr(2, 9)}`;

    const wrapperClasses = [
        styles.wrapper,
        error && styles.hasError,
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={wrapperClasses}>
            {label && (
                <label htmlFor={inputId} className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}
            <input
                id={inputId}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={styles.input}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
                {...props}
            />
            {error && (
                <span id={`${inputId}-error`} className={styles.error} role="alert">
                    {error}
                </span>
            )}
            {!error && helperText && (
                <span id={`${inputId}-helper`} className={styles.helper}>
                    {helperText}
                </span>
            )}
        </div>
    );
};

export default Input;
