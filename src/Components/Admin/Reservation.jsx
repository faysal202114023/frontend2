// Frontend: Reservation.js
import React from 'react';
import './Reservation.css';
import axios from 'axios';

function Reservation({ paymentsData, handleReservationClick }) {
  const handleDelete = async (paymentId) => {
    try {
      // Make a DELETE request to the server to delete the payment record
      await axios.delete(`http://localhost:5000/reservation/${paymentId}`);

      // After deleting, fetch the updated reservation data
       window.location.reload();
      //await handleReservationClick();
    } catch (error) {
      console.error('Error deleting payment record:', error);
    }
  };

  return (
    <div className='reservation'>
      <h2>Reservation Details</h2>
      <table className='reservation-table'>
        <thead>
          <tr>
            <th>Payment Method</th>
            <th>Ticket ID</th>
            <th>Amount</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paymentsData.map((payment, index) => (
            <tr key={index}>
              <td>{payment.paymentMethod}</td>
              <td>{payment.ticketId}</td>
              <td>{payment.amount}</td>
              <td>{payment.phoneNumber}</td>
              <td>{payment.status}</td>
              <td>{new Date(payment.createdAt).toLocaleString()}</td>
              <td>
                <button className="delete-button"  onClick={() => handleDelete(payment._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reservation;
