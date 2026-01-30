import { useState, useEffect, useCallback, useRef } from 'react';
import { productApi, reviewsApi } from '../services/api';

/* =====================================================
   CUSTOM HOOKS FOR DATA FETCHING
   Simple cache + loading/error states
   ===================================================== */

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCached(key) {
    const item = cache.get(key);
    if (!item) return null;
    if (Date.now() - item.timestamp > CACHE_DURATION) {
        cache.delete(key);
        return null;
    }
    return item.data;
}

function setCache(key, data) {
    cache.set(key, { data, timestamp: Date.now() });
}

/* =====================================================
   useProduct - Fetch single product
   ===================================================== */

export function useProduct(productId) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!productId) return;

        const cacheKey = `product:${productId}`;
        const cached = getCached(cacheKey);

        if (cached) {
            setData(cached);
            setIsLoading(false);
            return;
        }

        let cancelled = false;

        async function fetchProduct() {
            setIsLoading(true);
            setError(null);

            try {
                const product = await productApi.getProduct(productId);
                if (!cancelled) {
                    setData(product);
                    setCache(cacheKey, product);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || 'Failed to load product');
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        }

        fetchProduct();

        return () => { cancelled = true; };
    }, [productId]);

    return { product: data, isLoading, error };
}

/* =====================================================
   useReviews - Fetch paginated reviews
   ===================================================== */

export function useReviews(productId, options = {}) {
    const { sort = 'newest', filter = null } = options;

    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState(null);

    const fetchReviews = useCallback(async (pageNum = 1, reset = false) => {
        if (!productId) return;

        setIsLoading(true);
        setError(null);

        try {
            const result = await reviewsApi.getReviews({
                productId,
                page: pageNum,
                sort,
                filter
            });

            setReviews(prev => reset ? result.reviews : [...prev, ...result.reviews]);
            setHasMore(result.hasMore);
            setStats(result.stats);
            setPage(pageNum);
        } catch (err) {
            setError(err.message || 'Failed to load reviews');
        } finally {
            setIsLoading(false);
        }
    }, [productId, sort, filter]);

    // Initial load
    useEffect(() => {
        fetchReviews(1, true);
    }, [fetchReviews]);

    // Load more
    const loadMore = useCallback(() => {
        if (!isLoading && hasMore) {
            fetchReviews(page + 1, false);
        }
    }, [fetchReviews, page, isLoading, hasMore]);

    // Refetch (e.g., after filter change)
    const refetch = useCallback(() => {
        fetchReviews(1, true);
    }, [fetchReviews]);

    return {
        reviews,
        stats,
        isLoading,
        error,
        hasMore,
        loadMore,
        refetch
    };
}

/* =====================================================
   useProductState - Local state for product page
   ===================================================== */

export function useProductState(product) {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState('specs');
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    // Set default variant when product loads
    useEffect(() => {
        if (product?.variants?.length && !selectedVariant) {
            setSelectedVariant(product.variants[0].id);
        }
    }, [product, selectedVariant]);

    // Get current variant data
    const currentVariant = product?.variants?.find(v => v.id === selectedVariant);
    const price = currentVariant?.price || 0;
    const inStock = currentVariant?.inStock !== false;

    // Quantity controls
    const incrementQuantity = () => setQuantity(q => q + 1);
    const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

    return {
        // State
        selectedVariant,
        quantity,
        activeImage,
        activeTab,
        isAddingToCart,

        // Derived
        currentVariant,
        price,
        inStock,

        // Actions
        setSelectedVariant,
        setQuantity,
        incrementQuantity,
        decrementQuantity,
        setActiveImage,
        setActiveTab,
        setIsAddingToCart
    };
}

/* =====================================================
   useLocalStorage - Persist state to localStorage
   ===================================================== */

export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = useCallback((value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error('localStorage error:', error);
        }
    }, [key, storedValue]);

    return [storedValue, setValue];
}

/* =====================================================
   useDebounce - Debounce a value
   ===================================================== */

export function useDebounce(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

/* =====================================================
   useAsync - Generic async action handler
   ===================================================== */

export function useAsync(asyncFn, immediate = false) {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const execute = useCallback(async (...args) => {
        setStatus('pending');
        setError(null);

        try {
            const result = await asyncFn(...args);
            setData(result);
            setStatus('success');
            return result;
        } catch (err) {
            setError(err);
            setStatus('error');
            throw err;
        }
    }, [asyncFn]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return {
        execute,
        status,
        data,
        error,
        isLoading: status === 'pending',
        isSuccess: status === 'success',
        isError: status === 'error'
    };
}
