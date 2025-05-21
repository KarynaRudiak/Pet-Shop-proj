import React from 'react';
import styles from './Counter.module.css';

export default function Counter({ quantity, setQuantity }) {
  const handleIncrement = (e) => {
    e.stopPropagation();
    setQuantity(quantity + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    setQuantity(quantity > 0 ? quantity - 1 : 0);
  };

  const handleChange = (e) => {
    e.stopPropagation();
    setQuantity(Number(e.target.value));
  };

  return (
    <div className={styles.counterContainer}>
      <button className={styles.button} onClick={handleDecrement}></button>
      <input 
        type="number" 
        value={quantity} 
        onChange={handleChange} 
        className={styles.quantityInput}
        min="1"
        onFocus={(e) => e.stopPropagation()}
      />
      <button className={styles.button} onClick={handleIncrement}></button>
    </div>
  );
};

