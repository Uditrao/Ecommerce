import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, User, Menu } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import MobileNav from '../MobileNav/MobileNav';
import styles from './Header.module.css';

const Header = () => {
    const { cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.announcement}>
                <p>Free carbon-neutral shipping on orders over $50</p>
            </div>

            <nav className={`${styles.nav} container`}>
                <div className={styles.logo}>
                    <Link to="/">SNEAKERFRESH</Link>
                </div>

                <div className={styles.menuItems}>
                    <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>
                    <NavLink to="/product" className={({ isActive }) => isActive ? styles.active : ''}>Shop</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ''}>Our Story</NavLink>
                    <NavLink to="/sustainability" className={({ isActive }) => isActive ? styles.active : ''}>Sustainability</NavLink>
                </div>

                <div className={styles.actions}>
                    <Link to="/login" className={styles.iconLink}>
                        <User size={20} />
                    </Link>
                    <Link to="/cart" className={styles.cartLink}>
                        <ShoppingBag size={20} />
                        {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
                    </Link>
                    <button className={styles.mobileMenu} onClick={() => setIsMenuOpen(true)}>
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </header>
    );
};

export default Header;
