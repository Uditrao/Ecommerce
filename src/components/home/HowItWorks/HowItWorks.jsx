import React from 'react';
import styles from './HowItWorks.module.css';

const steps = [
    {
        number: "01",
        title: "Insert",
        description: "Slide the pack into your sneakers after each wear."
    },
    {
        number: "02",
        title: "Wait",
        description: "Natural minerals absorb moisture and odor overnight."
    },
    {
        number: "03",
        title: "Fresh",
        description: "Ready to wear by morning. No sprays, no residue."
    }
];

const HowItWorks = () => {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <h2>Simple. Sustainable. Effective.</h2>
                    <p className="text-muted">Three steps to endless freshness.</p>
                </div>

                <div className={styles.grid}>
                    {steps.map((s, i) => (
                        <div key={i} className={styles.step}>
                            <span className={styles.number}>{s.number}</span>
                            <h3>{s.title}</h3>
                            <p className="text-muted">{s.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
