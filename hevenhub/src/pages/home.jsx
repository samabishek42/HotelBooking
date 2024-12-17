import React, { useEffect, useState } from "react";
import fetchAllHotels from "../services/hotel-service"; // Assuming this is your fetch function
import CustomNavbar from "../components/navbar/navbar";
import HotelCard from "../components/hotel/hotelCard";
import { Container, Row, Spinner } from "react-bootstrap";
import "./home.css";
import Footer from "../components/footer/footer";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Assuming this is your React Router's navigate function

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const fetchedHotels = await fetchAllHotels(navigate);
        setHotels(fetchedHotels);
        localStorage.setItem("hotels", JSON.stringify(fetchedHotels)); // Store hotels in localStorage
        setErrorMessage(""); // Clear any previous error
      } catch (error) {
        console.error("Error fetching hotels:", error);
        if (error.response && error.response.status === 401) {
          setErrorMessage("Unauthorized access. Please log in again.");
        } else {
          setErrorMessage("An error occurred while fetching hotels.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="text-center mt-4">
        <h4>{errorMessage}</h4>
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    return (
      <div className="text-center mt-4">
        <h4>No hotels available</h4>
      </div>
    );
  }

  return (
    <div>
      <CustomNavbar />
      <div style={{ width: "70%", margin: "0 auto", marginTop: "2rem" }}>
        <Container>
          <Row className="justify-content-center">
            {hotels.map((hotel) => (
              <Row key={hotel.id} xs={12} sm={12} md={40} lg={32}>
                <HotelCard hotel={hotel} />
              </Row>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
