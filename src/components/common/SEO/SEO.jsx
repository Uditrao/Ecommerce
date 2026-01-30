import React from 'react';
import { Helmet } from 'react-helmet-async';

/* =====================================================
   SEO COMPONENT
   Dynamic meta tags for each page
   ===================================================== */

const SEO = ({
    title,
    description,
    canonical,
    image = 'https://sneakerfresh.com/og-image.jpg',
    type = 'website',
    noindex = false,
    structuredData = null,
    children
}) => {
    const siteName = 'SneakerFresh';
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const siteUrl = 'https://sneakerfresh.com';
    const canonicalUrl = canonical ? `${siteUrl}${canonical}` : undefined;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            {description && <meta name="description" content={description} />}

            {/* Robots */}
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {/* Canonical URL */}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:image" content={image} />
            {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            {description && <meta name="twitter:description" content={description} />}
            <meta name="twitter:image" content={image} />

            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}

            {children}
        </Helmet>
    );
};

/* =====================================================
   PAGE-SPECIFIC SEO CONFIGS
   ===================================================== */

export const pagesSEO = {
    home: {
        title: 'Natural Shoe Odor Elimination',
        description: 'Eliminate sneaker odor naturally with SneakerFresh. Our volcanic mineral packs last 2+ years, replacing 300+ spray applications. 100% biodegradable.',
        canonical: '/'
    },
    product: {
        title: 'SneakerFresh Odor Pack',
        description: 'Natural odor elimination for sneakers. Volcanic minerals and bamboo charcoal absorb moisture and neutralize odors. Reusable for 2+ years.',
        canonical: '/product/sneaker-odor-pack',
        type: 'product'
    },
    about: {
        title: 'About Us',
        description: 'Learn about SneakerFresh\'s mission to end toxic shoe care products. Our story, values, and commitment to sustainability.',
        canonical: '/about'
    },
    sustainability: {
        title: 'Sustainability',
        description: 'Our commitment to eco-friendly shoe care. 100% biodegradable materials, carbon-neutral shipping, and zero-waste packaging.',
        canonical: '/sustainability'
    },
    faq: {
        title: 'Frequently Asked Questions',
        description: 'Common questions about SneakerFresh odor packs. How they work, materials, shipping, returns, and more.',
        canonical: '/faq'
    },
    contact: {
        title: 'Contact Us',
        description: 'Get in touch with SneakerFresh support. We typically respond within 24 hours.',
        canonical: '/contact'
    },
    cart: {
        title: 'Your Cart',
        description: 'Review your SneakerFresh cart and proceed to checkout.',
        noindex: true
    },
    checkout: {
        title: 'Checkout',
        noindex: true
    }
};

/* =====================================================
   STRUCTURED DATA GENERATORS
   ===================================================== */

export function generateProductSchema(product) {
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.images,
        "brand": {
            "@type": "Brand",
            "name": "SneakerFresh"
        },
        "offers": {
            "@type": "AggregateOffer",
            "lowPrice": Math.min(...product.variants.map(v => v.price)),
            "highPrice": Math.max(...product.variants.map(v => v.price)),
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "SneakerFresh"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating.average,
            "reviewCount": product.rating.count
        }
    };
}

export function generateBreadcrumbSchema(items) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };
}

export function generateFAQSchema(faqs) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };
}

export default SEO;
