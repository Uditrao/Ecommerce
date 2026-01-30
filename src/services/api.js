/* =====================================================
   API SERVICE LAYER
   Centralized API calls with error handling
   ===================================================== */

const API_BASE = '/api';
const USE_MOCK = true; // Set to true for frontend-only demo

// Mock data and handlers
const mockState = {
    users: JSON.parse(localStorage.getItem('sf_mock_users') || '[]'),
    currentUser: JSON.parse(localStorage.getItem('sf_mock_user') || 'null'),
    orders: JSON.parse(localStorage.getItem('sf_mock_orders') || '[]')
};

const mockHandlers = {
    '/auth/session': () => ({ user: mockState.currentUser }),

    '/auth/login': (body) => {
        const user = mockState.users.find(u => u.email === body.email && u.password === body.password);
        if (!user) {
            throw { status: 401, message: 'Invalid email or password' };
        }
        mockState.currentUser = { firstName: user.firstName, lastName: user.lastName, email: user.email };
        localStorage.setItem('sf_mock_user', JSON.stringify(mockState.currentUser));
        return { user: mockState.currentUser };
    },

    '/auth/register': (body) => {
        if (mockState.users.some(u => u.email === body.email)) {
            throw { status: 400, message: 'Email already registered' };
        }
        const newUser = { ...body };
        mockState.users.push(newUser);
        localStorage.setItem('sf_mock_users', JSON.stringify(mockState.users));

        mockState.currentUser = { firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email };
        localStorage.setItem('sf_mock_user', JSON.stringify(mockState.currentUser));
        return { user: mockState.currentUser };
    },

    '/auth/logout': () => {
        mockState.currentUser = null;
        localStorage.removeItem('sf_mock_user');
        return { success: true };
    },

    '/orders': (body) => {
        const order = { ...body, id: 'SF-' + Date.now().toString().slice(-6), date: new Date().toISOString() };
        mockState.orders.push(order);
        localStorage.setItem('sf_mock_orders', JSON.stringify(mockState.orders));
        return { success: true, order };
    }
};

// Helper to handle API responses
async function handleResponse(response) {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));

        // Handle specific error codes
        if (response.status === 401) {
            // Session expired - dispatch event for global handling
            window.dispatchEvent(new CustomEvent('auth:expired'));
        }

        throw {
            status: response.status,
            message: error.message || 'An error occurred',
            errors: error.errors || null
        };
    }

    return response.json();
}

// Base fetch with credentials
async function apiFetch(endpoint, options = {}) {
    if (USE_MOCK && mockHandlers[endpoint]) {
        console.log(`[MOCK API] ${options.method || 'GET'} ${endpoint}`, options.body ? JSON.parse(options.body) : '');
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const result = mockHandlers[endpoint](options.body ? JSON.parse(options.body) : null);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }, 500); // Simulate network latency
        });
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });

    return handleResponse(response);
}

/* =====================================================
   PRODUCT API
   ===================================================== */

export const productApi = {
    // Get product by ID
    getProduct: (id) => apiFetch(`/products/${id}`),

    // Get all products (for catalog)
    getProducts: (params = {}) => {
        const query = new URLSearchParams(params).toString();
        return apiFetch(`/products${query ? `?${query}` : ''}`);
    }
};

/* =====================================================
   REVIEWS API
   ===================================================== */

export const reviewsApi = {
    // Get reviews for a product
    getReviews: ({ productId, page = 1, sort = 'newest', filter = null }) => {
        const params = new URLSearchParams({ productId, page, sort });
        if (filter) params.append('rating', filter);
        return apiFetch(`/reviews?${params.toString()}`);
    },

    // Submit a review
    createReview: (data) => apiFetch('/reviews', {
        method: 'POST',
        body: JSON.stringify(data)
    })
};

/* =====================================================
   CART API
   ===================================================== */

export const cartApi = {
    // Get current cart
    getCart: () => apiFetch('/cart'),

    // Add item to cart
    addItem: ({ productId, variantId, quantity }) => apiFetch('/cart/items', {
        method: 'POST',
        body: JSON.stringify({ productId, variantId, quantity })
    }),

    // Update item quantity
    updateQuantity: (itemId, quantity) => apiFetch(`/cart/items/${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity })
    }),

    // Remove item from cart
    removeItem: (itemId) => apiFetch(`/cart/items/${itemId}`, {
        method: 'DELETE'
    }),

    // Apply promo code
    applyPromo: (code) => apiFetch('/cart/promo', {
        method: 'POST',
        body: JSON.stringify({ code })
    }),

    // Remove promo code
    removePromo: () => apiFetch('/cart/promo', {
        method: 'DELETE'
    })
};

/* =====================================================
   CHECKOUT API
   ===================================================== */

export const checkoutApi = {
    // Validate cart before checkout
    validateCart: () => apiFetch('/checkout/validate'),

    // Calculate shipping rates
    getShippingRates: (address) => apiFetch('/checkout/shipping-rates', {
        method: 'POST',
        body: JSON.stringify(address)
    }),

    // Calculate tax
    calculateTax: (address) => apiFetch('/checkout/calculate-tax', {
        method: 'POST',
        body: JSON.stringify(address)
    }),

    // Create order
    createOrder: (orderData) => apiFetch('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
    })
};

/* =====================================================
   AUTH API
   ===================================================== */

export const authApi = {
    // Validate current session
    getSession: () => apiFetch('/auth/session'),

    // Login
    login: (credentials) => apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
    }),

    // Register
    register: (userData) => apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
    }),

    // Logout
    logout: () => apiFetch('/auth/logout', {
        method: 'POST'
    }),

    // Password reset request
    requestPasswordReset: (email) => apiFetch('/auth/password-reset', {
        method: 'POST',
        body: JSON.stringify({ email })
    })
};

/* =====================================================
   USER API
   ===================================================== */

export const userApi = {
    // Get user profile
    getProfile: () => apiFetch('/user/profile'),

    // Update profile
    updateProfile: (data) => apiFetch('/user/profile', {
        method: 'PATCH',
        body: JSON.stringify(data)
    }),

    // Get saved addresses
    getAddresses: () => apiFetch('/user/addresses'),

    // Save address
    saveAddress: (address) => apiFetch('/user/addresses', {
        method: 'POST',
        body: JSON.stringify(address)
    })
};

export default {
    product: productApi,
    reviews: reviewsApi,
    cart: cartApi,
    checkout: checkoutApi,
    auth: authApi,
    user: userApi
};
