import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import ProgressIndicator from '../components/checkout/ProgressIndicator/ProgressIndicator';
import ShippingForm from '../components/checkout/ShippingForm/ShippingForm';
import OrderSummary from '../components/checkout/OrderSummary/OrderSummary';
import styles from './Checkout.module.css';

const Checkout = () => {
    const { cart, cartTotal } = useCart();
    const [currentStep, setCurrentStep] = useState(0);
    const [shippingData, setShippingData] = useState({});

    const steps = ['Shipping', 'Payment', 'Review'];
    const completedSteps = [];

    const shipping = cartTotal > 50 ? 0 : 5;
    const tax = cartTotal * 0.08;
    const total = cartTotal + shipping + tax;

    const items = cart.map(item => {
        const variant = item.variant;
        return {
            name: item.name,
            quantity: item.quantity,
            price: (variant?.price || item.price) * item.quantity
        };
    });

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setCurrentStep(1);
    };

    return (
        <div className={`${styles.checkout} container section-padding`}>
            <h1 className={styles.title}>Checkout</h1>

            <ProgressIndicator
                steps={steps}
                currentStep={currentStep}
                completedSteps={completedSteps}
            />

            <div className={styles.grid}>
                <div className={styles.form}>
                    {currentStep === 0 && (
                        <ShippingForm
                            values={shippingData}
                            onChange={setShippingData}
                            onSubmit={handleShippingSubmit}
                        />
                    )}

                    {currentStep === 1 && (
                        <div className={styles.placeholder}>
                            <h2>Payment</h2>
                            <p className="text-muted">Payment integration would go here (Stripe Elements, etc.)</p>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className={styles.placeholder}>
                            <h2>Review Order</h2>
                            <p className="text-muted">Order review and confirmation would go here.</p>
                        </div>
                    )}
                </div>

                <aside className={styles.sidebar}>
                    <OrderSummary
                        items={items}
                        subtotal={cartTotal}
                        shipping={shipping}
                        tax={tax}
                        total={total}
                    />
                </aside>
            </div>
        </div>
    );
};

export default Checkout;
