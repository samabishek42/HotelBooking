import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8080"; // Base URL for the backend API

// Fetch bookings by hotelId and checkInDate
export const fetchBookings = async (hotelId, checkInDate, navigate) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    toast.error("Authentication token not found. Please log in.");
    console.log("Navigating to login...");
    navigate("/login"); // Redirect to login page
    return null;
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/v1/booking/getAll/${hotelId}/${checkInDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      toast.error("Token invalid or your session has expired.");
      console.log("Navigating to login...");
      navigate("/login", {
        state: {
          errorMessage: "Token invalid or your session has expired.",
        },
      }); // Redirect to login page
      return null;
    }
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

// Save a new booking
export const saveBooking = async (bookingDetails, navigate) => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.post(
      `${API_URL}/api/v1/booking/save`,
      bookingDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Assuming the response contains a success message
  } catch (error) {
    if (error.response && error.response.status === 401) {
      toast.error("Token invalid or your session has expired.");
      console.log("Navigating to login...");
      navigate("/login", {
        state: {
          errorMessage: "Token invalid or your session has expired.",
        },
      }); // Redirect to login page
      return null;
    }
    console.error("Error saving booking:", error);
    throw error; // Handle errors in the calling component
  }
};
