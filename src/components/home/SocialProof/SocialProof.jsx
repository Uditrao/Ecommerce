import React from 'react';
import { Star, Quote } from 'lucide-react';
import styles from './SocialProof.module.css';

const reviews = [
    {
        author: "James L., Professional Runner",
        text: "I've tried every spray on the market. This is the only thing that actually kills the smell instead of just masking it. Plus, it's eco-friendly!",
        rating: 5
    },
    {
        author: "Sarah M., Gym Enthusiast",
        text: "Saving so much money not having to replace my workout shoes every 6 months. These packs are a game changer.",
        rating: 5
    },
    {
        author: "David K., Sneakerhead",
        text: "Keeps my collection fresh without damaging the materials. The fact that it's biodegradable is a huge win.",
        rating: 5
    }
];

const SocialProof = () => {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <h2>Loved by Athletes, Kind to Earth</h2>
                    <div className={styles.summary}>
                        <div className={styles.stars}>
                            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                        </div>
                        <span>4.9/5 Average Rating</span>
                    </div>
                </div>

                <div className={styles.grid}>
                    {reviews.map((r, i) => (
                        <div key={i} className={styles.reviewCard}>
                            <Quote className={styles.quoteIcon} size={24} />
                            <p className={styles.text}>"{r.text}"</p>
                            <div className={styles.author}>
                                <span className={styles.name}>{r.author}</span>
                                <div className={styles.authorStars}>
                                    {[...Array(r.rating)].map((_, j) => <Star key={j} size={12} fill="currentColor" />)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
