import { useState } from 'react';
import styles from './AddButton.module.css';

export default function AddButton({ onClick }) {
  const [state, setState] = useState('Add to cart');

  const handleClick = (e) => {
    setState('Added');
    if (onClick) {
      onClick(e);
    }

    setTimeout(() => setState('Add to cart'), 2000);
  };

  return (
    <button
      className={`${styles.addBlueButton} ${state === 'Added' ? styles.addedState : ''}`}
      onClick={handleClick}
    >
      {state}
    </button>
  );
}