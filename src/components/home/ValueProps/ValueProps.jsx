import React from 'react';
import { Leaf, Zap, RefreshCw } from 'lucide-react';
import styles from './ValueProps.module.css';

const props = [
    {
        icon: <Leaf />,
        title: "100% Biodegradable",
        description: "Made from mineral-based materials that return to the earth. Zero plastic, zero guilt."
    },
    {
        icon: <Zap />,
        title: "Instant Refresh",
        description: "Advanced moisture-wicking technology neutralizes odor molecules in under 4 hours."
    },
    {
        icon: <RefreshCw />,
        title: "Reuse 300+ Times",
        description: "Recharge in direct sunlight once a month. One pack replaces 20 bottles of spray."
    }
];

const ValueProps = () => {
    return (
        <section className={styles.section}>
            <div className={`${styles.container} container`}>
                {props.map((p, i) => (
                    <div key={i} className={styles.propCard}>
                        <div className={styles.iconWrapper}>{p.icon}</div>
                        <h3>{p.title}</h3>
                        <p className="text-muted">{p.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ValueProps;
