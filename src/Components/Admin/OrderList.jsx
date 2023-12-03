// OrderList.jsx
import React from 'react';
import "./OrderList.css";
import axios from 'axios';

function OrderList({ ordersData, handleDeleteOrder }) {
  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/orders/${orderId}`);
      window.location.reload();// Fetch updated order data after deletion
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className='order-list'>
      <h2>Order List</h2>
      <table>
        <thead>
          <tr>
            <th>Total</th>
            <th>Seat Number</th>
            <th>Cabin Number</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ordersData.map(order => (
            <tr key={order._id}>
              <td>{order.total}</td>
              <td>{order.seatNumber}</td>
              <td>{order.cabinNumber}</td>
              <td>{order.email}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>
                <button className='delete-button' onClick={() => handleDelete(order._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
