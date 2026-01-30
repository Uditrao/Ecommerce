import React, { useState } from 'react';
import { Star, ShieldCheck, Truck, RefreshCcw, Minus, Plus } from 'lucide-react';
import { PRODUCT_DATA } from '../../../services/products';
import { useCart } from '../../../context/CartContext';
import { useToast } from '../../../context/ToastContext';
import Button from '../../common/Button/Button';
import Badge from '../../common/Badge/Badge';
import styles from './ProductInfo.module.css';

const ProductInfo = ({ product = PRODUCT_DATA }) => {
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const [selectedVariant, setSelectedVariant] = useState(product.variants[0].id);
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const currentVariant = product.variants.find(v => v.id === selectedVariant);

    const handleAddToCart = async () => {
        setIsAddingToCart(true);

        try {
            await addToCart(product, selectedVariant, quantity);
            showToast(`Added ${quantity}x ${currentVariant.name} to cart`, 'success');
        } catch (error) {
            showToast('Failed to add to cart', 'error');
        } finally {
            setIsAddingToCart(false);
        }
    };

    return (
        <div className={styles.info}>
            {/* Badges */}
            <div className={styles.badges}>
                {product.badges?.map((badge, i) => (
                    <Badge key={i} variant={i === 0 ? 'default' : 'mint'} size="sm">
                        {badge}
                    </Badge>
                ))}
            </div>

            {/* Title */}
            <h1 className={styles.title}>{product.name}</h1>

            {/* Rating */}
            <div className={styles.rating}>
                <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={18}
                            fill={i < Math.floor(product.rating.average) ? 'currentColor' : 'none'}
                        />
                    ))}
                </div>
                <span className={styles.ratingText}>
                    {product.rating.average} ({product.rating.count.toLocaleString()} reviews)
                </span>
            </div>

            {/* Tagline */}
            <p className={styles.tagline}>{product.tagline}</p>

            {/* Variant Selection */}
            <div className={styles.variants}>
                <span className={styles.label}>Select Option:</span>
                <div className={styles.variantOptions}>
                    {product.variants.map(variant => (
                        <button
                            key={variant.id}
                            className={`${styles.variantBtn} ${selectedVariant === variant.id ? styles.selected : ''}`}
                            onClick={() => setSelectedVariant(variant.id)}
                        >
                            <span className={styles.variantName}>{variant.name}</span>
                            <span className={styles.variantPrice}>${variant.price}</span>
                            {variant.comparePrice && (
                                <span className={styles.comparePrice}>${variant.comparePrice}</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quantity */}
            <div className={styles.quantity}>
                <span className={styles.label}>Quantity:</span>
                <div className={styles.quantityControl}>
                    <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                    >
                        <Minus size={16} />
                    </button>
                    <span>{quantity}</span>
                    <button
                        onClick={() => setQuantity(q => q + 1)}
                        aria-label="Increase quantity"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            {/* Price */}
            <div className={styles.priceSection}>
                <span className={styles.price}>${(currentVariant.price * quantity).toFixed(2)}</span>
                {currentVariant.comparePrice && (
                    <span className={styles.savings}>
                        Save ${((currentVariant.comparePrice - currentVariant.price) * quantity).toFixed(2)}
                    </span>
                )}
            </div>

            {/* Add to Cart */}
            <Button
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                loading={isAddingToCart}
            >
                Add to Cart
            </Button>

            {/* Trust Signals */}
            <div className={styles.trust}>
                <div className={styles.trustItem}>
                    <Truck size={18} />
                    <span>Free shipping over $50</span>
                </div>
                <div className={styles.trustItem}>
                    <ShieldCheck size={18} />
                    <span>30-day guarantee</span>
                </div>
                <div className={styles.trustItem}>
                    <RefreshCcw size={18} />
                    <span>Easy returns</span>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
