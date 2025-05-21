import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import styles from './CategoriesBlock.module.css';

const BASE_URL = import.meta.env.VITE_API_URL;

export default function CategoriesBlock() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/categories/all`);
                setCategories(response.data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="globalContainer">
            <div className={styles.content}>
                <div className={styles.title}>
                    <h2>Categories</h2>
                    <div className={styles.titleLine}></div>
                    <Link to="/categories" className={styles.titleBtn}>All categories</Link>
                </div>

                <ul className={styles.gridContainer}>
                    {categories.slice(0, 4).map((category) => (
                        <li key={category.id} className={styles.gridItem}>
                            <Link to={`/categories/${category.id}`} className={styles.categoryItem}>
                                <img
                                    src={`${BASE_URL}/${category.image}`}
                                    alt={category.title}
                                    className={styles.categoryImg}
                                />
                                <h3 className={styles.categoryName}>{category.title}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
