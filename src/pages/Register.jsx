import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './Register.module.css';

const Register = () => {
    const navigate = useNavigate();
    const { register, isLoading, error } = useAuth();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Invalid email address';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.acceptTerms) {
            errors.acceptTerms = 'You must accept the terms and conditions';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const getPasswordStrength = () => {
        const { password } = formData;
        if (!password) return { level: 0, text: '' };

        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        const levels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
        return { level: strength, text: levels[strength] };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const result = await register({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        });

        if (result.success) {
            navigate('/account');
        } else if (result.errors) {
            setFormErrors(result.errors);
        }
    };

    const passwordStrength = getPasswordStrength();

    return (
        <div className={styles.registerPage}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h1>Create Account</h1>
                        <p>Join us for exclusive access and rewards</p>
                    </div>

                    {error && (
                        <div className={styles.errorBanner}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.nameRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="firstName">First Name</label>
                                <div className={styles.inputWrapper}>
                                    <User size={18} className={styles.inputIcon} />
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="John"
                                        className={formErrors.firstName ? styles.inputError : ''}
                                    />
                                </div>
                                {formErrors.firstName && (
                                    <span className={styles.fieldError}>{formErrors.firstName}</span>
                                )}
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="lastName">Last Name</label>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        className={formErrors.lastName ? styles.inputError : ''}
                                        style={{ paddingLeft: 'var(--space-sm)' }}
                                    />
                                </div>
                                {formErrors.lastName && (
                                    <span className={styles.fieldError}>{formErrors.lastName}</span>
                                )}
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email</label>
                            <div className={styles.inputWrapper}>
                                <Mail size={18} className={styles.inputIcon} />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className={formErrors.email ? styles.inputError : ''}
                                />
                            </div>
                            {formErrors.email && (
                                <span className={styles.fieldError}>{formErrors.email}</span>
                            )}
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Password</label>
                            <div className={styles.inputWrapper}>
                                <Lock size={18} className={styles.inputIcon} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="At least 8 characters"
                                    className={formErrors.password ? styles.inputError : ''}
                                />
                                <button
                                    type="button"
                                    className={styles.togglePassword}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {formData.password && (
                                <div className={styles.passwordStrength}>
                                    <div className={styles.strengthBars}>
                                        {[1, 2, 3, 4].map(level => (
                                            <div
                                                key={level}
                                                className={`${styles.strengthBar} ${passwordStrength.level >= level ? styles[`strength${level}`] : ''}`}
                                            />
                                        ))}
                                    </div>
                                    <span className={styles.strengthText}>{passwordStrength.text}</span>
                                </div>
                            )}
                            {formErrors.password && (
                                <span className={styles.fieldError}>{formErrors.password}</span>
                            )}
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className={styles.inputWrapper}>
                                <Lock size={18} className={styles.inputIcon} />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className={formErrors.confirmPassword ? styles.inputError : ''}
                                />
                                <button
                                    type="button"
                                    className={styles.togglePassword}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                <span className={styles.matchSuccess}>
                                    <Check size={14} /> Passwords match
                                </span>
                            )}
                            {formErrors.confirmPassword && (
                                <span className={styles.fieldError}>{formErrors.confirmPassword}</span>
                            )}
                        </div>

                        <div className={styles.termsGroup}>
                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    name="acceptTerms"
                                    checked={formData.acceptTerms}
                                    onChange={handleChange}
                                />
                                <span className={styles.checkmark}></span>
                                I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
                            </label>
                            {formErrors.acceptTerms && (
                                <span className={styles.fieldError}>{formErrors.acceptTerms}</span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                            {!isLoading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <div className={styles.divider}>
                        <span>or</span>
                    </div>

                    <div className={styles.footer}>
                        <p>Already have an account?</p>
                        <Link to="/login" className={styles.loginLink}>
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
