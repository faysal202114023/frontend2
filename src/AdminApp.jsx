import React, { useState } from 'react';
import "./Components/Admin/App.css";
import Header from "./Components/Admin/Header";
import Sidebar from "./Components/Admin/Sidebar";
import Home from "./Components/Admin/Home";
import Reservation from "./Components/Admin/Reservation";
import UserList from "./Components/Admin/UserList";
import OrderList from "./Components/Admin/OrderList";
import TrainList from "./Components/Admin/TrainList";
import MissingReport from './Components/Admin/MissingReport';
import EmergencyTable from './Components/Admin/EmergencyTable';

function AdminApp() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [paymentsData, setPaymentsData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [ordersData, setOrdersData] = useState(null);
  const [trainData, setTrainData] = useState(null);
  const [missingReportData, setMissingReportData] = useState(null);
  const [emergenciesData, setEmergenciesData] = useState(null);


  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleReservationClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/reservation');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Payments Data:', data);

      // Update state with the fetched data
      setPaymentsData(data);
      setUserData(null); // Reset user data when navigating to Reservation
    } catch (error) {
      console.error('Error fetching payments data:', error.message);
  
      const responseText = await error.response.text();
      console.log('Full response:', responseText);
    }
  };

  const handleUserListClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/user-list');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('User Data:', data);
  
      // Update state with the fetched user data
      setUserData(data);
      setPaymentsData(null); // Reset payments data when navigating to User List
    } catch (error) {
      console.error('Error fetching user data:', error.message);
  
      const responseText = await error.response.text();
      console.log('Full response:', responseText);
    }
  };

  const handleOrderClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/orders');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Orders Data:', data);

      setOrdersData(data);
      setPaymentsData(null);
      setUserData(null); // Reset other data when navigating to Order List
    } catch (error) {
      console.error('Error fetching orders data:', error.message);

      const responseText = await error.response.text();
      console.log('Full response:', responseText);
    }
  };

  // AdminApp.jsx
  const handleTrainListClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/train-list');
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const trainData = await response.json();
      setPaymentsData(null);
      setUserData(null);
      setOrdersData(null);
      setMissingReportData(null);
      setEmergenciesData(null);
      // Assuming you have a state setter function like setTrainData
      setTrainData(trainData);
  
      // You may perform additional actions based on the fetched data if needed
  
    } catch (error) {
      console.error('Error fetching train data:', error.message);
      // Handle the error, e.g., display an error message or log it
    }
  };
  const handleMissingReportClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/missing-person-reports');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const missingReportData = await response.json();
      console.log('Missing Report Data:', missingReportData);
  
      // Update state with the fetched missing person reports
      setMissingReportData(missingReportData);
      setPaymentsData(null);
      setUserData(null);
      setOrdersData(null);
      setTrainData(null);
    } catch (error) {
      console.error('Error fetching missing person reports:', error.message);
  
      const responseText = await error.response.text();
      console.log('Full response:', responseText);
    }
  };

  const handleEmergenciesClick = async () => {
    try {
      const emergenciesResponse = await fetch('http://localhost:5000/admin/emergencies');
      if (emergenciesResponse.ok) {
        const emergenciesData = await emergenciesResponse.json();
        setEmergenciesData(emergenciesData);
        setMissingReportData(null);
      setPaymentsData(null);
      setUserData(null);
      setOrdersData(null);
      setTrainData(null);


      }
    } catch (error) {
      console.error('Error fetching emergencies data:', error.message);
    }
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        handleReservationClick={handleReservationClick}
        handleUserListClick={handleUserListClick}
        handleOrderClick={handleOrderClick}
        handleTrainListClick={handleTrainListClick}
        handleMissingReportClick={handleMissingReportClick}
        handleEmergenciesClick={handleEmergenciesClick} // Pass handleEmergenciesClick to Sidebar
        paymentsData={paymentsData}
      />

      {/* Display appropriate component based on the selected menu item */}
      {paymentsData !== null ? (
        <Reservation paymentsData={paymentsData} />
      ) : userData !== null ? (
        <UserList userData={userData} />
      ) : ordersData !== null ? (
        <OrderList ordersData={ordersData} />
      ) : trainData !== null ? (
        <TrainList trainData={trainData} />
      ) : missingReportData !== null ? (
        <MissingReport missingReportData={missingReportData} />
      ) : emergenciesData !== null ? (
        <EmergencyTable emergenciesData={emergenciesData} />
      ) : (
        <Home />
      )}
    </div>
  );
}

export default AdminApp;