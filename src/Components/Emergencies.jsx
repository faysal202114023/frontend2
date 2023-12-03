// Emergencies.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Emergencies.css'; // Import the Emergencies CSS file

const Emergencies = () => {
  const [emergencyType, setEmergencyType] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  const handleEmergencyTypeChange = (e) => {
    setEmergencyType(e.target.value);
  };

  const handleAdditionalDetailsChange = (e) => {
    setAdditionalDetails(e.target.value);
  };
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/save-emergency',
        { emergencyType, additionalDetails }
      );
      console.log('Emergency Type:', emergencyType);
    console.log('Additional Details:', additionalDetails);
  
      console.log(response.data.message);
    } catch (error) {
      console.error('Error saving emergency report:', error.message);
    }
  };
  

 
  const handleReport = () => {
    navigate('/missingemergency');
  
  };


  const handleLogout = () => {
    // Clear user ID from local storage
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('bookedSeatLength');

    // Additional logout logic if needed
    // ...

    // Redirect or perform other actions
    navigate('/');
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="emergencies-container relative w-screen">
     <nav className="navbar">
        <div className="logo">
          <img src="/train-logo.jpg" alt="Train Logo" className="logo-img" />
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/food-cart">Food Cart</Link>
          </li>
          <li>
            <Link to="/emergencies">Emergencies</Link>
          </li>
        </ul>
        <div className="logout-btn" onClick={handleLogout}>
          Logout
        </div>
      </nav>

      <div className="background-image absolute top-0 left-0 w-full h-full bg-[url('/bg.jpeg')] bg-cover opacity-80"></div>
      <div className="emergency-form flex flex-col bg-opacity-100 w-[25rem] bg-slate-900 p-8 rounded-xl relative z-10">
        <h2 className="text-2xl text-white pb-4">Report an Emergency</h2>
        <label className="text-white mb-2">Emergency Type:</label>
        <select
          value={emergencyType}
          onChange={handleEmergencyTypeChange}
          className="p-4 rounded-md mb-4"
        >
          <option value="">Select Emergency Type</option>
          <option value="medical">Medical Emergency</option>
          <option value="fire">Fire Emergency</option>
        </select>

        <label className="text-white mb-2">Additional Details:</label>
        <textarea
          value={additionalDetails}
          onChange={handleAdditionalDetailsChange}
          className="p-4 rounded-md mb-4"
          placeholder="Provide additional details..."
        ></textarea>
<button
  onClick={handleSubmit}
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 rounded-full"
>
  Submit
</button>

<button
  onClick={handleReport}
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-6 rounded-full"
>
  Report for Missing Emergency
</button>

        
      </div>
    </div>
  );
};

export default Emergencies;
