// MedicalReporter.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MedicalReporter.css'; // Import the MedicalReporter CSS file
import { useNavigate } from 'react-router-dom';
const MedicalReporter = () => {
  const [reporterName, setReporterName] = useState('');
  const [missingPersonName, setMissingPersonName] = useState('');
  const [photos, setPhotos] = useState([]); // Initialize the photos state
  const navigate = useNavigate();

  const handleReporterNameChange = (event) => {
    setReporterName(event.target.value);
  };

  const handleMissingPersonNameChange = (event) => {
    setMissingPersonName(event.target.value);
  };

  const handlePhotoUpload = async (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);
  
    const base64Promises = fileArray.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
  
        reader.onload = () => {
          // Convert base64 to Blob
          const blob = dataURItoBlob(reader.result);
          resolve(blob);
        };
  
        reader.onerror = reject;
  
        reader.readAsDataURL(file);
      });
    });
  
    try {
      const blobs = await Promise.all(base64Promises);
  
      // Update the state with the Blobs
      setPhotos(blobs);
    } catch (error) {
      console.error('Error reading files:', error);
    }
  };
  
  // Helper function to convert data URI to Blob
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
  
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([ab], { type: mimeString });
  }
  
  

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('reporterName', reporterName);
      formData.append('missingPersonName', missingPersonName);
  
      // Directly append the array of photos
      photos.forEach((photo, index) => {
        formData.append('photos', new Blob([photo]), 'photo.png');
      });
  
      // Log the formData to check its structure before sending
      console.log('FormData:', formData);
  
      const response = await axios.post('http://localhost:5000/save-missing-person-report', formData);
  
      // Handle the response as needed
      console.log('Response:', response.data);
  
      // Optionally, reset the form after successful submission
      setReporterName('');
      setMissingPersonName('');
      setPhotos([]);
    } catch (error) {
      console.error('Error submitting missing person report:', error);
      // Handle error as needed
    }
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
    <div className="medical-reporter-container relative w-screen">
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
          <Link to="/emergency">Emergencies</Link>
          </li>
        </ul>
        <div className="logout-btn" onClick={handleLogout}>
          Logout
        </div>
      </nav>

      <div className="background-image absolute top-0 left-0 w-full h-full bg-[url('/bg.jpeg')] bg-cover opacity-80"></div>
      <div className="medical-report-form flex flex-col bg-opacity-100 w-[25rem] bg-slate-900 p-8 rounded-xl relative z-10">
        <h2 className="text-2xl text-white pb-12">Medical Reporter</h2>
        <label className="text-white mb-4">Reporter Name:</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={reporterName}
          onChange={handleReporterNameChange}
          className="mb-8 p-4 rounded-md"
        />
        <label className="text-white mb-4">Missing Person Name:</label>
        <input
          type="text"
          placeholder="Enter the missing person's name"
          value={missingPersonName}
          onChange={handleMissingPersonNameChange}
          className="mb-8 p-4 rounded-md"
        />


        <label className="text-white mb-4">Upload Photos:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          multiple
          className="mb-8 p-4 rounded-md"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-6 rounded-full"
        >
          Submit Report
        </button>
 
      </div>
    </div>
  );
};

export default MedicalReporter;
