import styles from './DiscountForm.module.css'
import DiscountFormImg from '../../assets/images/discountFormImg.png'

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { openModal } from '../../redux/slices/modalSlice';

const BASE_URL = import.meta.env.VITE_API_URL;

export default function DiscountForm() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({ name: '', phone: '', email: '' });

    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isFormValid() || isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post(`${BASE_URL}/sale/send`, {
                name,
                phone,
                email,
            });


            if (response.status === 200) {
                dispatch(openModal({
                    title: 'Success',
                    content: ['Discount was sent on your email!'],
                }));
                setIsSubmitted(true);
                clearForm();
            }
        } catch (error) {
            dispatch(openModal({
                title: 'Error',
                content: ['There was an error submitting your request.'],
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

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

        if (name === 'name') setName(value);
        if (name === 'phone') setPhone(value);
        if (name === 'email') setEmail(value);

        validateInput(name, value);
    };

    const isFormValid = () => !errors.name && !errors.phone && !errors.email && name && phone && email;

    const clearForm = () => {
        setName('');
        setPhone('');
        setEmail('');
        setErrors({ name: '', phone: '', email: '' });
    };

    return (
        <div className="globalContainer">
            <div className={styles.container}>
                <h2>5% off on the first order</h2>
                <div className={styles.formContainer}>
                    <div className={styles.imgBox}>
                        <img src={DiscountFormImg} alt="DiscountFormImg" className={styles.discountImg} />
                    </div>
                    <div className={styles.formContent}>
                        <form className={styles.formBox} onSubmit={handleSubmit}>
                            <div className={styles.formItem}>
                                <label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        placeholder="Name"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                                {errors.name && <p className={styles.errorText}>{errors.name}</p>}
                            </div>
                            <div className={styles.formItem}>
                                <label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={phone}
                                        placeholder="Phone number"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                                {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
                            </div>
                            <div className={styles.formItem}>
                                <label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        placeholder="Email"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                                {errors.email && <p className={styles.errorText}>{errors.email}</p>}
                            </div>
                            <button
                                className={styles.discountBtn}
                                type="submit"
                                disabled={isSubmitting || !isFormValid()}
                            >
                                {isSubmitting ? 'Submitting...' : 'Get a discount'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
