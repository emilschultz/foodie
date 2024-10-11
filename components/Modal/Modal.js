import { useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styles from './Modal.module.css';

const Modal = ({ show, onClose, children }) => {

useEffect(()=>{
  const handleEscape = (e) => {
    if(e.key === 'Escape') {
      onClose()
    }
  }

    if(show){
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
},[onClose, show])

if (!show) return null;
  
    return (
      <div className={styles.backdrop} onClick={onClose}>
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          <button className={styles.close} onClick={onClose}><AiOutlineCloseCircle />
          </button>
          {children}
        </div>
      </div>
    );
  };
  

  export default Modal