// Sidebar.jsx
import React, { useState } from 'react';
import AddTrainForm from './AddTrainForm';
import { BsGrid1X2Fill, BsFillArchiveFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';

const Sidebar = ({
  openSidebarToggle,
  OpenSidebar,
  handleReservationClick,
  handleUserListClick,
  handleOrderClick,
  handleTrainListClick,
  handleMissingReportClick,
  handleEmergenciesClick, // Add this prop
  paymentsData
}) => {
  const [showPayments, setShowPayments] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [showTrainList, setShowTrainList] = useState(false);
  const [showMissingReport, setShowMissingReport] = useState(false);
  const [showEmergencies, setShowEmergencies] = useState(false); // Add missing state

  const [showAddTrain, setShowAddTrain] = useState(false); // New state for showing AddTrainForm

  const toggleAddTrain = (e) => {
    e.preventDefault();
    setShowAddTrain(!showAddTrain);
  };





  const togglePayments = async (e) => {
    e.preventDefault();
    try {
      await handleReservationClick();
      setShowPayments(!showPayments);
    } catch (error) {
      console.error('Error fetching payments data:', error.message);
    }
  };

  const toggleUserList = async (e) => {
    e.preventDefault();

    try {
      await handleUserListClick();
      setShowUserList(!showUserList);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };
  const toggleOrder = async (e) => {
    e.preventDefault();

    try {
      await handleOrderClick(); // Assuming you have a handleOrderClick function
      setShowOrder(!showOrder);
      //setShowPayments(false); // Close Payments section when navigating to Order
      //setShowUserList(false); // Close User List when navigating to Order
    } catch (error) {
      console.error('Error fetching order data:', error.message);
    }
  };
  const toggleTrainList = async (e) => {
    e.preventDefault();

    try {
      await handleTrainListClick(); // Implement this function in your AdminApp component
      setShowTrainList(!showTrainList);
      //setShowPayments(false); // Close Payments section when navigating to Train List
      //setShowUserList(false); // Close User List when navigating to Train List
      //setShowOrderList(false); // Close Order List when navigating to Train List
    } catch (error) {
      console.error('Error fetching train data:', error.message);
    }
  };
  const toggleMissingReport = async (e) => {
    e.preventDefault();
  
    try {
      await handleMissingReportClick();
      setShowMissingReport(!showMissingReport);
    } catch (error) {
      console.error('Error fetching missing person reports:', error.message);
    }
  };

  const toggleEmergencies = async (e) => {
    e.preventDefault();
  
    try {
      await handleEmergenciesClick();
      setShowEmergencies(!showEmergencies);
    } catch (error) {
      console.error('Error fetching emergencies data:', error.message);
    }
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          ADMINPANEL
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href="">
            <BsGrid1X2Fill className='icon' /> Dashboard
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#" onClick={togglePayments}>
            <BsFillArchiveFill className='icon' /> Reservation
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#" onClick={toggleUserList}>
            <BsListCheck className='icon' /> User List
          </a>
          {showUserList && (
            <div className="user-list-details">
              {/* Render user list details here */}
            </div>
          )}
        </li>
        <li className='sidebar-list-item'>
           <a href="#" onClick={toggleTrainList}>
              <BsPeopleFill className='icon' /> Train List
            </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#" onClick={toggleOrder}>
            <BsMenuButtonWideFill className='icon' /> Order
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#" onClick={toggleMissingReport}>
            <BsPeopleFill className='icon' /> Missing Report
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#" onClick={toggleEmergencies}>
            <BsPeopleFill className='icon' /> Emergencies
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#" onClick={toggleAddTrain}>
            <BsFillGearFill className='icon' /> Add Train
          </a>
        </li>

      
        {showAddTrain && <AddTrainForm setShowAddTrain={setShowAddTrain} />}
      </ul>
    </aside>
  );
}

export default Sidebar;
