import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Home, ShoppingBag, Info, Mail, LogIn, User, Leaf, HelpCircle } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import styles from './MobileNav.module.css';

const MobileNav = ({ isOpen, onClose }) => {
    const { isAuthenticated, user, logout } = useAuth();

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleLinkClick = () => {
        onClose();
    };

    const handleLogout = async () => {
        await logout();
        onClose();
    };

    return (
        <div className={`${styles.mobileNav} ${isOpen ? styles.open : ''}`}>
            {/* Backdrop */}
            <div className={styles.backdrop} onClick={onClose} />

            {/* Drawer */}
            <div className={styles.drawer}>
                <div className={styles.header}>
                    <span className={styles.logo}>SNEAKERFRESH</span>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className={styles.userSection}>
                    {isAuthenticated ? (
                        <div className={styles.userInfo}>
                            <div className={styles.avatar}>
                                {user?.firstName?.[0] || 'U'}
                            </div>
                            <div className={styles.userDetails}>
                                <p className={styles.userName}>{user?.firstName || 'User'}</p>
                                <Link to="/account" className={styles.accountLink} onClick={handleLinkClick}>View Account</Link>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className={styles.loginBtn} onClick={handleLinkClick}>
                            <LogIn size={18} />
                            Sign In / Register
                        </Link>
                    )}
                </div>

                <nav className={styles.nav}>
                    <NavLink to="/" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`} onClick={handleLinkClick}>
                        <Home size={20} />
                        Home
                    </NavLink>
                    <NavLink to="/product" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`} onClick={handleLinkClick}>
                        <ShoppingBag size={20} />
                        Shop Now
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`} onClick={handleLinkClick}>
                        <Info size={20} />
                        Our Story
                    </NavLink>
                    <NavLink to="/sustainability" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`} onClick={handleLinkClick}>
                        <Leaf size={20} />
                        Sustainability
                    </NavLink>
                    <NavLink to="/faq" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`} onClick={handleLinkClick}>
                        <HelpCircle size={20} />
                        FAQs
                    </NavLink>
                    <NavLink to="/contact" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`} onClick={handleLinkClick}>
                        <Mail size={20} />
                        Contact Us
                    </NavLink>
                </nav>

                <div className={styles.footer}>
                    {isAuthenticated && (
                        <button className={styles.logoutBtn} onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                    <div className={styles.socials}>
                        {/* Placeholder for social icons */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileNav;
