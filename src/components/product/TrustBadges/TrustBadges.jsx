import React from 'react';
import { ShieldCheck, Truck, RefreshCcw, Lock } from 'lucide-react';
import styles from './TrustBadges.module.css';

const badges = [
    { icon: Truck, text: 'Free Shipping', subtext: 'On orders over $50' },
    { icon: ShieldCheck, text: 'Lifetime Guarantee', subtext: 'We stand behind our product' },
    { icon: RefreshCcw, text: '30-Day Returns', subtext: 'No questions asked' },
    { icon: Lock, text: 'Secure Checkout', subtext: '256-bit SSL encryption' }
];

const TrustBadges = ({ variant = 'horizontal' }) => {
    return (
        <div className={`${styles.badges} ${styles[variant]}`}>
            {badges.map((badge, i) => (
                <div key={i} className={styles.badge}>
                    <badge.icon size={24} className={styles.icon} />
                    <div className={styles.content}>
                        <span className={styles.text}>{badge.text}</span>
                        <span className={styles.subtext}>{badge.subtext}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TrustBadges;
