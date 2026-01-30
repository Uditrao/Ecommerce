import React, { useState } from 'react';
import Input from '../components/common/Input/Input';
import Button from '../components/common/Button/Button';
import styles from './Contact.module.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In production, this would send to an API
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className={`${styles.contact} container section-padding`}>
                <div className={styles.success}>
                    <h2>Message Sent!</h2>
                    <p className="text-muted">Thank you for reaching out. We typically respond within 24 hours.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.contact} container section-padding`}>
            <header className={styles.header}>
                <h1>Get in Touch</h1>
                <p className="text-muted">Have a question? We're here to help.</p>
            </header>

            <div className={styles.grid}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                    <div className={styles.textareaWrapper}>
                        <label className={styles.label}>Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className={styles.textarea}
                            required
                        />
                    </div>
                    <Button type="submit" size="lg" fullWidth>Send Message</Button>
                </form>

                <div className={styles.info}>
                    <div className={styles.infoCard}>
                        <h3>Email</h3>
                        <p>support@sneakerfresh.com</p>
                    </div>
                    <div className={styles.infoCard}>
                        <h3>Response Time</h3>
                        <p>We typically respond within 24 hours on business days.</p>
                    </div>
                    <div className={styles.infoCard}>
                        <h3>FAQ</h3>
                        <p>Check our <a href="/faq">FAQ page</a> for quick answers to common questions.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
