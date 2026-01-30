import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import styles from './ReviewsCarousel.module.css';

const reviews = [
    {
        rating: 5,
        text: "I was skeptical at first, but after one night my gym shoes smelled completely fresh. No more embarrassment at the locker room!",
        author: "Mike T.",
        verified: true,
        before: "Threw out shoes every 6 months",
        after: "Same shoes fresh for 2 years"
    },
    {
        rating: 5,
        text: "Finally something that actually works without harsh chemicals. Safe for my kids' shoes and the planet. Win-win!",
        author: "Sarah L.",
        verified: true,
        before: "Used toxic sprays weekly",
        after: "Natural solution that lasts"
    },
    {
        rating: 5,
        text: "As a sneaker collector, protecting my investment is crucial. These packs keep every pair fresh without any residue.",
        author: "James K.",
        verified: true,
        before: "Worried about shoe damage",
        after: "Premium care, zero risk"
    },
    {
        rating: 5,
        text: "The reusability is incredible. One purchase and I'm set for years. Should've bought these sooner!",
        author: "Emily R.",
        verified: true,
        before: "Buying sprays monthly",
        after: "One-time purchase, years of use"
    }
];

const ReviewsCarousel = () => {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % reviews.length);
    const prev = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

    return (
        <section className={`${styles.carousel} section-padding`}>
            <div className="container">
                <h2 className={styles.title}>What Our Customers Say</h2>

                <div className={styles.wrapper}>
                    <button className={styles.navBtn} onClick={prev} aria-label="Previous review">
                        <ChevronLeft size={24} />
                    </button>

                    <div className={styles.cards}>
                        {reviews.map((review, i) => (
                            <div
                                key={i}
                                className={`${styles.card} ${i === current ? styles.active : ''}`}
                                style={{ transform: `translateX(${(i - current) * 110}%)` }}
                            >
                                <div className={styles.stars}>
                                    {[...Array(review.rating)].map((_, j) => (
                                        <Star key={j} size={16} fill="currentColor" />
                                    ))}
                                </div>
                                <p className={styles.text}>"{review.text}"</p>
                                <div className={styles.author}>
                                    <span className={styles.name}>{review.author}</span>
                                    {review.verified && <span className={styles.verified}>Verified Buyer</span>}
                                </div>
                                <div className={styles.transformation}>
                                    <div className={styles.before}>
                                        <span className={styles.label}>Before</span>
                                        <span>{review.before}</span>
                                    </div>
                                    <div className={styles.arrow}>→</div>
                                    <div className={styles.after}>
                                        <span className={styles.label}>After</span>
                                        <span>{review.after}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className={styles.navBtn} onClick={next} aria-label="Next review">
                        <ChevronRight size={24} />
                    </button>
                </div>

                <div className={styles.dots}>
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            className={`${styles.dot} ${i === current ? styles.activeDot : ''}`}
                            onClick={() => setCurrent(i)}
                            aria-label={`Go to review ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewsCarousel;
