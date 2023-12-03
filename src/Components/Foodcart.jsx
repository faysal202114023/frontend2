// App.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Foodcart.css';
import FoodItem from "../food/FoodItem"
import Cart from '../food/Cart';
import ConfirmationDialog from '../food/ConfirmationDialog';
import axios from 'axios';


var xyz = localStorage.email;
console.log('Email from localStorage:', xyz);

const foodItems = [
  { id: 1, name: 'plain rice', price: 20 },
  { id: 2, name: 'Beef biryani', price: 200 },
  { id: 3, name: 'Chicken biryani', price: 120 },
  { id: 4, name: 'Chicken curry', price: 100 },
  { id: 5, name: 'Beef curry', price: 120 },
  { id: 6, name: 'Coca-cola', price: 25 },
  { id: 7, name: 'Water', price: 20 },
  { id: 8, name: 'Tea', price: 20 },
];

function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [cabinNumber, setCabinNumber] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const addToCart = (item) => {
    const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (itemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    setTotal(total + item.price);
  };

  const removeFromCart = (itemId) => {
    const removedItem = cart.find((item) => item.id === itemId);

    if (removedItem) {
      if (removedItem.quantity > 1) {
        const updatedCart = [...cart];
        const itemIndex = cart.findIndex((item) => item.id === itemId);
        updatedCart[itemIndex].quantity -= 1;
        setCart(updatedCart);
      } else {
        const updatedCart = cart.filter((item) => item.id !== itemId);
        setCart(updatedCart);
      }
      setTotal(total - removedItem.price);
    }
  };

  const handleOrderConfirm = async () => {
    try {
      // Prepare order data for API call
      const orderData = {
        total: total,
        cabinNumber: cabinNumber,
        seatNumber: seatNumber,
        email: xyz, // Include the email in the order data
      };
  
      // Log orderData for debugging
      console.log('Order Data:', orderData);
  
      // Make the API call to store the order using Axios
      const response = await axios.post('http://localhost:5000/store-order', orderData);
  
      // Check if the response is successful (status code 2xx)
      if (response.status === 201) {
        console.log('Order placed successfully');
        alert('Order placed successfully');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        localStorage.removeItem('bookedSeatLength');

        navigate('/');
        // Optionally, you can perform some actions upon successful order placement
      } else {
        // Handle the case where the server returns an error
        console.error('Failed to place order:', response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const clearCart = () => {
    setCart([]);
    setTotal(0);
  };

  return (
    <div className="foods">
      <h1 className="app-title">Food Cart</h1>
      <div className="food-items">
        {foodItems.map((item) => (
          <FoodItem key={item.id} item={item} addToCart={addToCart} />
        ))}
      </div>
      <Cart cart={cart} total={total} removeFromCart={removeFromCart} clearCart={clearCart} />
      <button onClick={() => setDialogOpen(true)} className="confirm-button">
        Confirm Order
      </button>
      <ConfirmationDialog
        open={isDialogOpen}
        handleClose={() => setDialogOpen(false)}
        handleConfirm={handleOrderConfirm}
        cabinNumber={cabinNumber}
        seatNumber={seatNumber}
        setCabinNumber={setCabinNumber}
        setSeatNumber={setSeatNumber}
      />
    </div>
  );
}

export default App;
