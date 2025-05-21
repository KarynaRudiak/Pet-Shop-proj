import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { openModal, closeModal } from '../../redux/slices/modalSlice';
import { removeItem, clearCart, updateQuantity } from '../../redux/slices/cartSlice';
import Counter from '../../components/Counter/Counter';
import OrderButton from '../../ui/OrderButton/OrderButton';
import styles from './CartPage.module.css';
import Close from '../../assets/icons/x(black).svg';

const API_URL = import.meta.env.VITE_API_URL;

export default function CartPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart?.items || []);
    const [form, setForm] = useState({ name: '', phone: '', email: '' });
    const [errors, setErrors] = useState({ name: '', phone: '', email: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const [discountCode, setDiscountCode] = useState('');
    const [discountPercent, setDiscountPercent] = useState(0);
    const [isDiscountApplied, setIsDiscountApplied] = useState(false);

    useEffect(() => {
        if (isSubmitted) {
            clearForm();
            setIsSubmitted(false);
        }
    }, [isSubmitted]);

    const totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
    const totalPrice = cartItems.reduce((total, item) => total + ((item.discont_price || item.price || 0) * (item.quantity || 0)), 0);

    const formatPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice);

    const handleQuantityChange = (id, newQuantity) => {
        dispatch(updateQuantity({ id, quantity: newQuantity }));
    };

    const handleApplyDiscount = () => {
        if (discountCode.trim().toLowerCase() === 'sale10') {
            setDiscountPercent(10);
            setIsDiscountApplied(true);
        } else {
            setDiscountPercent(0);
            setIsDiscountApplied(false);
        }
    };

    const handleRemoveDiscount = () => {
        setDiscountPercent(0);
        setIsDiscountApplied(false);
        setDiscountCode(''); // Optionally reset the discount code field
    };

    const numericTotalPrice = isNaN(totalPrice) ? 0 : totalPrice;

    const discountAmount = (numericTotalPrice * discountPercent) / 100;
    const finalPrice = numericTotalPrice - discountAmount;
    const formattedFinalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(finalPrice);

    const validateInput = (name, value) => {
        let errorMessage = '';

        if (name === 'name') {
            if (!value.trim()) {
                errorMessage = 'Name is required';
            } else if (!/^[A-Za-z\s]+$/.test(value)) {
                errorMessage = 'Only letters and spaces allowed';
            }
        } else if (name === 'phone') {
            if (!value.trim()) {
                errorMessage = 'Phone number is required';
            } else if (!/^\d{10,15}$/.test(value)) {
                errorMessage = 'Enter a valid phone number (10-15 digits)';
            }
        } else if (name === 'email') {
            if (!value.trim()) {
                errorMessage = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errorMessage = 'Enter a valid email address';
            }
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
        validateInput(name, value);
    };

    const isFormValid = () => !errors.name && !errors.phone && !errors.email && form.name && form.phone && form.email;

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (!isFormValid() || isLoading) return;

        const orderData = {
            name: form.name,
            phone: form.phone,
            email: form.email,
            products: cartItems.map((item) => ({
                id: item.id,
                quantity: item.quantity,
                title: item.title,
                price: item.price,
                discont_price: item.discont_price || item.price,
                totalPrice: (item.discont_price || item.price) * item.quantity,
            })),
        };

        setIsLoading(true);
        setError(null);

        try {
            await axios.post(`${API_URL}/order/send`, orderData, {
                headers: { 'Content-Type': 'application/json' },
            });

            dispatch(openModal({
                title: 'Congratulations!',
                content: [
                    'Your order has been successfully placed on the website.',
                    'A manager will contact you shortly to confirm your order.'
                ],
            }));

            setIsSubmitted(true);
        } catch (error) {
            setError("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const clearForm = () => {
        setForm({ name: '', phone: '', email: '' });
        setErrors({ name: '', phone: '', email: '' });
        dispatch(clearCart());
    };

    return (
        <div className="globalContainer">
            <div className={styles.cartWrapper}>
                <div className={styles.titleBlock}>
                    <h2>Shopping cart</h2>
                    <div className={styles.titleBlockLine}></div>
                    <Link to="/products" className={styles.titleBlockButton}>
                        Back to the store
                    </Link>
                </div>

                {cartItems.length === 0 ? (
                    <div className={styles.cartEmptyState}>
                        <p>Looks like you have no items in your basket currently.</p>
                        <Link to="/products" className={styles.cartContinueBtn}>Continue Shopping</Link>
                    </div>
                ) : (
                    <div className={styles.cartMain}>
                        <div className={styles.cartSummary}>
                            <div className={styles.cartItemList}>
                                {cartItems.map((item) => (
                                    <div key={item.id} className={styles.cartProduct}>
                                        <div className={styles.cartImageWrapper}>
                                            <img src={`${API_URL}/${item.image}`} alt={item.title} className={styles.cartProductImage} />
                                        </div>
                                        <div className={styles.cartProductDetails}>
                                            <h3 className={styles.cartProductTitle} title={item.title}>{item.title}</h3>
                                            <div style={{display:"flex", gap: "32px"}}>
                                                <div className={styles.cartPriceSection}>
                                                    <Counter
                                                        quantity={item.quantity}
                                                        setQuantity={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
                                                    />
                                                </div>
                                                <div className={styles.cartPriceBox}>
                                                    <p className={styles.cartMainPrice}>
                                                        {item.discont_price
                                                            ? `$${(item.discont_price * item.quantity).toFixed(2)}`
                                                            : `$${(item.price * item.quantity).toFixed(2)}`}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                className={styles.cartRemoveBtn}
                                                onClick={() => dispatch(removeItem({ id: item.id }))}
                                            >
                                                <img src={Close} alt="x" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.cartOrderSummary}>
                                <h3>Order details</h3>
                                <p className={styles.cartTotalItems}>{totalQuantity} items</p>
                                <div className={styles.cartTotalAmount}>
                                    <span className={styles.cartTotalLabel}>Total</span>
                                    <span className={styles.cartTotalValue}>
                                        {isDiscountApplied
                                            ? formattedFinalPrice
                                            : formatPrice}
                                    </span>
                                </div>

                                <div className={styles.cartFormWrapper}>
                                    <form onSubmit={handlePlaceOrder} className={styles.cartFormContainer}>
                                        <div className={styles.cartFormField}>
                                            <input type="text" name="name" value={form.name} placeholder="Name" onChange={handleInputChange} required />
                                            {errors.name && <p className={styles.cartErrorMessage}>{errors.name}</p>}
                                        </div>
                                        <div className={styles.cartFormField}>
                                            <input type="tel" name="phone" value={form.phone} placeholder="Phone number" onChange={handleInputChange} required />
                                            {errors.phone && <p className={styles.cartErrorMessage}>{errors.phone}</p>}
                                        </div>
                                        <div className={styles.cartFormField}>
                                            <input type="email" name="email" value={form.email} placeholder="Email" onChange={handleInputChange} required />
                                            {errors.email && <p className={styles.cartErrorMessage}>{errors.email}</p>}
                                        </div>
                                        <div className={styles.cartDiscountBlock}>
                                            <h4>
                                                {isDiscountApplied
                                                    ? 'Discount applied!'
                                                    : 'Have a discount code?'}
                                            </h4>
                                            <div className={styles.cartDiscountControls}>
                                                <input
                                                    type="text"
                                                    placeholder="Enter code"
                                                    value={discountCode}
                                                    onChange={(e) => setDiscountCode(e.target.value)}
                                                    disabled={isDiscountApplied}
                                                />
                                                {!isDiscountApplied ? (
                                                    <button type="button" onClick={handleApplyDiscount} className={styles.applyDiscountBtn}>Apply</button>
                                                ) : (
                                                    <button type="button" onClick={handleRemoveDiscount} className={styles.removeDiscountBtn}>
                                                        <img src={Close} alt="Remove Discount" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <OrderButton disabled={isLoading || isSubmitted || !isFormValid()} isLoading={isLoading} />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
