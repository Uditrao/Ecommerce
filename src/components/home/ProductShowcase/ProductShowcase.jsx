import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Zap, RefreshCcw } from 'lucide-react';
import styles from './ProductShowcase.module.css';

const benefits = [
    { icon: Leaf, text: '100% Natural Ingredients' },
    { icon: Zap, text: 'Works in 4-8 Hours' },
    { icon: RefreshCcw, text: 'Reusable for 2+ Years' }
];

const ProductShowcase = () => {
    return (
        <section className={`${styles.showcase} section-padding`}>
            <div className={`${styles.grid} container`}>
                <div className={styles.imageWrapper}>
                    <div className={styles.image}>
                        <div className={styles.imagePlaceholder}>Product Image</div>
                    </div>
                </div>

                <div className={styles.content}>
                    <span className={styles.tag}>Best Seller</span>
                    <h2>SneakerFresh Odor Pack</h2>
                    <p className={styles.description}>
                        Volcanic minerals and bamboo charcoal that absorb moisture and neutralize odors naturally.
                        No chemicals, no sprays, no hassle.
                    </p>

                    <ul className={styles.benefits}>
                        {benefits.map((b, i) => (
                            <li key={i}>
                                <b.icon size={20} />
                                <span>{b.text}</span>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.priceRow}>
                        <span className={styles.price}>$24.99</span>
                        <span className={styles.perUse}>Less than $0.08/use</span>
                    </div>

                    <Link to="/product" className={styles.cta}>Shop Now</Link>
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;
