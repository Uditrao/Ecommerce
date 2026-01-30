import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { User, Package, MapPin, LogOut, ChevronRight, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './Account.module.css';

const Account = () => {
    const { user, isAuthenticated, isLoading, logout } = useAuth();

    // Redirect to login if not authenticated
    if (!isLoading && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading your account...</p>
            </div>
        );
    }

    // Mock order history
    const orders = [
        {
            id: 'SF-2024-001',
            date: 'Jan 15, 2024',
            status: 'Delivered',
            total: 24.99,
            items: 1
        },
        {
            id: 'SF-2024-002',
            date: 'Jan 28, 2024',
            status: 'In Transit',
            total: 44.98,
            items: 2
        }
    ];

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className={`${styles.accountPage} container section-padding`}>
            <h1 className={styles.title}>My Account</h1>

            <div className={styles.grid}>
                {/* Profile Section */}
                <section className={styles.profileCard}>
                    <div className={styles.cardHeader}>
                        <User size={20} />
                        <h2>Profile</h2>
                    </div>
                    <div className={styles.profileContent}>
                        <div className={styles.avatar}>
                            {user?.firstName?.[0] || 'U'}{user?.lastName?.[0] || ''}
                        </div>
                        <div className={styles.profileInfo}>
                            <h3>{user?.firstName || 'Guest'} {user?.lastName || 'User'}</h3>
                            <p>{user?.email || 'guest@example.com'}</p>
                        </div>
                    </div>
                    <button className={styles.editBtn}>Edit Profile</button>
                </section>

                {/* Address Section */}
                <section className={styles.addressCard}>
                    <div className={styles.cardHeader}>
                        <MapPin size={20} />
                        <h2>Addresses</h2>
                    </div>
                    <div className={styles.addressContent}>
                        <div className={styles.address}>
                            <span className={styles.addressLabel}>Default Shipping</span>
                            <p>123 Example Street<br />New York, NY 10001<br />United States</p>
                        </div>
                    </div>
                    <button className={styles.editBtn}>Manage Addresses</button>
                </section>

                {/* Orders Section */}
                <section className={styles.ordersCard}>
                    <div className={styles.cardHeader}>
                        <Package size={20} />
                        <h2>Order History</h2>
                    </div>

                    {orders.length > 0 ? (
                        <div className={styles.ordersList}>
                            {orders.map(order => (
                                <div key={order.id} className={styles.orderItem}>
                                    <div className={styles.orderInfo}>
                                        <div className={styles.orderId}>
                                            <ShoppingBag size={16} />
                                            <span>{order.id}</span>
                                        </div>
                                        <span className={styles.orderDate}>{order.date}</span>
                                    </div>
                                    <div className={styles.orderDetails}>
                                        <span className={`${styles.status} ${styles[order.status.toLowerCase().replace(' ', '')]}`}>
                                            {order.status}
                                        </span>
                                        <span className={styles.orderTotal}>${order.total.toFixed(2)}</span>
                                        <span className={styles.orderItems}>{order.items} item{order.items > 1 ? 's' : ''}</span>
                                    </div>
                                    <ChevronRight size={18} className={styles.orderArrow} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyOrders}>
                            <Package size={40} />
                            <p>No orders yet</p>
                            <Link to="/product" className={styles.shopLink}>Start Shopping</Link>
                        </div>
                    )}
                </section>

                {/* Quick Actions */}
                <section className={styles.actionsCard}>
                    <h2>Quick Actions</h2>
                    <div className={styles.actions}>
                        <Link to="/cart" className={styles.actionBtn}>
                            <ShoppingBag size={18} />
                            View Cart
                        </Link>
                        <button onClick={handleLogout} className={styles.logoutBtn}>
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Account;
