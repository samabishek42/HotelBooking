import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8080/api/v1/hotel/getAllHotels";

const fetchAllHotels = async (navigate) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No JWT token found in localStorage");
      return;
    }

    const authToken = `Bearer ${token}`;
    console.log("Authorization Token:", authToken);

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: authToken,
      },
    });

    return response.data;
  } catch (err) {
    if (err.response) {
      // Check if the response exists and status is 401
      if (err.response.status === 401) {
        toast.error("Token invalid or your session has expired.");
        console.log("Navigating to login");
        navigate("/login", {
          state: {
            errorMessage: "Token invalid or your session has expired.",
          },
        }); // Redirect to login page
      }
      console.error("Error:", err.response.data);
    } else {
      // If no response is available, log the error message
      console.error("Error:", err.message);
    }
    toast.error("Error fetching hotels or hotel data");
  }
};

export default fetchAllHotels;
