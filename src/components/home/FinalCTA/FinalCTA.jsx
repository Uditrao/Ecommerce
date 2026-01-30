import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import styles from './FinalCTA.module.css';

const FinalCTA = () => {
    return (
        <section className={styles.cta}>
            <div className={`${styles.content} container`}>
                <h2>Ready to Eliminate Sneaker Odor Forever?</h2>
                <p className={styles.subtitle}>
                    Join 50,000+ customers who've switched to natural, reusable freshness.
                </p>

                <div className={styles.guarantee}>
                    <ShieldCheck size={24} />
                    <span>30-Day Satisfaction Guarantee - No Questions Asked</span>
                </div>

                <Link to="/product" className={styles.button}>
                    Shop Now - From $24.99
                </Link>

                <p className={styles.micro}>Free carbon-neutral shipping on orders over $50</p>
            </div>
        </section>
    );
};

export default FinalCTA;
