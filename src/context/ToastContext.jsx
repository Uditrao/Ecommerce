import React, { createContext, useContext, useState, useCallback } from 'react';
import styles from './Toast.module.css';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className={styles.container}>
                {toasts.map(toast => {
                    const Icon = icons[toast.type] || Info;
                    return (
                        <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
                            <Icon size={18} />
                            <span>{toast.message}</span>
                            <button onClick={() => removeToast(toast.id)} className={styles.close}>
                                <X size={14} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
};
