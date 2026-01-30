import React, { useEffect, useRef, useCallback } from 'react';

/* =====================================================
   ACCESSIBILITY UTILITIES
   Focus management, announcements, skip links
   ===================================================== */

/**
 * Skip Link Component
 * Renders accessible skip navigation links
 */
export function SkipLinks() {
    return (
        <div className="skip-links">
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            <a href="#navigation" className="skip-link">
                Skip to navigation
            </a>
            <a href="#footer" className="skip-link">
                Skip to footer
            </a>
        </div>
    );
}

/**
 * Live Region for Screen Reader Announcements
 */
export function LiveRegion({
    message,
    politeness = 'polite', // 'polite' | 'assertive'
    clearAfter = 5000
}) {
    const regionRef = useRef(null);

    useEffect(() => {
        if (message && regionRef.current) {
            regionRef.current.textContent = message;

            if (clearAfter) {
                const timer = setTimeout(() => {
                    if (regionRef.current) {
                        regionRef.current.textContent = '';
                    }
                }, clearAfter);
                return () => clearTimeout(timer);
            }
        }
    }, [message, clearAfter]);

    return (
        <div
            ref={regionRef}
            role="status"
            aria-live={politeness}
            aria-atomic="true"
            className="sr-only"
        />
    );
}

/**
 * Visually Hidden Component
 * Content visible only to screen readers
 */
export function VisuallyHidden({ children, as: Component = 'span' }) {
    return (
        <Component className="sr-only">
            {children}
        </Component>
    );
}

/**
 * Focus Trap Hook
 * Traps focus within a container (for modals, drawers)
 */
export function useFocusTrap(isActive = true) {
    const containerRef = useRef(null);
    const previousActiveElement = useRef(null);

    useEffect(() => {
        if (!isActive) return;

        const container = containerRef.current;
        if (!container) return;

        // Store previously focused element
        previousActiveElement.current = document.activeElement;

        // Get focusable elements
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Focus first element
        if (firstElement) {
            firstElement.focus();
        }

        // Handle tab key
        const handleKeyDown = (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        container.addEventListener('keydown', handleKeyDown);

        return () => {
            container.removeEventListener('keydown', handleKeyDown);
            // Restore focus to previous element
            if (previousActiveElement.current) {
                previousActiveElement.current.focus();
            }
        };
    }, [isActive]);

    return containerRef;
}

/**
 * Escape Key Hook
 * Calls handler when Escape is pressed
 */
export function useEscapeKey(handler, isActive = true) {
    useEffect(() => {
        if (!isActive) return;

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                handler();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [handler, isActive]);
}

/**
 * Focus on Mount Hook
 * Focuses an element when component mounts
 */
export function useFocusOnMount(shouldFocus = true) {
    const elementRef = useRef(null);

    useEffect(() => {
        if (shouldFocus && elementRef.current) {
            elementRef.current.focus();
        }
    }, [shouldFocus]);

    return elementRef;
}

/**
 * Announce to Screen Readers
 * Utility function for programmatic announcements
 */
export function announceToScreenReader(message, politeness = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', politeness);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

/**
 * Use Reduced Motion Hook
 * Respects user's motion preferences
 */
export function useReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (e) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return prefersReducedMotion;
}

/**
 * Keyboard Navigation Hook
 * Handles arrow key navigation for lists
 */
export function useArrowNavigation(items, onSelect) {
    const [focusedIndex, setFocusedIndex] = React.useState(0);

    const handleKeyDown = useCallback((e) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setFocusedIndex((prev) => (prev + 1) % items.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIndex((prev) => (prev - 1 + items.length) % items.length);
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                onSelect?.(items[focusedIndex], focusedIndex);
                break;
            case 'Home':
                e.preventDefault();
                setFocusedIndex(0);
                break;
            case 'End':
                e.preventDefault();
                setFocusedIndex(items.length - 1);
                break;
            default:
                break;
        }
    }, [items, focusedIndex, onSelect]);

    return { focusedIndex, setFocusedIndex, handleKeyDown };
}
