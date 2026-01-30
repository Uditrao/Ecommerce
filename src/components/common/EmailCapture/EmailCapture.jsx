import React, { useState } from 'react';
import Button from '../common/Button/Button';
import styles from './EmailCapture.module.css';

const EmailCapture = ({
    placeholder = 'Enter your email',
    ctaText = 'Subscribe',
    successMessage = 'Thanks! Check your inbox for a welcome discount.',
    onSubmit
}) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(email);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className={styles.success}>
                <p>{successMessage}</p>
            </div>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                className={styles.input}
                required
            />
            <Button type="submit" size="md">{ctaText}</Button>
        </form>
    );
};

export default EmailCapture;
