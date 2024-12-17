import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import { FaWifi, FaAirFreshener, FaTv, FaShower, FaBolt, FaArrowUp } from "react-icons/fa";
import "./hotelCard.css";

const HotelCard = ({ hotel }) => {

  console.log("Hotel ID:", hotel.id);

  const navigate = useNavigate();

  const fallbackImage =
    "https://images.oyoroomscdn.com/uploads/hotel_image/104480/medium/sforwklrshce.jpg"; // Replace with your preferred fallback image URL

  const getFeatureIcon = (feature) => {
    switch (feature) {
      case "AC":
        return <FaAirFreshener />;
      case "Free Wifi":
        return <FaWifi />;
      case "TV":
        return <FaTv />;
      case "Geyser":
        return <FaShower />;
      case "Power backup":
        return <FaBolt />;
      case "Elevator":
        return <FaArrowUp />;
      default:
        return null;
    }
  };

  const handleViewDetails = () => {
    // Navigate to the /hotel/:hotelId route and pass the hotel_id
    navigate(`/hotel/${hotel.id}`); 
  };

  return (
    <Card
      className="hotel-card mb-4"
      style={{
        margin: "30px", // Adjust the margin as per your needs
      }}
    >
      <div className="d-flex flex-column flex-md-row">
        {/* Left Section: Image */}
        <div className="hotel-image-section">
          <Card.Img
            src={hotel.hotel_photo || fallbackImage} // Use fallback if no photo available
            alt={hotel.name}
            className="hotel-image"
            onError={(e) => (e.target.src = fallbackImage)} // Handle invalid image URLs
          />
        </div>

        {/* Right Section: Details */}
        <Card.Body className="hotel-details-section">
          <Card.Title className="hotel-name">{hotel.name}</Card.Title>
          <Card.Text>{hotel.address}</Card.Text>
          <Card.Text>
            <span className="rating">{hotel.ratings}⭐</span>
          </Card.Text>

          <Card.Text>
            <div className="hotel-features">
              <div className="features-icons">
                {hotel.features.split(",").map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-icon">{getFeatureIcon(feature.trim())}</span>
                    <span className="feature-name">{feature.trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card.Text>
          <div className="hotel-footer">
            <p className="hotel-price">
              Rs {hotel.price ? hotel.price : "Price not available"} / night
            </p>
            <div className="hotel-buttons">
              <Button
                variant="outline-primary"
                className="view-details"
                onClick={handleViewDetails} // Attach the click handler
              >
                View Details
              </Button>
              <Button variant="success" className="book-now">
                Book Now
              </Button>
            </div>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};

export default HotelCard;
