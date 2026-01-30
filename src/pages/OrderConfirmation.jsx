import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Package, MapPin, Calendar, ShoppingBag, ArrowRight } from 'lucide-react';
import styles from './OrderConfirmation.module.css';

const OrderConfirmation = () => {
    const location = useLocation();
    const orderData = location.state?.order || {
        id: 'SF-2024-' + Math.floor(1000 + Math.random() * 9000),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        total: 54.98,
        items: [
            { name: 'SneakerFresh Classic', quantity: 1, price: 24.99, variant: 'Lunar White' },
            { name: 'SneakerFresh Pro', quantity: 1, price: 29.99, variant: 'Midnight Black' }
        ],
        shipping: {
            name: 'John Doe',
            address: '123 Example Street, New York, NY 10001, US'
        }
    };

    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`${styles.confirmationPage} container section-padding`}>
            <div className={styles.successHeader}>
                <CheckCircle2 size={64} className={styles.successIcon} />
                <h1>Order Confirmed!</h1>
                <p>Thank you for your purchase. We've sent a confirmation email to your inbox.</p>
                <div className={styles.orderIdBadge}>
                    Order #{orderData.id}
                </div>
            </div>

            <div className={styles.grid}>
                <div className={styles.details}>
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <Package size={20} />
                            <h2>Order Summary</h2>
                        </div>
                        <div className={styles.itemsList}>
                            {orderData.items.map((item, index) => (
                                <div key={index} className={styles.item}>
                                    <div className={styles.itemInfo}>
                                        <h3>{item.name}</h3>
                                        <p className={styles.variant}>{item.variant}</p>
                                    </div>
                                    <div className={styles.itemMeta}>
                                        <span>qty: {item.quantity}</span>
                                        <span className={styles.price}>${item.price.toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.totals}>
                            <div className={styles.totalRow}>
                                <span>Subtotal</span>
                                <span>${orderData.total.toFixed(2)}</span>
                            </div>
                            <div className={styles.totalRow}>
                                <span>Shipping</span>
                                <span>FREE</span>
                            </div>
                            <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                                <span>Total</span>
                                <span>${orderData.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </section>
                </div>

                <div className={styles.sidebar}>
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <MapPin size={20} />
                            <h2>Shipping Address</h2>
                        </div>
                        <div className={styles.addressBox}>
                            <p><strong>{orderData.shipping.name}</strong></p>
                            <p>{orderData.shipping.address}</p>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <Calendar size={20} />
                            <h2>Estimated Delivery</h2>
                        </div>
                        <div className={styles.deliveryBox}>
                            <p>Standard Shipping (3-5 business days)</p>
                            <p className={styles.deliveryDate}>Expected by Feb 5, 2024</p>
                        </div>
                    </section>
                </div>
            </div>

            <div className={styles.actions}>
                <Link to="/product" className={styles.continueBtn}>
                    <ShoppingBag size={18} />
                    Continue Shopping
                </Link>
                <Link to="/account" className={styles.accountBtn}>
                    View My Orders
                    <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmation;
