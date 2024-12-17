import React, { useState, useEffect } from "react";
import axios from "axios";
import fetchAllHotels from "../services/hotel-service";
import "./BookingHistory.css";
import CustomNavbar from "../components/navbar/navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Importing custom CSS for styles

const API_URL = "http://localhost:8080"; // Backend API URL

const BookingHistory = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId"); // Example user_id; dynamically fetch or replace this.

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No token found");
        }

        const bookingResponse = await axios.get(
          `${API_URL}/api/v1/booking/getOne/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const hotelData = await fetchAllHotels(navigator); // Fetch hotel data
        setBookings(bookingResponse.data);
        setHotels(hotelData);
      } catch (err) {
        if (err.response) {
          // Check if the response exists and status is 401
          if (err.response.status === 401) {
            toast.error("Token invalid or your session has expired.");
            console.log("Navigating to login...");
            navigate("/login", {
              state: {
                errorMessage: "Token invalid or your session has expired.",
              },
            }); // Redirect to login page
            return null;
          }
          console.error("Error:", err.response.data);
        } else {
          // If no response is available, log the error message
          console.error("Error:", err.message);
        }
        setError("Error fetching booking history or hotel data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const bookedBookings = bookings.filter(
    (booking) => booking.status && booking.status.toLowerCase() === "booked"
  );
  const cancelledBookings = bookings.filter(
    (booking) => booking.status && booking.status.toLowerCase() === "cancelled"
  );

  const getHotelDetails = (hotelId) => {
    return hotels.find((hotel) => hotel.id === hotelId) || {};
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.put(
        `${API_URL}/api/v1/booking/cancel/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // If successful, update the booking status to "Cancelled" locally
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.booking_id === bookingId
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );
      toast.error("Booking cancelled successfully");
    } catch (err) {
      if (err.response) {
        // Check if the response exists and status is 401
        if (err.response.status === 401) {
          toast.error("Token invalid or your session has expired.");
          console.log("Navigating to login...");
          navigate("/login"); // Redirect to login page
          return null;
        }
        console.error("Error:", err.response.data);
      } else {
        // If no response is available, log the error message
        console.error("Error:", err.message);
      }
      setError("Error fetching booking history or hotel data");
    }
  };

  const today = new Date();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <CustomNavbar />
      <div className="booking-history">
        <h2>Booking History</h2>

        <div className="booking-section">
          <h3>Booked</h3>
          {bookedBookings.length === 0 ? (
            <p>No booked bookings found.</p>
          ) : (
            <div className="booking-cards">
              {bookedBookings.map((booking, index) => {
                const hotelDetails = getHotelDetails(booking.hotel_id);
                const checkInDate = new Date(booking.checkInDate);
                return (
                  <div key={index} className="booking-card">
                    <div className="booking-details">
                      <h3>{hotelDetails.name || "Hotel Name Unavailable"}</h3>
                      <div className="booking-info">
                        <p>
                          <strong>Address:</strong>{" "}
                          {hotelDetails.address || "N/A"}
                        </p>
                        <p>
                          <strong>City:</strong> {hotelDetails.city || "N/A"}
                        </p>
                        <p>
                          <strong>Contact:</strong>{" "}
                          {hotelDetails.mobile || "N/A"}
                        </p>
                      </div>
                      <div className="booking-dates">
                        <p>
                          <strong>Check-in:</strong> {booking.checkInDate}
                        </p>
                        <p>
                          <strong>Check-out:</strong> {booking.checkOutDate}
                        </p>
                      </div>

                      <div className="booking-amount">
                        <p>
                          <strong>Total Amount:</strong> {booking.totalAmount}
                        </p>
                        <p>
                          <strong>Payment:</strong> {booking.payments}
                        </p>
                      </div>
                      {checkInDate > today && (
                        <button
                          onClick={() =>
                            handleCancelBooking(booking.booking_id)
                          }
                          className="cancel-btn"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="booking-section">
          <h3>Cancelled</h3>
          {cancelledBookings.length === 0 ? (
            <p>No cancelled bookings found.</p>
          ) : (
            <div className="booking-cards">
              {cancelledBookings.map((booking, index) => {
                const hotelDetails = getHotelDetails(booking.hotel_id);
                return (
                  <div key={index} className="booking-card">
                    <div className="booking-details">
                      <h3>{hotelDetails.name || "Hotel Name Unavailable"}</h3>
                      <div className="booking-info">
                        <p>
                          <strong>Address:</strong>{" "}
                          {hotelDetails.address || "N/A"}
                        </p>
                        <p>
                          <strong>City:</strong> {hotelDetails.city || "N/A"}
                        </p>

                        <p>
                          <strong>Contact:</strong>{" "}
                          {hotelDetails.mobile || "N/A"}
                        </p>
                      </div>
                      <div className="booking-dates">
                        <p>
                          <strong>Check-in:</strong> {booking.checkInDate}
                        </p>
                        <p>
                          <strong>Check-out:</strong> {booking.checkOutDate}
                        </p>
                      </div>

                      <div className="booking-amount">
                        <p>
                          <strong>Total Amount:</strong> {booking.totalAmount}
                        </p>
                        <p>
                          <strong>Payment:</strong> {booking.payments}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
