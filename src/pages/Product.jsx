import React from 'react';
import ProductGallery from '../components/product/ProductGallery/ProductGallery';
import ProductInfo from '../components/product/ProductInfo/ProductInfo';
import TrustBadges from '../components/product/TrustBadges/TrustBadges';
import KeyFeatures from '../components/product/KeyFeatures/KeyFeatures';
import HowToUse from '../components/product/HowToUse/HowToUse';
import ProductTabs from '../components/product/ProductTabs/ProductTabs';
import WhyItWorks from '../components/product/WhyItWorks/WhyItWorks';
import ComparisonTable from '../components/product/ComparisonTable/ComparisonTable';
import FAQPreview from '../components/home/FAQPreview/FAQPreview';
import Reviews from '../components/product/Reviews/Reviews';
import styles from './Product.module.css';

const productFaqs = [
    { q: "What size shoes does it fit?", a: "Our packs are designed to fit all shoe sizes from youth to adult XXL. They're flexible and conform to the shoe shape." },
    { q: "Will it damage my shoes?", a: "No. Our packs are completely dry, fragrance-free, and leave no residue. Safe for leather, suede, canvas, mesh, and all synthetic materials." },
    { q: "How do I know when to recharge?", a: "We recommend monthly recharging regardless of use. If you notice reduced effectiveness before a month, an extra sun session will restore power." },
    { q: "Can I use it for other things?", a: "Absolutely! Works great in gym bags, lockers, closets, cars, and anywhere you need natural odor control." }
];

export default function Product() {
    return (
        <>
            {/* Section 1: Above the fold - Gallery + Info */}
            <section className={`${styles.pdp} container section-padding`}>
                <div className={styles.grid}>
                    <ProductGallery />
                    <ProductInfo />
                </div>
            </section>

            {/* Section 2: Trust Badges */}
            <section className="container">
                <TrustBadges variant="horizontal" />
            </section>

            {/* Section 3-9: Product Details */}
            <section className={`${styles.details} container section-padding`}>
                <KeyFeatures />
                <HowToUse />
                <ProductTabs />
                <WhyItWorks />
                <ComparisonTable />
            </section>

            {/* Section 10: Reviews */}
            <section className="container">
                <Reviews />
            </section>

            {/* Section 11: Product FAQ */}
            <FAQPreview
                faqs={productFaqs}
                linkText="View All FAQs"
                linkUrl="/faq"
            />
        </>
    );
}
