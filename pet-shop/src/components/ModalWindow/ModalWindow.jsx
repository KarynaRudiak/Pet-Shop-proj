import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/slices/modalSlice';
import styles from './ModalWindow.module.css';
import Close from '../../assets/icons/ix.svg';

export default function ConnectedModal() {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  if (!modal.isOpen) return null; 

  return (
    <div className={styles.Modal} onClick={handleClose}>
      <div className={styles.ModalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.CloseButton} onClick={handleClose} aria-label="Close modal">
          <img src={Close} alt="x" />
        </button>
        <h2>{modal.title}</h2>
        <div>
          {modal.content.map((child, index) => <p key={index}>{child}</p>)}
        </div>
      </div>
    </div>
  );
}
