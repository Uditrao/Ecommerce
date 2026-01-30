import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import styles from './Cart.module.css';

const Cart = () => {
    const { cart, removeItem, updateQuantity, cartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className={`${styles.empty} container section-padding`}>
                <h2>Your cart is empty</h2>
                <p className="text-muted">Looks like you haven't added any freshness to your cart yet.</p>
                <Link to="/product" className={styles.continueBtn}>Shop Sneakers Pack</Link>
            </div>
        );
    }

    return (
        <div className={`${styles.cartPage} container section-padding`}>
            <h1 className={styles.title}>Shopping Cart</h1>

            <div className={styles.grid}>
                <div className={styles.items}>
                    {cart.map((item) => {
                        const variant = item.variant;
                        return (
                            <div key={`${item.id}-${item.variantId}`} className={styles.item}>
                                <div className={styles.itemImage}></div>
                                <div className={styles.itemInfo}>
                                    <h3>{item.name}</h3>
                                    <p className={styles.variantName}>{variant?.name || 'Standard'}</p>
                                    <button
                                        className={styles.removeBtn}
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <Trash2 size={16} /> Remove
                                    </button>
                                </div>
                                <div className={styles.itemActions}>
                                    <div className={styles.quantity}>
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                                    </div>
                                    <p className={styles.itemPrice}>${((variant?.price || item.price) * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className={styles.summary}>
                    <div className={styles.summaryCard}>
                        <h3>Order Summary</h3>
                        <div className={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Shipping</span>
                            <span>{cartTotal > 50 ? 'FREE' : '$5.00'}</span>
                        </div>
                        <div className={`${styles.summaryRow} ${styles.total}`}>
                            <span>Total</span>
                            <span>${(cartTotal + (cartTotal > 50 ? 0 : 5)).toFixed(2)}</span>
                        </div>
                        <Link to="/checkout" className={styles.checkoutBtn}>
                            Proceed to Checkout <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
