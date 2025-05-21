import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import Counter from '../../components/Counter/Counter';
import styles from './ProductDetails.module.css';
import { addToCart } from '../../redux/slices/cartSlice';
import AddButton from '../../ui/AddButton/AddButton';
import { NavLink, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  const { productId } = useParams();

  useEffect(() => {
    const fetchProductAndCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const productResponse = await axios.get(`${API_URL}/products/${productId}`);
        setProduct(productResponse.data[0]);

        const categoriesResponse = await axios.get(`${API_URL}/categories/all`);
        setCategories(categoriesResponse.data);

      } catch (error) {
        setError("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductAndCategories();
  }, [productId]);

  const productCategory = categories.find(cat => cat.id === product?.categoryId);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return (
    <div style={{ color: 'red', fontWeight: 'bold', textAlign: 'center', marginTop: '50px' }}>
      {error}
    </div>
  );

  return (
    <div className="globalContainer">
      <div className={styles.productDetailsPage}>
        <div className={styles.path}>
          <NavLink to="/" className={styles.link}>
            Main Page
          </NavLink>
          <div className={styles.titleLine}></div>
          <NavLink
            to="/categories"
            className={styles.link}
          >
            Categories
          </NavLink>
          <div className={styles.titleLine}></div>
          <NavLink to={`/categories/${productCategory?.id}`} className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
            {productCategory?.title || "Category"}
          </NavLink>
          <div className={styles.titleLine}></div>
          <NavLink to={`/products/${productId}`} className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
            {product?.title}
          </NavLink>
        </div>
        <div className={styles.productContainer}>
          <div className={styles.productImageContainer}>
            <img src={`${API_URL}/${product.image}`} alt={product.title} className={styles.productImage} />
          </div>
          <div className={styles.productInfo}>
            <h2 className={styles.productTitle}>{product.title}</h2>
            <div className={styles.productPrice}>
              <span className={styles.currentPrice}>${product.discont_price || product.price}</span>
              {product.discont_price && (
                <>
                  <span className={styles.originalPrice}>${product.price}</span>
                  <span className={styles.discountFlag}>
                    -{Math.round(((product.price - product.discont_price) / product.price) * 100)}%
                  </span>
                </>
              )}
            </div>
            <div className={styles.counterAndButton}>
              <Counter quantity={quantity} setQuantity={setQuantity} />
              <AddButton onClick={handleAddToCart} />
            </div>
            <div className={styles.productDescription}>
              <h3>Description</h3>
              <p
                className={`${styles.productDescriptionText} ${isExpanded ? styles.expanded : styles.collapsed}`}
              >
                {product.description}
              </p>
              <button
                className={styles.readMoreButton}
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ display: product.description ? 'block' : 'none' }}
              >
                {isExpanded ? 'Close' : 'More'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
