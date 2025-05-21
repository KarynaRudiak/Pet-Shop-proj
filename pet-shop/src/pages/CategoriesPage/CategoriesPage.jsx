import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import styles from "./CategoriesPage.module.css";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const currentPath = location.pathname.split("/").filter((path) => path);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/categories/all`);
                setCategories(response.data);


            } catch (error) {
                setError("Error:"), error;
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <p>Loading categories...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div className="globalContainer">
            <div className={styles.container}>
                <div className={styles.path}>
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                    >
                        Main Page
                    </NavLink>
                    <div className={styles.titleLine}></div>
                    <NavLink
                        to="/categories"
                        className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                    >
                        Categories
                    </NavLink>
                </div>

                <div className={styles.title}>
                    <h2>Categories</h2>
                </div>

                <ul className={styles.gridContainer}>
                    {categories.map((category) => (
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
