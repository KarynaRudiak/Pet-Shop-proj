import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProductCard from '../../../components/ProductCard/ProductCard';
import Filter from '../../../ui/Parameters/Filter/Filter';
import SelectSort from '../../../ui/Parameters/SelectSort/SelectSort';
import styles from './DiscountedProductsPage.module.css';
import { NavLink } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL;

export default function DiscountedProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortType, setSortType] = useState("default");
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [includeDiscount, setIncludeDiscount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${BASE_URL}/products/all`);
        const discountedProducts = response.data.filter(product => product.discont_price);
        setProducts(discountedProducts);
      } catch (error) {
        setError("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filterAndSortProducts = () => {
      const filtered = products.filter(product => {
        const productPrice = product.discont_price || product.price;
        if (productPrice < minPrice || productPrice > maxPrice) return false;
        if (includeDiscount && !product.discont_price) return false;
        return true;
      });

      const sorted = filtered.sort((a, b) => {
        if (sortType === "newest") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        if (sortType === "priceHighToLow") {
          return (b.discont_price || b.price) - (a.discont_price || a.price);
        }
        if (sortType === "priceLowToHigh") {
          return (a.discont_price || a.price) - (b.discont_price || b.price);
        }
        return 0;
      });

      setFilteredProducts(sorted);
    };

    filterAndSortProducts();
  }, [products, minPrice, maxPrice, includeDiscount, sortType]);

  const handleResetFilters = () => {
    setMinPrice('');
    setMaxPrice(Infinity);
    setIncludeDiscount(false);
    setSortType('default');
  };
  
  

  if (isLoading) return <p>Loading...</p>;
  if (error) return (
    <div style={{
      color: 'red',
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: '50px'
    }}>
      {error}
    </div>
  );

  return (
    <div className="globalContainer">
      <div className={styles.discountedProductsPage}>
        <div className={styles.path}>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? styles.activeLink : styles.link}
          >
            Main Page
          </NavLink>
          <div className={styles.titleLine}></div>
          <NavLink
            to="/sale"
            className={({ isActive }) => isActive ? styles.activeLink : styles.link}
          >
            All Sales
          </NavLink>
        </div>
        <div className={styles.pageTitle}>
          <h2>Discounted items</h2>
        </div>
        <div className={styles.filterContainer}>
          <Filter
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            includeDiscount={includeDiscount}
            setIncludeDiscount={setIncludeDiscount}
          />
          <div className={styles.selectSort}>
            <span className={styles.sortTitle}>Sorted by</span>
            <SelectSort sortType={sortType} setSortType={setSortType} />
          </div>
          <button className={styles.resetButton} onClick={handleResetFilters}>Reset</button>
        </div>
        <div className={styles.productsContainer}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
          }
        </div>
      </div>
    </div>
  );
};
