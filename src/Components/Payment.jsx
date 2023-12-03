// Import necessary dependencies
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import "./payment.css"

const userId = localStorage.getItem("userId");
const Payment = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [ticketLink, setTicketLink] = useState("");
  const name = localStorage.email;
  var numberofseat=localStorage.bookedSeatLength;

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const calculatedAmount = 500 * numberofseat;
      // Make API call to store payment details in the backend
      await axios.post("http://localhost:5000/store-payment-details", {
        paymentMethod,
        amount: calculatedAmount,
        phoneNumber,
        password,
        ticketId,
      });

      window.alert('Payment done successfully!');
  
      // Make another API call to process payment and get ticket information
  
      // Do something with ticketLink and name
    } catch (error) {
      console.error('Error submitting payment:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const handleNumberOfSeatsChange = (e) => {
    const numberOfSeats = parseInt(e.target.value, 10);
    setAmount(isNaN(numberOfSeats) ? "" : (500 * numberOfSeats).toString());
    // Update numberofseat state or use it as needed in your component
  };

  const generateRealisticTicket = (pdf, ticketData) => {
    const styles = {
        title: {
            fontSize: 22,
            fontWeight: 'bold',
            color: '#004080',
            marginBottom: 10,
        },
        heading: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#006600',
            marginBottom: 10,
        },
        label: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#006600',
        },
        value: {
            fontSize: 14,
            marginLeft: 10,
            marginBottom: 5,
            color: '#333',
        },
        rowShade: {
            fillColor: '#f2f2f2',
        },
        footer: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#004080',
            marginTop: 20,
        },
    };

    pdf.setTextColor(styles.title.color);
    pdf.text('BANGLADESH RAILWAY', 20, 10, styles.title);

    pdf.setTextColor(styles.heading.color);
    pdf.text('Dear Passenger,', 20, 30, styles.heading);

    pdf.setTextColor(styles.label.color);
    pdf.text('Your e-ticket for the journey with Bangladesh Railway:', 20, 50, { maxWidth: 170 });

    pdf.setTextColor(styles.title.color);
    pdf.text('Details:', 20, 90, styles.title);

    // Function to add a row with label and value
    const addRow = (label, value, y) => {
        pdf.setFillColor(styles.rowShade.fillColor);
        pdf.rect(20, y, 170, 10, 'F');
        pdf.setTextColor(styles.label.color);
        pdf.text(label, 20, y + 5, styles.label);
        pdf.setTextColor(styles.value.color);
        pdf.text(value !== undefined ? String(value) : 'N/A', 120, y + 5, styles.value);
    };

    // Passenger Name
    addRow('Passenger Name:', ticketData.username, 105);

    // Contact Number
    addRow('Contact Number:', ticketData.phoneNo, 120);

    // Train Name
    addRow('Train Name:', ticketData.trainName, 135);

    // Station Name
    addRow('Station Name:', ticketData.stationName, 150);

    // Seat Number
    if (Array.isArray(ticketData.seatNumber) && ticketData.seatNumber.length > 0) {
        // If seatNumber is an array and has elements, display all booked seats
        addRow('Booked Seats:', ticketData.seatNumber.join(', '), 165);
    } else {
        // If it's not an array or is an empty array, display 'N/A'
        addRow('Seat Number:', 'N/A', 165);
    }

    // ... (repeat similar blocks for other ticket details)

    // Total Amount
    addRow('Total Amount:', `$${ticketData.payment.amount.toFixed(2)}`, 285);

    pdf.setTextColor(styles.footer.color);
    pdf.text('Thank you for choosing BANGLADESH RAILWAY', 20, 420, styles.footer);
  };

  const handleDownload = async () => {
    try {
      const userId = localStorage.getItem("userId");
      
      // Fetch the ticket link from the server
      const response = await axios.post(
        `http://localhost:5000/get-ticket-link`, {
          paymentMethod,
          amount,
          phoneNumber,
          password,
          ticketId,
          userId
        }
      );
  
      console.log(response.data);
  
      // Now, let's check if 'userId' is present in the request parameters
      const fetchedUserId = userId;
      if (fetchedUserId) {
        console.log("Fetched userId:", fetchedUserId);
      } else {
        console.log("userId not found in the request parameters");
      }
  
      // Check if 'userId' is present in the response data
      if (response.data.userId) {
        console.log("Fetched userId from response:", response.data.userId);
      } else {
        console.log("userId not found in the response data");
      }
  
      // Rest of your code for handling the ticket link and generating PDF
      const ticketData = {
        username: response.data.username,
        phoneNo: response.data.phoneNo,
        trainName: response.data.trainName,
        stationName: response.data.stationName,
        seatNumber: response.data.seatNumber,
        payment: response.data.payment,
      };
  
      // Create a new instance of jsPDF
      const pdf = new jsPDF();
  
      // Call the function to generate a realistic ticket
      generateRealisticTicket(pdf, ticketData);
  
      // Save the PDF with a specific filename
      pdf.save('train_ticket.pdf');
  
    } catch (error) {
      console.error('Error fetching ticket link:', error);
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

  return (
    <div className="bg-payment">
      <div className="w-screen flex justify-center items-center h-screen">
        <div className="payment-form">
          <h2 className="form-title">Payment Form</h2>
          <form onSubmit={handleSubmit}>
            {/* Payment Method Dropdown */}
            <select
              className="payment-input"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select Payment Method</option>
              <option value="Bkash">Bkash</option>
              <option value="Nagod">Nagod</option>
              <option value="Rocket">Rocket</option>
            </select>
            <input
              className="payment-input"
              type="text"
              placeholder="Number of Seats"
              value={numberofseat}
              onChange={handleNumberOfSeatsChange}
            />
            <input
              className="payment-input"
              type="text"
              placeholder="Amount"
              value={numberofseat * 500}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              className="payment-input"
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              className="payment-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submit-button">
              Proceed
            </button>
            <br />
            <button type="button" onClick={handleDownload} className="download-button">
              Download Ticket
            </button>
            <br />
            <button type="button" onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;