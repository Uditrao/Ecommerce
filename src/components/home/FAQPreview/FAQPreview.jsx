import React from 'react';
import { Link } from 'react-router-dom';
import Accordion from '../../common/Accordion/Accordion';
import styles from './FAQPreview.module.css';

const defaultFaqs = [
    { q: "How long does a pack last?", a: "With monthly sun recharging, each pack lasts 2+ years or approximately 300+ uses." },
    { q: "Are they safe for all shoe materials?", a: "Yes! Completely safe for leather, suede, mesh, canvas, and synthetic materials." },
    { q: "How long until I notice results?", a: "Most customers notice a significant reduction in odor within 4-8 hours of first use." }
];

const FAQPreview = ({
    faqs = defaultFaqs,
    linkText = 'View All FAQs',
    linkUrl = '/faq'
}) => {
    return (
        <section className={`${styles.faqPreview} section-padding`}>
            <div className="container">
                <h2 className={styles.title}>Common Questions</h2>
                <div className={styles.questions}>
                    {faqs.map((faq, i) => (
                        <Accordion key={i} title={faq.q}>
                            {faq.a}
                        </Accordion>
                    ))}
                </div>
                <div className={styles.link}>
                    <Link to={linkUrl}>{linkText}</Link>
                </div>
            </div>
        </section>
    );
};

export default FAQPreview;
