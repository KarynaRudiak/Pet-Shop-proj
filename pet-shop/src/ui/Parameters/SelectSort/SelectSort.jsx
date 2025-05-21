import React, { useState, useRef, useEffect } from 'react';
import styles from './SelectSort.module.css';
import arrowIcon from '../../../assets/icons/arrow.svg';

export default function SelectSort({ sortType, setSortType }) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "default", label: "by default" },
    { value: "newest", label: "newest" },
    { value: "priceHighToLow", label: "price: high-low" },
    { value: "priceLowToHigh", label: "price: low-high" },
  ];

  const handleSelectChange = (newValue) => {
    setSortType(newValue);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.customSelectContainer}>
      <label className={styles.sortType} tabIndex="0">
        <div
          className={`${styles.customSelectHeader} ${isOpen ? styles.open : ''}`}
          onClick={handleToggle}
        >
          <span>
            {options.find(option => option.value === sortType)?.label || 'Select an option'}
          </span>
          <img
            src={arrowIcon}
            alt="Arrow"
            className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
          />
        </div>
        {isOpen && (
          <div className={styles.customSelectOptions}>
            {options.map(option => (
              <div
                key={option.value}
                className={`${styles.customSelectOption} ${sortType === option.value ? styles.selected : ''}`}
                onClick={() => handleSelectChange(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </label>
    </div>
  );
};


