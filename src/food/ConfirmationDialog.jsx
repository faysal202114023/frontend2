// ConfirmationDialog.jsx
import React, { useRef } from 'react';
import './ConfirmationDialog.css';

function ConfirmationDialog({
  open,
  handleClose,
  handleConfirm,
  cabinNumber,
  setCabinNumber,
  setSeatNumber,
  navigate, // Add navigate as a prop
}) {
  const seatNoRef = useRef(); // Use useRef to create a ref

  const handleConfirmClick = () => {
    handleConfirm({ seatNumber: seatNoRef.current.value, cabinNumber });
    handleClose();
    // Add the navigation logic here
    navigate('/');
  };

  return (
    <div className={`custom-dialog ${open ? 'open' : ''}`}>
      <div className="custom-dialog-content">
        <h2>Confirmation</h2>
        <p>Please enter your seat number and cabin number.</p>
        <input
          ref={seatNoRef}
          type="text"
          placeholder="Seat No"
          onChange={(e) => setSeatNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cabin No"
          value={cabinNumber}
          onChange={(e) => setCabinNumber(e.target.value)}
        />

        <div className="dialog-actions">
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleConfirmClick}>Order Placed</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDialog;
