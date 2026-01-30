import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { cartApi } from '../services/api';

/* =====================================================
   CART CONTEXT
   Global state for shopping cart with persistence
   ===================================================== */

const CartContext = createContext(null);

// Storage key for guest cart persistence
const CART_STORAGE_KEY = 'sneakerfresh_cart';

// Initial state
const initialState = {
    items: [],
    promoCode: null,
    promoDiscount: 0,
    isLoading: false,
    error: null,
    itemLoadingStates: {} // Per-item loading states
};

// Action types
const ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_CART: 'SET_CART',
    ADD_ITEM: 'ADD_ITEM',
    UPDATE_ITEM: 'UPDATE_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    SET_ITEM_LOADING: 'SET_ITEM_LOADING',
    APPLY_PROMO: 'APPLY_PROMO',
    REMOVE_PROMO: 'REMOVE_PROMO',
    CLEAR_CART: 'CLEAR_CART'
};

// Reducer
function cartReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_LOADING:
            return { ...state, isLoading: action.payload, error: null };

        case ACTIONS.SET_ERROR:
            return { ...state, isLoading: false, error: action.payload };

        case ACTIONS.SET_CART:
            return {
                ...state,
                items: action.payload.items || [],
                promoCode: action.payload.promoCode || null,
                promoDiscount: action.payload.promoDiscount || 0,
                isLoading: false,
                error: null
            };

        case ACTIONS.ADD_ITEM: {
            const existing = state.items.find(
                item => item.productId === action.payload.productId &&
                    item.variantId === action.payload.variantId
            );

            if (existing) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === existing.id
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    )
                };
            }

            return {
                ...state,
                items: [...state.items, { ...action.payload, id: Date.now().toString() }]
            };
        }

        case ACTIONS.UPDATE_ITEM:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
                itemLoadingStates: {
                    ...state.itemLoadingStates,
                    [action.payload.id]: false
                }
            };

        case ACTIONS.REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
                itemLoadingStates: {
                    ...state.itemLoadingStates,
                    [action.payload]: false
                }
            };

        case ACTIONS.SET_ITEM_LOADING:
            return {
                ...state,
                itemLoadingStates: {
                    ...state.itemLoadingStates,
                    [action.payload.id]: action.payload.loading
                }
            };

        case ACTIONS.APPLY_PROMO:
            return {
                ...state,
                promoCode: action.payload.code,
                promoDiscount: action.payload.discount
            };

        case ACTIONS.REMOVE_PROMO:
            return {
                ...state,
                promoCode: null,
                promoDiscount: 0
            };

        case ACTIONS.CLEAR_CART:
            return { ...initialState };

        default:
            return state;
    }
}

// Provider component
export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Load cart from localStorage on mount (guest users)
    useEffect(() => {
        const loadCart = async () => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });

            try {
                // Try to load from server first (for logged-in users)
                const serverCart = await cartApi.getCart();
                dispatch({ type: ACTIONS.SET_CART, payload: serverCart });
            } catch (error) {
                // Fall back to localStorage for guests
                const stored = localStorage.getItem(CART_STORAGE_KEY);
                if (stored) {
                    try {
                        const localCart = JSON.parse(stored);
                        dispatch({ type: ACTIONS.SET_CART, payload: localCart });
                    } catch (e) {
                        console.error('Failed to parse stored cart:', e);
                    }
                }
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });
            }
        };

        loadCart();
    }, []);

    // Persist cart to localStorage when it changes
    useEffect(() => {
        if (state.items.length > 0 || state.promoCode) {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({
                items: state.items,
                promoCode: state.promoCode,
                promoDiscount: state.promoDiscount
            }));
        } else {
            localStorage.removeItem(CART_STORAGE_KEY);
        }
    }, [state.items, state.promoCode, state.promoDiscount]);

    // Add item to cart
    const addToCart = useCallback(async (product, variantId, quantity = 1) => {
        const variant = product.variants.find(v => v.id === variantId);

        const item = {
            productId: product.id,
            variantId,
            name: product.name,
            image: product.images?.[0] || '',
            variant: variant,
            quantity,
            price: variant.price
        };

        // Optimistic update
        dispatch({ type: ACTIONS.ADD_ITEM, payload: item });

        try {
            // Sync with server
            await cartApi.addItem({
                productId: product.id,
                variantId,
                quantity
            });
        } catch (error) {
            // For now, just keep the optimistic update
            console.error('Failed to sync cart with server:', error);
        }
    }, []);

    // Update item quantity
    const updateQuantity = useCallback(async (itemId, quantity) => {
        if (quantity < 1) return;

        dispatch({ type: ACTIONS.SET_ITEM_LOADING, payload: { id: itemId, loading: true } });

        // Optimistic update
        dispatch({ type: ACTIONS.UPDATE_ITEM, payload: { id: itemId, quantity } });

        try {
            await cartApi.updateQuantity(itemId, quantity);
        } catch (error) {
            // Could rollback here if needed
            console.error('Failed to update quantity:', error);
        }
    }, []);

    // Remove item from cart
    const removeItem = useCallback(async (itemId) => {
        dispatch({ type: ACTIONS.SET_ITEM_LOADING, payload: { id: itemId, loading: true } });

        // Optimistic update
        dispatch({ type: ACTIONS.REMOVE_ITEM, payload: itemId });

        try {
            await cartApi.removeItem(itemId);
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
    }, []);

    // Apply promo code
    const applyPromo = useCallback(async (code) => {
        try {
            const result = await cartApi.applyPromo(code);
            dispatch({
                type: ACTIONS.APPLY_PROMO,
                payload: { code, discount: result.discount }
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }, []);

    // Remove promo code
    const removePromo = useCallback(async () => {
        dispatch({ type: ACTIONS.REMOVE_PROMO });
        try {
            await cartApi.removePromo();
        } catch (error) {
            console.error('Failed to remove promo:', error);
        }
    }, []);

    // Clear cart (after order success)
    const clearCart = useCallback(() => {
        dispatch({ type: ACTIONS.CLEAR_CART });
        localStorage.removeItem(CART_STORAGE_KEY);
    }, []);

    // Derived values
    const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartTotal = subtotal - state.promoDiscount;

    const value = {
        // State
        cart: state.items,
        promoCode: state.promoCode,
        promoDiscount: state.promoDiscount,
        isLoading: state.isLoading,
        error: state.error,
        itemLoadingStates: state.itemLoadingStates,

        // Derived
        cartCount,
        subtotal,
        cartTotal,

        // Actions
        addToCart,
        updateQuantity,
        removeItem,
        applyPromo,
        removePromo,
        clearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

// Hook to use cart context
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

export default CartContext;
