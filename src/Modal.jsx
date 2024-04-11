import React, { useEffect, useRef, useState } from 'react';
import './styles/modal.css';

const Modal = ({ isOpen, direction, setOpen, children, title }) => {

  const [isClosing, setIsClosing] = useState(false);

  const handleCloseModal = () => {

    setIsClosing(true);

    setTimeout(() => {

      setOpen(false)
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
      animation: in-${direction} 0.3s ;
      position: relative;
  }
  
  .out-${direction}{
      animation: out-${direction} 0.3s  ;
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
        ${direction}: -0%;
          opacity: 0;
       }
     
      to{ 
        ${direction}: -100%;
       opacity: 1;
      }
  }`;

  return (
    <>
      {isOpen && (
        <>
          <style>{animationDinamic}</style>
          <div className={`overlay-modal ${isClosing ? 'fade' : 'show'}`}>
            <div className={`modal ${isClosing ? rules[direction][0] : rules[direction][1]}`}>
              <div className="modal-content">
                <h3 className="title-modal">{title}</h3>
                {children}
              </div>
              <button className='close-modal' onClick={() => handleCloseModal()}>Close</button>
            </div>
          </div>
        </>)}
    </>
  );
};

export default Modal;
