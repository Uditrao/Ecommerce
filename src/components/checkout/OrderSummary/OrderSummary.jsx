import React from 'react';
import styles from './OrderSummary.module.css';

const OrderSummary = ({
    items = [],
    subtotal = 0,
    shipping = 0,
    tax = 0,
    discount = 0,
    total = 0
}) => {
    return (
        <div className={styles.summary}>
            <h3 className={styles.title}>Order Summary</h3>

            <div className={styles.items}>
                {items.map((item, i) => (
                    <div key={i} className={styles.item}>
                        <div className={styles.itemImage}></div>
                        <div className={styles.itemDetails}>
                            <span className={styles.itemName}>{item.name}</span>
                            <span className={styles.itemMeta}>Qty: {item.quantity}</span>
                        </div>
                        <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                    </div>
                ))}
            </div>

            <div className={styles.totals}>
                <div className={styles.row}>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                    <div className={`${styles.row} ${styles.discount}`}>
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                    </div>
                )}
                <div className={styles.row}>
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className={styles.row}>
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <div className={`${styles.row} ${styles.total}`}>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
