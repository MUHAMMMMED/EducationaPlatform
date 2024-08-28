import React from 'react';

function Modal({ isOpen, onClose, children }) {
  return (
    <div className={`modal ${isOpen ? 'modal--active' : ''}`}>
      <div className="modal-content">
        {children}
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
