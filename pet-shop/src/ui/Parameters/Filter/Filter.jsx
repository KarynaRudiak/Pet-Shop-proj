import React from "react";
import styles from "./Filter.module.css";

export default function Filter({ minPrice, maxPrice, setMinPrice, setMaxPrice }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "minPrice") {
      setMinPrice(value);
    } else if (name === "maxPrice") {
      setMaxPrice(value);
    }
  };

  return (
    <div className={styles.filterPrice}>
      <span>Price</span>
      <label>
        <input
          name="minPrice"
          type="number"
          placeholder="From"
          value={minPrice}
          onChange={handleChange}
        />
      </label>
      <label>
        <input
          name="maxPrice"
          type="number"
          placeholder="To"
          value={maxPrice}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
