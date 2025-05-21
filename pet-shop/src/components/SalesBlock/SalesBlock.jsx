import axios from "axios";
import { useEffect, useState } from "react";

import styles from './SalesBlock.module.css';
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;


export default function SalesBlock() {
    const [discountedProducts, setDiscountedProducts] = useState([]);
    useEffect(() => {
        const fetchDicountedProducts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/products/all`);
                const filteredProducts = response.data.filter(product => product.discont_price !== null);
                setDiscountedProducts(filteredProducts.slice(0, 4));
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchDicountedProducts();
    }, []);

    const DiscountPerc = (price, discountPrice) => {
        if (price && discountPrice) {
            const discount = ((price - discountPrice) / price) * 100;
            return Math.round(discount);
        }
        return 0;
    };

    return (
        <div className="globalContainer">
            <div className={styles.salesContainer}>
                <div className={styles.title}>
                    <h2>Sale</h2>
                    <div className={styles.titleLine}></div>
                    <Link to='/sale' className={styles.titleBtn}>All sales</Link>
                </div>
            </div>

            <ul className={styles.productBox}>
                {discountedProducts.map(product => (
                    <li key={product.id} className={styles.productItem}>
                        <Link to={`/products/${product.id}`} className={styles.productLink}>
                            <div className={styles.productImageContainer}>
                                <img src={`${BASE_URL}/${product.image}`} alt={product.title} className={styles.productImg} />
                                <div className={styles.discountLabel}>
                                    -{DiscountPerc(product.price, product.discont_price)}%
                                </div>
                                <div className={styles.productInfo}>
                                    <h3 className={styles.title}>{product.title}</h3>
                                    <div className={styles.priceBox}>
                                        <span className={styles.discontPrice}>${product.discont_price}</span>
                                        <span className={styles.normallPrice}>${product.price}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}