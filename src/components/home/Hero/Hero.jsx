import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    // Transform scroll progress to x position and rotation
    // x: 0 (initial position) to 500 (move to right edge)
    // rotate: 0 to 360 (full roll)
    const x = useTransform(scrollYProgress, [0, 1], [0, 500]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <section className={styles.hero} ref={targetRef}>
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
                        initial={{ x: 1000, rotate: 360 }} // Start from far right, rotated
                        animate={{ x: 0, rotate: 0 }}      // Move to 0, 0 rotation
                        style={{ x, rotate }}              // Link scroll to these properties
                        transition={{
                            duration: 1.2,
                            ease: [0.34, 1.56, 0.64, 1], // Custom spring-like easing 
                        }}
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
