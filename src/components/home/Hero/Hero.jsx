import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={`${styles.container} container`}>
                <div className={styles.content}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={styles.badge}
                    >
                        <div className={styles.stars}>
                            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                        </div>
                        <span>Trusted by 50,000+ athletes</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className={styles.title}
                    >
                        Eliminate sneaker odor <span className={styles.highlight}>naturally.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={styles.subtitle}
                    >
                        The world's first biodegradable, reusable odor pack. Freshness that lasts 2+ years without the toxic sprays.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className={styles.ctaGroup}
                    >
                        <Link to="/product" className={styles.primaryBtn}>Shop Now - $24.99</Link>
                        <span className={styles.secondaryText}>Reuse 300+ times</span>
                    </motion.div>
                </div>

                <div className={styles.imageWrapper}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={styles.imagePlaceholder}
                    >
                        {/* Placeholder for product image */}
                        <div className={styles.organicShape}></div>
                        <div className={styles.productMockup}>
                            <span>Sneaker Pack</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
