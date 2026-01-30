import React, { createContext, useContext, useReducer, useCallback } from 'react';

/* =====================================================
   CHECKOUT CONTEXT
   Page-level state for checkout flow
   ===================================================== */

const CheckoutContext = createContext(null);

// Initial state
const initialState = {
    currentStep: 0, // 0: Shipping, 1: Payment, 2: Review
    completedSteps: [],

    // Shipping
    shippingAddress: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US'
    },
    shippingRates: [],
    selectedShippingRate: null,

    // Tax
    tax: 0,

    // Payment (minimal - actual payment handled by Stripe)
    paymentMethod: null,

    // Loading states
    isValidatingCart: false,
    isCalculatingShipping: false,
    isCalculatingTax: false,
    isSubmittingOrder: false,

    // Errors
    errors: {},
    orderError: null,

    // Order result
    orderId: null
};

// Action types
const ACTIONS = {
    SET_STEP: 'SET_STEP',
    COMPLETE_STEP: 'COMPLETE_STEP',
    SET_SHIPPING_ADDRESS: 'SET_SHIPPING_ADDRESS',
    SET_SHIPPING_RATES: 'SET_SHIPPING_RATES',
    SELECT_SHIPPING_RATE: 'SELECT_SHIPPING_RATE',
    SET_TAX: 'SET_TAX',
    SET_PAYMENT_METHOD: 'SET_PAYMENT_METHOD',
    SET_LOADING: 'SET_LOADING',
    SET_ERRORS: 'SET_ERRORS',
    SET_ORDER_ERROR: 'SET_ORDER_ERROR',
    SET_ORDER_ID: 'SET_ORDER_ID',
    RESET: 'RESET'
};

// Reducer
function checkoutReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_STEP:
            return { ...state, currentStep: action.payload };

        case ACTIONS.COMPLETE_STEP:
            return {
                ...state,
                completedSteps: state.completedSteps.includes(action.payload)
                    ? state.completedSteps
                    : [...state.completedSteps, action.payload]
            };

        case ACTIONS.SET_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: { ...state.shippingAddress, ...action.payload }
            };

        case ACTIONS.SET_SHIPPING_RATES:
            return {
                ...state,
                shippingRates: action.payload,
                isCalculatingShipping: false
            };

        case ACTIONS.SELECT_SHIPPING_RATE:
            return { ...state, selectedShippingRate: action.payload };

        case ACTIONS.SET_TAX:
            return { ...state, tax: action.payload, isCalculatingTax: false };

        case ACTIONS.SET_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload };

        case ACTIONS.SET_LOADING:
            return { ...state, [action.payload.key]: action.payload.value };

        case ACTIONS.SET_ERRORS:
            return { ...state, errors: action.payload };

        case ACTIONS.SET_ORDER_ERROR:
            return { ...state, orderError: action.payload, isSubmittingOrder: false };

        case ACTIONS.SET_ORDER_ID:
            return { ...state, orderId: action.payload, isSubmittingOrder: false };

        case ACTIONS.RESET:
            return initialState;

        default:
            return state;
    }
}

// Shipping address validation
function validateShippingAddress(address) {
    const errors = {};

    if (!address.firstName?.trim()) errors.firstName = 'First name is required';
    if (!address.lastName?.trim()) errors.lastName = 'Last name is required';
    if (!address.email?.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) {
        errors.email = 'Invalid email address';
    }
    if (!address.address1?.trim()) errors.address1 = 'Address is required';
    if (!address.city?.trim()) errors.city = 'City is required';
    if (!address.state?.trim()) errors.state = 'State is required';
    if (!address.zipCode?.trim()) errors.zipCode = 'ZIP code is required';

    return { isValid: Object.keys(errors).length === 0, errors };
}

// Provider component
export function CheckoutProvider({ children }) {
    const [state, dispatch] = useReducer(checkoutReducer, initialState);

    // Update shipping address field
    const updateShippingAddress = useCallback((updates) => {
        dispatch({ type: ACTIONS.SET_SHIPPING_ADDRESS, payload: updates });
        // Clear related errors
        dispatch({ type: ACTIONS.SET_ERRORS, payload: {} });
    }, []);

    // Validate and proceed from shipping step
    const submitShippingAddress = useCallback(async () => {
        const { isValid, errors } = validateShippingAddress(state.shippingAddress);

        if (!isValid) {
            dispatch({ type: ACTIONS.SET_ERRORS, payload: errors });
            return { success: false };
        }

        dispatch({ type: ACTIONS.COMPLETE_STEP, payload: 0 });
        dispatch({ type: ACTIONS.SET_STEP, payload: 1 });
        return { success: true };
    }, [state.shippingAddress]);

    // Select shipping method
    const selectShippingRate = useCallback((rate) => {
        dispatch({ type: ACTIONS.SELECT_SHIPPING_RATE, payload: rate });
    }, []);

    // Proceed to next step
    const goToStep = useCallback((step) => {
        dispatch({ type: ACTIONS.SET_STEP, payload: step });
    }, []);

    // Go back
    const goBack = useCallback(() => {
        if (state.currentStep > 0) {
            dispatch({ type: ACTIONS.SET_STEP, payload: state.currentStep - 1 });
        }
    }, [state.currentStep]);

    // Reset checkout
    const resetCheckout = useCallback(() => {
        dispatch({ type: ACTIONS.RESET });
    }, []);

    // Calculate totals
    const shippingCost = state.selectedShippingRate?.price || 0;

    const value = {
        // State
        ...state,
        shippingCost,

        // Actions
        updateShippingAddress,
        submitShippingAddress,
        selectShippingRate,
        goToStep,
        goBack,
        resetCheckout
    };

    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    );
}

// Hook to use checkout context
export function useCheckout() {
    const context = useContext(CheckoutContext);
    if (!context) {
        throw new Error('useCheckout must be used within a CheckoutProvider');
    }
    return context;
}

export default CheckoutContext;
