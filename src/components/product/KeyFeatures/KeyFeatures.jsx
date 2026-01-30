import React from 'react';
import { Leaf, Zap, Timer, Recycle, Shield } from 'lucide-react';
import styles from './KeyFeatures.module.css';

const features = [
    { icon: Leaf, title: '100% Natural', desc: 'Volcanic minerals + bamboo charcoal, no chemicals' },
    { icon: Zap, title: 'Fast Acting', desc: 'Noticeable results in 4-8 hours' },
    { icon: Timer, title: 'Long Lasting', desc: '2+ years of use with monthly recharging' },
    { icon: Recycle, title: 'Fully Biodegradable', desc: 'Compostable after end of life' },
    { icon: Shield, title: 'Safe for All Materials', desc: 'Leather, suede, mesh, canvas, synthetics' }
];

const KeyFeatures = () => {
    return (
        <section className={styles.features}>
            <h3 className={styles.title}>Key Features</h3>
            <div className={styles.grid}>
                {features.map((f, i) => (
                    <div key={i} className={styles.feature}>
                        <f.icon size={24} className={styles.icon} />
                        <div className={styles.content}>
                            <span className={styles.name}>{f.title}</span>
                            <span className={styles.desc}>{f.desc}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default KeyFeatures;
