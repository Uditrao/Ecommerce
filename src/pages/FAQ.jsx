import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Accordion from '../components/common/Accordion/Accordion';
import styles from './FAQ.module.css';

const faqData = {
    product: [
        { q: "How does it work?", a: "Our packs contain volcanic minerals and bamboo charcoal that absorb moisture and neutralize odor molecules naturally. Simply insert them into your shoes after wear and they'll do the rest." },
        { q: "How long does a pack last?", a: "With monthly sun recharging, each pack lasts 2+ years or approximately 300+ uses." },
        { q: "Are they safe for all shoe materials?", a: "Yes! Our packs are completely safe for leather, suede, mesh, canvas, and synthetic materials. They're fragrance-free and won't leave any residue." },
        { q: "How long until I notice results?", a: "Most customers notice a significant reduction in odor within 4-8 hours of first use." }
    ],
    shipping: [
        { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days within the US. Express shipping (1-2 days) is available at checkout." },
        { q: "Do you ship internationally?", a: "Yes, we ship to over 40 countries. International shipping typically takes 7-14 business days." },
        { q: "Is shipping free?", a: "Yes! We offer free carbon-neutral shipping on all US orders over $50." }
    ],
    returns: [
        { q: "What's your return policy?", a: "We offer a 30-day satisfaction guarantee. If you're not completely happy, return your unused packs for a full refund." },
        { q: "How do I initiate a return?", a: "Simply email support@sneakerfresh.com with your order number, and we'll send you a prepaid return label." }
    ],
    sustainability: [
        { q: "Are the packs really biodegradable?", a: "Yes, 100%. Our packs are made from natural volcanic minerals and bamboo charcoal wrapped in organic cotton. They can be composted after their 2-year lifespan." },
        { q: "Is your packaging eco-friendly?", a: "Absolutely. We use FSC-certified recycled cardboard with soy-based inks. No plastic anywhere in our supply chain." }
    ]
};

const FAQ = () => {
    const [activeTab, setActiveTab] = useState('product');
    const tabs = ['product', 'shipping', 'returns', 'sustainability'];

    return (
        <div className={`${styles.faq} container section-padding`}>
            <header className={styles.header}>
                <h1>Frequently Asked Questions</h1>
                <p className="text-muted">Find answers to common questions about our products and policies.</p>
            </header>

            <div className={styles.tabs}>
                {tabs.map(tab => (
                    <button
                        key={tab}
                        className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className={styles.questions}>
                {faqData[activeTab].map((faq, i) => (
                    <Accordion key={i} title={faq.q}>
                        {faq.a}
                    </Accordion>
                ))}
            </div>

            <div className={styles.contact}>
                <p>Can't find what you're looking for?</p>
                <a href="/contact" className={styles.contactLink}>Contact Support</a>
            </div>
        </div>
    );
};

export default FAQ;
