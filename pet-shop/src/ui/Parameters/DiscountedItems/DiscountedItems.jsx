import React from 'react';
import styles from './DiscountedItems.module.css';

export default function DiscountedItems({ includeDiscount, setIncludeDiscount }) {
  const handleCheckboxChange = (e) => {
    setIncludeDiscount(e.target.checked);
  };

  return (
    <label className={styles.discountedItems}>
      <span>Discounted items</span>
      <input
        className={styles.customCheckbox}
        type="checkbox"
        checked={includeDiscount}
        onChange={handleCheckboxChange}
      />
      <span></span>
    </label>
  );
};
