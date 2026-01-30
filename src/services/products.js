/* =====================================================
   PRODUCT DATA
   Mock data matching the API structure
   ===================================================== */

export const PRODUCT_DATA = {
    id: 'sneakerfresh-odor-pack',
    name: 'SneakerFresh Odor Pack',
    tagline: 'Natural odor elimination that lasts 2+ years',
    description: 'Volcanic minerals and bamboo charcoal that absorb moisture and neutralize odors naturally. No chemicals, no sprays, no hassle.',

    images: [
        '/images/product-main.jpg',
        '/images/product-angle.jpg',
        '/images/product-lifestyle.jpg',
        '/images/product-detail.jpg'
    ],

    variants: [
        { id: 'single', name: 'Single Pair', price: 24.99, comparePrice: null, inStock: true },
        { id: 'double', name: '2-Pack', price: 44.99, comparePrice: 49.98, inStock: true },
        { id: 'family', name: 'Family 4-Pack', price: 79.99, comparePrice: 99.96, inStock: true }
    ],

    rating: {
        average: 4.9,
        count: 2847
    },

    badges: ['Best Seller', 'Eco-Friendly'],

    features: [
        { icon: 'Leaf', title: '100% Natural', desc: 'Volcanic minerals + bamboo charcoal, no chemicals' },
        { icon: 'Zap', title: 'Fast Acting', desc: 'Noticeable results in 4-8 hours' },
        { icon: 'Timer', title: 'Long Lasting', desc: '2+ years of use with monthly recharging' },
        { icon: 'Recycle', title: 'Fully Biodegradable', desc: 'Compostable after end of life' },
        { icon: 'Shield', title: 'Safe for All Materials', desc: 'Leather, suede, mesh, canvas, synthetics' }
    ],

    specs: {
        dimensions: '4" x 2.5" x 1" per pack',
        weight: '2 oz per pack',
        coverage: 'One pack per shoe (pair = 2 packs)',
        lifespan: '2+ years with monthly recharging',
        uses: '300+ uses per pack'
    },

    materials: {
        active: 'Volcanic zeolite minerals, moso bamboo charcoal',
        shell: '100% organic cotton, undyed',
        stitching: 'Biodegradable cotton thread',
        packaging: 'FSC-certified recycled cardboard, soy-based inks'
    },

    care: {
        daily: 'Insert in shoes after wearing, remove before wearing',
        recharging: 'Place in direct sunlight for 1-2 hours monthly',
        storage: 'Keep dry when not in use',
        endOfLife: 'Compost or dispose in garden after 2+ years'
    }
};

// Mock reviews data
export const REVIEWS_DATA = {
    stats: {
        average: 4.9,
        count: 2847,
        distribution: {
            5: 2418,
            4: 356,
            3: 54,
            2: 12,
            1: 7
        }
    },
    reviews: [
        {
            id: '1',
            rating: 5,
            title: 'Life changing for my gym shoes!',
            text: "I was skeptical at first, but after one night my gym shoes smelled completely fresh. No more embarrassment at the locker room!",
            author: 'Mike T.',
            verified: true,
            date: '2025-01-15',
            helpful: 47
        },
        {
            id: '2',
            rating: 5,
            title: 'Finally a natural solution',
            text: "Finally something that actually works without harsh chemicals. Safe for my kids' shoes and the planet. Win-win!",
            author: 'Sarah L.',
            verified: true,
            date: '2025-01-10',
            helpful: 32
        },
        {
            id: '3',
            rating: 5,
            title: 'Perfect for sneaker collectors',
            text: "As a sneaker collector, protecting my investment is crucial. These packs keep every pair fresh without any residue.",
            author: 'James K.',
            verified: true,
            date: '2025-01-05',
            helpful: 28
        },
        {
            id: '4',
            rating: 5,
            title: 'Amazing value',
            text: "The reusability is incredible. One purchase and I'm set for years. Should've bought these sooner!",
            author: 'Emily R.',
            verified: true,
            date: '2024-12-28',
            helpful: 21
        },
        {
            id: '5',
            rating: 4,
            title: 'Works great, wish I bought sooner',
            text: "These really do work. Only giving 4 stars because I wish the effects were a bit faster, but overnight is still pretty good.",
            author: 'David M.',
            verified: true,
            date: '2024-12-20',
            helpful: 15
        }
    ]
};

// Upsell products
export const UPSELL_PRODUCTS = [
    {
        id: 'shoe-bag',
        name: 'Travel Shoe Bag',
        price: 19.99,
        image: '/images/shoe-bag.jpg',
        description: 'Keep your shoes protected and organized'
    },
    {
        id: 'brush-set',
        name: 'Premium Brush Set',
        price: 14.99,
        image: '/images/brush-set.jpg',
        description: 'Gentle cleaning for all materials'
    }
];

export default PRODUCT_DATA;
