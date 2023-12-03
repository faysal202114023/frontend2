import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import "./sitDetails.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
var userId = localStorage.getItem("userId");
function SeatDetails() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const { trainRouteId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the booked seats array from the backend for the specific train route
    fetch(`http://localhost:5000/booked-seats/${trainRouteId}`)
      .then((response) => response.json())
      .then((data) => {
        setBookedSeats(data.bookedSeatNumbers);
      })
      .catch((error) => {
        console.error("Error fetching booked seats:", error);
      });
  }, [trainRouteId,]);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      // Unselect the seat
      const updatedSeats = selectedSeats.filter((seat) => seat !== seatNumber);
      setSelectedSeats(updatedSeats);
    } else if (selectedSeats.length < 4) {
      // Select the seat (maximum 4 seats)
      setSelectedSeats([...selectedSeats, seatNumber]);
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
  
  const handleBooking = async () => {
    try {
      // Handle the booking logic here
      // You can make a POST request to the backend to book the selected seats
      // Replace 'your-backend-endpoint' with the actual endpoint for booking
      const response = await axios.post('http://localhost:5000/book-ticket', {
        trainRouteId,
        bookedSeat: selectedSeats,
        userId
      });
  
      // Store the length of bookedSeat array in local storage
      localStorage.setItem('bookedSeatLength', selectedSeats.length);
  
      window.alert(response.data.message);
        
      navigate(`/payment/${response.data.ticketId}`);
    } catch (error) {
      // Handle any network or request error
      window.alert(error.message);
      console.error("Booking error:", error);
    }
  };
  

  // Generate 80 seat buttons in a 5x16 grid
  const seatData = Array.from({ length: 80 }, (_, i) => ({
    number: i + 1,
    color: bookedSeats.includes(i + 1) ? "gray" : selectedSeats.includes(i + 1) ? "blue" : "green",
  }));

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

      <div className='bg-[url("/sitDetails.jpg")] h-screen bg-cover flex flex-col justify-center items-center'>
        <div className="seat-selection rounded-md">
          <h1 className="text-4xl font-bold pb-8">Seat Details</h1>
          <div className="centered-grid">
            <div className="grid grid-cols-5 gap-4">
              {seatData.map((seat, index) => (
                <button
                  key={index}
                  className={`seat-button ${seat.color} m-0`}
                  disabled={seat.color === "gray"}
                  onClick={() => handleSeatClick(seat.number)}
                >
                  {seat.number}
                </button>
              ))}
            </div>
          </div>
          <div className="button-container">
            <button
              className="next-button bg-slate-800 hover-bg-slate-950"
              onClick={handleBooking}
              disabled={selectedSeats.length === 0}
            >
              Book Ticket
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SeatDetails;
