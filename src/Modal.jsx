import React, { useEffect, useRef, useState } from 'react';
import './styles/modal.css';

const Modal = ({ isOpen, onClose, children, title }) => {

  const [isClosing, setIsClosing] = useState(false);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose && onClose();
      setIsClosing(false);
    }, 500);
  };

  return (
    <>
      {isOpen && (
        <div className={`overlay-modal ${isClosing ? 'fade' : 'show'}`}>
          <div className="modal">
            <div className="modal-content">
              <h3 className="title-modal">{title}</h3>
              {children}
            </div>
            <button className='close-modal' onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
