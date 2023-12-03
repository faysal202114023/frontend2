import React, { useEffect, useState } from "react";
import "./ticket.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import AvailableTrain from "./availableTrain";


function Ticket() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [stationList, setStationList] = useState([]);
  const [fromStationSuggestions, setFromStationSuggestions] = useState([]);
  const [toStationSuggestions, setToStationSuggestions] = useState([]);
  const [trainRoutes, setTrainRoutes] = useState([]);

  const fetchStationNames = async () => {
    try {
      const apiEndpoint = 'http://localhost:5000/allStationNames';
      const response = await axios.get(apiEndpoint);
      const stationNames = response.data;
      setStationList(stationNames);
    } catch (error) {
      console.error('Error fetching station names:', error);
    }
  };

  const searchTrainRoutes = async () => {
    // console.log(from, to);
    const apiEndpoint = 'http://localhost:5000/trainRouteSearch';
    try {
      const response = await axios.get(apiEndpoint, {
        params: {
          from,
          to,
        },
      });
      setTrainRoutes(response.data);
      // if (!trainRoutes || trainRoutes.length === 0) {
      //   console.log("No train routes found.");
      // } else {
      //   console.log('Train Routes:', trainRoutes);
      // }
    } catch (error) {
      console.error("Error:", error); // Log the error for further debugging
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
  
  

  const clearFromSuggestions = () => {
    setFromStationSuggestions([]);
  };

  const clearToSuggestions = () => {
    setToStationSuggestions([]);
  };

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 10);

  useEffect(() => {
    const today = new Date();
    const todayFormatted = today.toISOString().split("T")[0];
    setJourneyDate(todayFormatted);
    fetchStationNames();
  }, []);

  const handleFromChange = (value) => {
    setFrom(value);
    const suggestions = stationList.filter(station => station.toLowerCase().includes(value.toLowerCase()));
    setFromStationSuggestions(suggestions);
    
  };
  const handleToChange = (value) => {
    setTo(value);
    const suggestions = stationList.filter(station => station.toLowerCase().includes(value.toLowerCase()));
    setToStationSuggestions(suggestions);
  };

  const handleSearch = () => {
    console.log(`Searching for trains from ${from} to ${to} on ${journeyDate} in class ${selectedClass}`);
    searchTrainRoutes();
  };

  return (
    <>
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
    {trainRoutes.length > 0 ? (
      <AvailableTrain trainRoutes={trainRoutes} />
      ):
      <div className="bg-[url('/ticketBg.jpeg')] h-screen bg-cover bg-opacity-80 flex flex-col justify-center items-center text-black">

      {/* {console.log(trainRoutes,"sflks")} */}
      
      <div className="w-96 h-auto rounded-xl text-white bg-slate-800 p-7">
        <h2 className="text-2xl mb-4">Train Search</h2>
        <div className="mb-4">
          <label htmlFor="from" className="block">From:</label>
          <div className="relative">
            <input
              type="text"
              id="from"
              value={from}
              className="w-full py-2 px-4 bg-gray-100 rounded text-black"
              onChange={(e) => handleFromChange(e.target.value)}
              onClick={clearToSuggestions}
            />
            {fromStationSuggestions.length > 0 && (
              <ul className="absolute mt-1 w-full bg-white text-black border z-50 border-gray-300 rounded">
                {fromStationSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                    onClick={() => {
                      setFrom(suggestion);
                      clearFromSuggestions();
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="to" className="block">To:</label>
          <div className="relative">
            <input
              type="text"
              id="to"
              value={to}
              className="w-full py-2 z-0 px-4 bg-gray-100 rounded text-black"
              onChange={(e) => handleToChange(e.target.value)}
              onClick={clearFromSuggestions}
            />
            {toStationSuggestions.length > 0 && (
              <ul className="absolute mt-1 w-full bg-white border border-gray-300 text-black rounded">
                {toStationSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-indigo-100 cursor-pointer text-black"
                    onClick={() => {
                      setTo(suggestion);
                      clearToSuggestions();
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="journeyDate" className="block">Date of Journey:</label>
          <input
            type="date"
            id="journeyDate"
            value={journeyDate}
            className="w-full py-2 px-4 bg-gray-100 rounded text-black"
            min={new Date().toISOString().split("T")[0]}
            max={maxDate.toISOString().split("T")[0]}
            onChange={(e) => setJourneyDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="selectedClass" className="block">Choose a Class:</label>
          <select
            id="selectedClass"
            value={selectedClass}
            className="w-full py-2 px-4 text-black bg-gray-100 rounded"
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select a Class</option>
            <option value="AC">AC</option>
            <option value="Shovan">Shovan</option>
            <option value="S_Chair">S Chair</option>
            <option value="Ac_berth">AC Berth</option>
          </select>
        </div>
        <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Search Trains
        </button>
      </div>
     



    </div>
    



                  }
                  </>
  );
}

export default Ticket;
