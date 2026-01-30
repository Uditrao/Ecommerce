import React from 'react';
import { Star, Users, Package } from 'lucide-react';
import styles from './SocialProofBar.module.css';

const stats = [
    { icon: Star, value: '4.9', label: 'Average Rating', suffix: '/5' },
    { icon: Users, value: '50,000+', label: 'Happy Customers' },
    { icon: Package, value: '300+', label: 'Reuses Per Pack' }
];

const SocialProofBar = () => {
    return (
        <section className={styles.bar}>
            <div className={`${styles.container} container`}>
                {stats.map((stat, i) => (
                    <div key={i} className={styles.stat}>
                        <stat.icon size={24} className={styles.icon} />
                        <div className={styles.content}>
                            <span className={styles.value}>{stat.value}{stat.suffix}</span>
                            <span className={styles.label}>{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SocialProofBar;
