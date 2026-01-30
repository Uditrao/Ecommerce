import React, { useState } from 'react';
import { Star, User, ThumbsUp, MoreHorizontal } from 'lucide-react';
import styles from './Reviews.module.css';

const Reviews = () => {
    const [filter, setFilter] = useState('newest');

    const reviews = [
        {
            id: 1,
            user: 'Alex Rivera',
            rating: 5,
            date: 'Jan 12, 2024',
            title: 'Incredible comfort',
            comment: 'I\'ve been using SneakerFresh for a month now. The comfort is unlike anything else. My feet feel fresh even after a 10-hour shift.',
            likes: 12
        },
        {
            id: 2,
            user: 'Sarah Jenkins',
            rating: 4,
            date: 'Jan 8, 2024',
            title: 'Great but simple',
            comment: 'Love the sustainability aspect. They look great and are very breathable. Only downside is I wish there were more color options.',
            likes: 8
        },
        {
            id: 3,
            user: 'Michael Chen',
            rating: 5,
            date: 'Jan 3, 2024',
            title: 'Worth every penny',
            comment: 'Premium feel, great support, and they look even better in person. The carbon-neutral shipping was a big plus for me.',
            likes: 15
        }
    ];

    const stats = {
        average: 4.8,
        total: 124,
        breakdown: [
            { stars: 5, count: 85 },
            { stars: 4, count: 28 },
            { stars: 3, count: 6 },
            { stars: 2, count: 3 },
            { stars: 1, count: 2 }
        ]
    };

    return (
        <section className={styles.reviewsSection} id="reviews">
            <div className={styles.header}>
                <div className={styles.ratingOverview}>
                    <div className={styles.averageContainer}>
                        <span className={styles.averageValue}>{stats.average}</span>
                        <div className={styles.starDisplay}>
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={18}
                                    fill={i < Math.floor(stats.average) ? 'currentColor' : 'none'}
                                    className={i < Math.floor(stats.average) ? styles.starFilled : styles.starEmpty}
                                />
                            ))}
                        </div>
                    </div>
                    <p className={styles.totalReviews}>Based on {stats.total} reviews</p>
                </div>

                <div className={styles.ratingBars}>
                    {stats.breakdown.map((item) => (
                        <div key={item.stars} className={styles.barRow}>
                            <span className={styles.starLabel}>{item.stars} <Star size={12} fill="currentColor" /></span>
                            <div className={styles.barTrack}>
                                <div
                                    className={styles.barFill}
                                    style={{ width: `${(item.count / stats.total) * 100}%` }}
                                />
                            </div>
                            <span className={styles.countText}>{item.count}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.reviewAction}>
                    <button className={styles.writeButton}>Write a Review</button>
                    <div className={styles.sortWrapper}>
                        <label>Sort by:</label>
                        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value="newest">Newest</option>
                            <option value="highest">Highest Rating</option>
                            <option value="lowest">Lowest Rating</option>
                            <option value="helpful">Most Helpful</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className={styles.reviewsList}>
                {reviews.map((review) => (
                    <div key={review.id} className={styles.reviewCard}>
                        <div className={styles.reviewHeader}>
                            <div className={styles.userInfo}>
                                <div className={styles.userAvatar}>
                                    <User size={20} />
                                </div>
                                <div className={styles.userDetails}>
                                    <h3>{review.user}</h3>
                                    <div className={styles.userRating}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={14}
                                                fill={i < review.rating ? 'currentColor' : 'none'}
                                                className={i < review.rating ? styles.starFilled : styles.starEmpty}
                                            />
                                        ))}
                                        <span className={styles.reviewDate}>{review.date}</span>
                                    </div>
                                </div>
                            </div>
                            <button className={styles.moreAction}>
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        <div className={styles.reviewBody}>
                            <h4 className={styles.reviewTitle}>{review.title}</h4>
                            <p className={styles.reviewComment}>{review.comment}</p>
                        </div>

                        <div className={styles.reviewFooter}>
                            <button className={styles.likeButton}>
                                <ThumbsUp size={16} />
                                Helpful ({review.likes})
                            </button>
                            <button className={styles.reportButton}>Report</button>
                        </div>
                    </div>
                ))}
            </div>

            <button className={styles.viewMoreBtn}>View All Reviews</button>
        </section>
    );
};

export default Reviews;
