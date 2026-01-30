import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`${styles.container} container`}>
                <div className={styles.grid}>
                    {/* Brand Section */}
                    <div className={styles.brand}>
                        <h2 className={styles.logo}>SNEAKERFRESH</h2>
                        <p className={styles.tagline}>Naturally fresh shoes for a cleaner planet. Carbon-neutral and sustainably made.</p>
                        <div className={styles.socials}>
                            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div className={styles.links}>
                        <h3>Shop</h3>
                        <ul>
                            <li><Link to="/product">All Products</Link></li>
                            <li><Link to="/product">Best Sellers</Link></li>
                            <li><Link to="/product">New Arrivals</Link></li>
                            <li><Link to="/product">Accessories</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className={styles.links}>
                        <h3>Company</h3>
                        <ul>
                            <li><Link to="/about">Our Story</Link></li>
                            <li><Link to="/sustainability">Sustainability</Link></li>
                            <li><Link to="/about">Manufacturing</Link></li>
                            <li><Link to="/about">Careers</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className={styles.links}>
                        <h3>Support</h3>
                        <ul>
                            <li><Link to="/faq">FAQs</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/checkout">Shipping</Link></li>
                            <li><Link to="/checkout">Returns</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className={styles.contact}>
                        <h3>Get in Touch</h3>
                        <ul>
                            <li><MapPin size={16} /> 123 Eco Street, NY</li>
                            <li><Mail size={16} /> hello@sneakerfresh.com</li>
                            <li><Phone size={16} /> +1 (555) 000-0000</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} SNEAKERFRESH. All rights reserved.</p>
                    <div className={styles.legal}>
                        <Link to="/about">Privacy Policy</Link>
                        <Link to="/about">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
