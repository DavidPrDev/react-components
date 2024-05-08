import React, { useState } from 'react';
import './modal.css';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, direction, setOpen, children, title, confirm = false, setConfirm = null }) => {

  const [isClosing, setIsClosing] = useState(false);

  const handleCloseModal = () => {

    setIsClosing(true);

    setTimeout(() => {

      setOpen(false)
      setIsClosing(false);
    }, 200);

  };

  const handleConfirm = () => {

    setIsClosing(true);

    setTimeout(() => {
      setOpen(false)
      setConfirm(true)
      setIsClosing(false);
    }, 200);
  };

  const rules = {
    'left': ['out-left', 'in-left'],
    'right': ['out-right', 'in-right'],
    'top': ['out-top', 'in-top'],
    'bottom': ['out-bottom', 'in-bottom']
  };
  const animationDinamic = `
    .in-${direction}{
      animation: in-${direction} 0.35s ease-in-out ;
      position: relative;
  }
  
  .out-${direction}{
      animation: out-${direction} 0.35s ease-in-out ;
      position: relative;
  }
  
  @keyframes in-${direction} {
      from {
        ${direction}: -100%;
          opacity: 0;
       }
     
      to{ 
        ${direction}: 0%;
       opacity: 1;
      }
  }
  @keyframes out-${direction} {
      from {
        ${direction}: 0%;
          opacity: 1;
       }
     
      to{ 
        ${direction}: -100%;
       opacity: 0;
      }
  }`;

  return (
    <>
      {isOpen && (
        <>
          <style>{animationDinamic}</style>
          <div className={`overlay-modal ${isClosing ? 'fade' : 'show'}`}>
            <div className={`modal ${isClosing ? rules[direction][0] : rules[direction][1]}`}>
              <h3 className="title-modal">{title}</h3>
              <div className='separator'></div>
              <div className="modal-content">

                {children}
              </div>
              <div className='separator'></div>
              <div className='btn-container'>
                {!confirm ?
                  <button className='btn close-modal-full' onClick={() => handleCloseModal()}>Close</button>
                  :
                  <>
                    <button className='btn confirm-modal' onClick={() => handleConfirm()}>Confirm</button>
                    <button className='btn close-modal-mid' onClick={() => handleCloseModal()}>Close</button>
                  </>
                }
              </div>
            </div>
          </div>
        </>)}

    </>
  );
};
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  direction: PropTypes.oneOf(['left', 'right', 'top', 'bottom']).isRequired,
  setOpen: PropTypes.func.isRequired,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  confirm: PropTypes.bool,
  setConfirm: PropTypes.func
};
export default Modal;
