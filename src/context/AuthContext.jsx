import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { authApi } from '../services/api';

/* =====================================================
   AUTH CONTEXT
   Global state for user session management
   ===================================================== */

const AuthContext = createContext(null);

// Initial state
const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true, // Start loading until session checked
    error: null
};

// Action types
const ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_USER: 'SET_USER',
    CLEAR_USER: 'CLEAR_USER'
};

// Reducer
function authReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_LOADING:
            return { ...state, isLoading: action.payload, error: null };

        case ACTIONS.SET_ERROR:
            return { ...state, isLoading: false, error: action.payload };

        case ACTIONS.SET_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
                error: null
            };

        case ACTIONS.CLEAR_USER:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null
            };

        default:
            return state;
    }
}

// Provider component
export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Check session on mount
    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await authApi.getSession();
                if (session?.user) {
                    dispatch({ type: ACTIONS.SET_USER, payload: session.user });
                } else {
                    dispatch({ type: ACTIONS.CLEAR_USER });
                }
            } catch (error) {
                // Not authenticated
                dispatch({ type: ACTIONS.CLEAR_USER });
            }
        };

        checkSession();
    }, []);

    // Listen for auth:expired events (from API layer)
    useEffect(() => {
        const handleExpired = () => {
            dispatch({ type: ACTIONS.CLEAR_USER });
        };

        window.addEventListener('auth:expired', handleExpired);
        return () => window.removeEventListener('auth:expired', handleExpired);
    }, []);

    // Login
    const login = useCallback(async (email, password) => {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });

        try {
            const result = await authApi.login({ email, password });
            dispatch({ type: ACTIONS.SET_USER, payload: result.user });
            return { success: true };
        } catch (error) {
            dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
            return { success: false, error: error.message, errors: error.errors };
        }
    }, []);

    // Register
    const register = useCallback(async (userData) => {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });

        try {
            const result = await authApi.register(userData);
            dispatch({ type: ACTIONS.SET_USER, payload: result.user });
            return { success: true };
        } catch (error) {
            dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
            return { success: false, error: error.message, errors: error.errors };
        }
    }, []);

    // Logout
    const logout = useCallback(async () => {
        try {
            await authApi.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            dispatch({ type: ACTIONS.CLEAR_USER });
            // Clear any sensitive data
            sessionStorage.clear();
        }
    }, []);

    // Request password reset
    const requestPasswordReset = useCallback(async (email) => {
        try {
            await authApi.requestPasswordReset(email);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }, []);

    const value = {
        // State
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        error: state.error,

        // Actions
        login,
        register,
        logout,
        requestPasswordReset
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook to use auth context
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
