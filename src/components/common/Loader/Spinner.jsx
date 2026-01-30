import React from 'react';
import styles from './Loader.module.css';

const Spinner = ({
    size = 'md',  // 'sm' | 'md' | 'lg'
    color = 'primary',  // 'primary' | 'white' | 'muted'
    className = ''
}) => {
    const classNames = [
        styles.spinner,
        styles[`spinner-${size}`],
        styles[`spinner-${color}`],
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classNames} role="status" aria-label="Loading">
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Spinner;
