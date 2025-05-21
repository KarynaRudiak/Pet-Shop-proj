import { useState, useEffect } from "react";
import axios from "axios";

import ProductCard from "../../../components/ProductCard/ProductCard";
import Filter from "../../../ui/Parameters/Filter/Filter";
import DiscountedItems from "../../../ui/Parameters/DiscountedItems/DiscountedItems";
import SelectSort from "../../../ui/Parameters/SelectSort/SelectSort";
import styles from "./AllProducts.module.css";
import { NavLink } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function AllProducts() {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [includeDiscount, setIncludeDiscount] = useState(false);
  const [sortType, setSortType] = useState('default');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${BASE_URL}/products/all`);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
        setError("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const min = parseFloat(minPrice) || 0;
      const max = parseFloat(maxPrice) || Infinity;

      if (product.price < min || product.price > max) {
        return false;
      }

      if (includeDiscount && !product.discont_price) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
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

    const handleResetFilters = () => {
      setMinPrice('');
      setMaxPrice('');
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
      <div className={styles.allProductsPage}>
        <div className={styles.path}>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? styles.activeLink : styles.link}
          >
            Main Page
          </NavLink>
          <div className={styles.titleLine}></div>
          <NavLink
            to="/products"
            className={({ isActive }) => isActive ? styles.activeLink : styles.link}
          >
            All Products
          </NavLink>
        </div>
        <div className={styles.categoriesPageTitle}>
          <h2>All products</h2>
        </div>
        <div className={styles.filterContainer}>
          <Filter minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
          <DiscountedItems includeDiscount={includeDiscount} setIncludeDiscount={setIncludeDiscount} />
          <div className={styles.selectSort}>
            <span className={styles.sortTitle}>Sorted</span>
            <SelectSort sortType={sortType} setSortType={setSortType} />
          </div>
          <button className={styles.resetButton} onClick={handleResetFilters}>Reset</button>
        </div>
        <div className={styles.productsContainer}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
          }
        </div>
      </div>
    </div>
  );
}
