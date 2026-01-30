import React from 'react';
import styles from './HowToUse.module.css';

const steps = [
    { num: 1, title: 'Insert', desc: 'Place one pack in each shoe after wearing', time: '5 seconds' },
    { num: 2, title: 'Wait', desc: 'Let the minerals absorb moisture and odor', time: '4-8 hours' },
    { num: 3, title: 'Enjoy', desc: 'Your shoes are fresh and ready to wear again', time: 'Repeat daily' }
];

const HowToUse = () => {
    return (
        <section className={styles.howToUse}>
            <h3 className={styles.title}>How to Use</h3>
            <div className={styles.steps}>
                {steps.map((step, i) => (
                    <div key={i} className={styles.step}>
                        <div className={styles.num}>{step.num}</div>
                        <div className={styles.content}>
                            <span className={styles.stepTitle}>{step.title}</span>
                            <p className={styles.desc}>{step.desc}</p>
                            <span className={styles.time}>{step.time}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.recharge}>
                <strong>Monthly recharge:</strong> Place in direct sunlight for 1-2 hours to restore full absorption power.
            </div>
        </section>
    );
};

export default HowToUse;
