import { useMemo, useCallback, useRef, useEffect, useState } from 'react';

/* =====================================================
   PERFORMANCE UTILITIES
   Memoization, virtualization, throttle, debounce
   ===================================================== */

/**
 * Throttle Hook
 * Limits function execution to once per interval
 */
export function useThrottle(callback, delay = 100) {
    const lastRan = useRef(Date.now());
    const timeoutRef = useRef(null);

    const throttledFn = useCallback((...args) => {
        const now = Date.now();

        if (now - lastRan.current >= delay) {
            callback(...args);
            lastRan.current = now;
        } else {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                callback(...args);
                lastRan.current = Date.now();
            }, delay - (now - lastRan.current));
        }
    }, [callback, delay]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return throttledFn;
}

/**
 * Debounce Hook
 * Delays function execution until after wait period
 */
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

/**
 * Debounced Callback Hook
 * Returns a debounced version of the callback
 */
export function useDebouncedCallback(callback, delay = 300) {
    const timeoutRef = useRef(null);

    const debouncedFn = useCallback((...args) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return debouncedFn;
}

/**
 * Memoized Cart Totals
 * Calculates cart totals efficiently
 */
export function useCartTotals(items, promoDiscount = 0, shippingCost = 0, taxRate = 0) {
    return useMemo(() => {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = promoDiscount;
        const afterDiscount = subtotal - discount;
        const tax = afterDiscount * taxRate;
        const shipping = subtotal >= 50 ? 0 : shippingCost;
        const total = afterDiscount + tax + shipping;

        return {
            subtotal,
            discount,
            shipping,
            tax,
            total,
            itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
            freeShippingEligible: subtotal >= 50,
            amountToFreeShipping: Math.max(0, 50 - subtotal)
        };
    }, [items, promoDiscount, shippingCost, taxRate]);
}

/**
 * Intersection Observer Hook
 * For lazy loading and infinite scroll
 */
export function useIntersectionObserver(options = {}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [hasIntersected, setHasIntersected] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
                if (entry.isIntersecting && !hasIntersected) {
                    setHasIntersected(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '100px',
                ...options
            }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [options, hasIntersected]);

    return { ref: elementRef, isIntersecting, hasIntersected };
}

/**
 * Virtual List Hook (Simple)
 * For rendering large lists efficiently
 */
export function useVirtualList(items, itemHeight, containerHeight, overscan = 3) {
    const [scrollTop, setScrollTop] = useState(0);

    const { startIndex, endIndex, virtualItems, totalHeight } = useMemo(() => {
        const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
        const visibleCount = Math.ceil(containerHeight / itemHeight);
        const endIndex = Math.min(items.length - 1, startIndex + visibleCount + overscan * 2);

        const virtualItems = [];
        for (let i = startIndex; i <= endIndex; i++) {
            virtualItems.push({
                index: i,
                item: items[i],
                style: {
                    position: 'absolute',
                    top: i * itemHeight,
                    height: itemHeight,
                    left: 0,
                    right: 0
                }
            });
        }

        return {
            startIndex,
            endIndex,
            virtualItems,
            totalHeight: items.length * itemHeight
        };
    }, [items, itemHeight, containerHeight, scrollTop, overscan]);

    const handleScroll = useCallback((e) => {
        setScrollTop(e.currentTarget.scrollTop);
    }, []);

    return {
        virtualItems,
        totalHeight,
        handleScroll,
        startIndex,
        endIndex
    };
}

/**
 * Prefetch Hook
 * Prefetches resources on hover
 */
export function usePrefetch(url, type = 'fetch') {
    const prefetched = useRef(new Set());

    const prefetch = useCallback(() => {
        if (!url || prefetched.current.has(url)) return;
        prefetched.current.add(url);

        if (type === 'fetch') {
            fetch(url, { method: 'GET', mode: 'no-cors' }).catch(() => { });
        } else if (type === 'link') {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        }
    }, [url, type]);

    return prefetch;
}

/**
 * Preload Image Hook
 */
export function usePreloadImage(src) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!src) return;

        const img = new Image();
        img.onload = () => setIsLoaded(true);
        img.src = src;
    }, [src]);

    return isLoaded;
}

/**
 * RequestIdleCallback polyfill hook
 * Schedules work during browser idle time
 */
export function useIdleCallback(callback, deps = []) {
    useEffect(() => {
        let id;

        if ('requestIdleCallback' in window) {
            id = window.requestIdleCallback(callback);
        } else {
            id = setTimeout(callback, 1);
        }

        return () => {
            if ('cancelIdleCallback' in window) {
                window.cancelIdleCallback(id);
            } else {
                clearTimeout(id);
            }
        };
    }, deps);
}

/**
 * Memory Cache
 * Simple in-memory cache with TTL
 */
export class MemoryCache {
    constructor(ttl = 5 * 60 * 1000) {
        this.cache = new Map();
        this.ttl = ttl;
    }

    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() - item.timestamp > this.ttl) {
            this.cache.delete(key);
            return null;
        }

        return item.data;
    }

    set(key, data) {
        this.cache.set(key, { data, timestamp: Date.now() });
    }

    delete(key) {
        this.cache.delete(key);
    }

    clear() {
        this.cache.clear();
    }
}

// Export singleton cache instance
export const cache = new MemoryCache();
