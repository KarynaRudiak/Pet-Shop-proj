import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import ProductCard from "../../../components/ProductCard/ProductCard";
import Filter from "../../../ui/Parameters/Filter/Filter";
import DiscountedItems from "../../../ui/Parameters/DiscountedItems/DiscountedItems";
import SelectSort from "../../../ui/Parameters/SelectSort/SelectSort";
import styles from "./ProductsByCategoryPage.module.css";

const API_URL = import.meta.env.VITE_API_URL;


export default function ProductsByCategoryPage() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [includeDiscount, setIncludeDiscount] = useState(false);
    const [sortType, setSortType] = useState("default");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${API_URL}/categories/${categoryId}`);

                setCategory(response.data.category);
                setProducts(response.data.data);

            } catch (error) {
                setError("Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);


    const filteredProducts = products
        .filter((product) => {
            const productPrice = product.discont_price || product.price;
            if (productPrice < minPrice || productPrice > maxPrice) return false;
            if (includeDiscount && !product.discont_price) return false;
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
        setMaxPrice(Infinity);
        setIncludeDiscount(false);
        setSortType('default');
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div className="globalContainer">
            <div className={styles.productsByCategoryPage}>
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
                    <NavLink to={`/categories/${categoryId}`} className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
                        {category?.title}
                    </NavLink>
                </div>

                <div className={styles.categoryPageTitle}>
                    <h2>{category?.title || "Category"}</h2>
                </div>

                <div className={styles.filterContainer}>
                    <Filter minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
                    <DiscountedItems includeDiscount={includeDiscount} setIncludeDiscount={setIncludeDiscount} />
                    <div className={styles.selectSort}>
                        <span className={styles.sortTitle}>Sorted</span>
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
}
