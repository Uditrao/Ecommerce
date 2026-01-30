import React from 'react';
import Hero from '../components/home/Hero/Hero';
import SocialProofBar from '../components/home/SocialProofBar/SocialProofBar';
import ProductShowcase from '../components/home/ProductShowcase/ProductShowcase';
import HowItWorks from '../components/home/HowItWorks/HowItWorks';
import ValueProps from '../components/home/ValueProps/ValueProps';
import ReviewsCarousel from '../components/home/ReviewsCarousel/ReviewsCarousel';
import FAQPreview from '../components/home/FAQPreview/FAQPreview';
import FinalCTA from '../components/home/FinalCTA/FinalCTA';

export default function Home() {
    return (
        <>
            {/* Section 1: Hero - Immediate value prop */}
            <Hero />

            {/* Section 2: Social Proof Bar - Build instant credibility */}
            <SocialProofBar />

            {/* Section 3: Product Showcase - Show what they're buying */}
            <ProductShowcase />

            {/* Section 4: How It Works - Remove friction */}
            <HowItWorks />

            {/* Section 5: Value Props - Address objections */}
            <ValueProps />

            {/* Section 6: Reviews Carousel - Third-party validation */}
            <ReviewsCarousel />

            {/* Section 7: FAQ Preview - Answer purchase blockers */}
            <FAQPreview />

            {/* Section 8: Final CTA - Last conversion opportunity */}
            <FinalCTA />
        </>
    );
}
