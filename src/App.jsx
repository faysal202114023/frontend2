import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Ticket from "./Components/Ticket";
import AvailableTrain from "./Components/availableTrain";
import SeatDetails from "./Components/SeatDetails";
import Payment from "./Components/Payment";
import Foodcart from "./Components/Foodcart";
import AdminApp from "./AdminApp";

import Emergencies from "./Components/Emergencies";
import MissingPersonReport from "./Components/MissingPersonReport";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/availableTrain" element={<AvailableTrain />} />
          <Route path="/sitDetails/:trainRouteId" element={<SeatDetails />} />
          <Route path="/payment/:ticketId" element={<Payment />} />
          <Route path="/Food-cart" element={<Foodcart />} />
          <Route path="/admin" element={<AdminApp />} />
          <Route path="/emergency" element={<Emergencies />} />
          <Route path="/missingemergency" element={<MissingPersonReport />} />

          
          
          

        </Routes>
      </main>
    </BrowserRouter>
    </div>
  );
}

export default App;