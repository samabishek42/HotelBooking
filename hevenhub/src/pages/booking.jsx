import React from "react";
import CustomNavbar from "../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import "./booking.css"; // Assuming the CSS is in the same directory as your component.

const Booking = () => {
  const navigate = useNavigate();

  // Retrieve booking details from local storage
  const storedBookingDetails = localStorage.getItem("bookingDetails");
  console.log(storedBookingDetails);
  const bookingDetails = storedBookingDetails
    ? JSON.parse(storedBookingDetails)
    : null;
  console.log(bookingDetails);

  if (!bookingDetails) {
    return (
      <div className="text-center mt-4">
        <p>No booking details available. Please try booking again.</p>
        <button className="home-btn" onClick={() => navigate("/home")}>
          Back to Home
        </button>
      </div>
    );
  }

  // Destructure hotelDetails from bookingDetails
  const { hotelDetails } = bookingDetails;

  return (
    <div>
      <CustomNavbar />
      <div className="booking-page">
        <h1>Booking Details</h1>
        <div className="booking-details-container">
          {/* Hotel Details */}
          <div className="hotel-details">
            <p>
              <strong>Hotel Name:</strong> {hotelDetails.name}
            </p>
            <p>
              <strong>Address:</strong> {hotelDetails.address}
            </p>
            <p>
              <strong>City:</strong> {hotelDetails.city}
            </p>
            <p>
              <strong>Contact:</strong> {hotelDetails.mobile}
            </p>
            <p>
              <strong>Check-in Date:</strong> {bookingDetails.checkInDate}
            </p>
            <p>
              <strong>Check-out Date:</strong> {bookingDetails.checkOutDate}
            </p>
            <p>
              <strong>Total Amount:</strong> ₹{bookingDetails.totalAmount}
            </p>
            <p>
              <strong>Payment Method:</strong> {bookingDetails.payments}
            </p>
          </div>

          {/* Hotel Image */}
          <img
            src={hotelDetails.hotel_photo}
            alt={hotelDetails.name}
            className="hotel-image"
          />
        </div>

        <button className="home-btn" onClick={() => navigate("/home")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Booking;
