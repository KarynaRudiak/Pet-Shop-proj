import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import styles from './ProductCard.module.css';
import AddButton from '../../ui/AddButton/AddButton';

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ProductCard({ product, minPrice, maxPrice, includeDiscount }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 })); 
  };

  const calculateDiscountPercentage = (price, discountPrice) => {
    if (price && discountPrice) {
      const discount = ((price - discountPrice) / price) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  const isValidProduct = () => {
    if (product.price < minPrice || product.price > maxPrice) {
      return false;
    }

    if (includeDiscount && !product.discont_price) {
      return false;
    }

    return true;
  };

  if (!isValidProduct()) return null;

  return (
    <li className={styles.productCard}>
      <div className={styles.productImageContainer}>
        <img src={`${BASE_URL}/${product.image}`} alt={product.title} className={styles.productImage} />
        {product.discont_price && (
          <div className={styles.discountFlag}>
            -{calculateDiscountPercentage(product.price, product.discont_price)}%
          </div>
        )}
        <div className={styles.addButtonContainer}>
          <AddButton onClick={handleAddToCart} />
        </div>
      </div>
      <Link to={`/products/${product.id}`} className={styles.productLink}>
        <div className={styles.productInfo}>
          <h3 className={styles.productTitle}>{product.title}</h3>
          <div className={styles.priceContainer}>
            {product.discont_price ? (
              <>
                <span className={styles.currentPrice}>${product.discont_price}</span>
                <span className={styles.originalPrice}>${product.price}</span>
              </>
            ) : (
              <span className={styles.currentPrice}>${product.price}</span>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};
