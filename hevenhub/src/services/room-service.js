import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:8080/api/v1";

const fetchRoomsByHotelId = async (id, navigate) => {
  try {
    const token = localStorage.getItem("authToken"); // Assuming the token is stored in localStorage
    const response = await axios.get(
      `${API_BASE_URL}/rooms/getAllRooms/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the auth token to the headers
        },
      }
    );
    return response.data;
  } catch (error) {
    // Handle 404 specifically
    if (error.response && error.response.status === 404) {
      console.error("Rooms not found for the given hotel ID.");
      return []; // Return an empty array if rooms are not found
    } else if (error.response && error.response.status === 401) {
      toast.error("Token invalid or your session has expired.");
      console.log("Navigating to login...");
      navigate("/login", {
        state: {
          errorMessage: "Token invalid or your session has expired.",
        },
      }); // Redirect to login page
      return null;
    }
    console.error("Error fetching rooms by hotel ID:", error);
    throw error;
  }
};

export default fetchRoomsByHotelId;
