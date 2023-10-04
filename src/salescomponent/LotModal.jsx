import React, { useState } from 'react';
import '../css/Modal.css'; // สร้างไฟล์ Modal.css สำหรับสไตล์ของ Modal

const LotModal = ({ isOpen, onClose, children }) => {
  return (
    isOpen && (
      <div className="modal modal-overlay">
        <div className="modal-Lot">
          {/* <span className="modal-close" onClick={onClose}>
            &times;
          </span> */}
          {children}
        </div>
      </div>
    )
  );
};

export default LotModal;