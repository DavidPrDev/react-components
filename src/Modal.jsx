import React from 'react';
import './styles/modal.css'
const Modal = ({ isOpen, onClose, children, title }) => {

  const closeModal = () => {
    onClose && onClose();
  };

  return (
    <>
      {isOpen && (
        <div className='overlay-modal'>
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
