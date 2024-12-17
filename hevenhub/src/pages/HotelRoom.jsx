import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "../components/slider/slider";
import fetchAllHotels from "../services/hotel-service";
import fetchRoomsByHotelId from "../services/room-service";
import { fetchBookings } from "../services/booking-service";
import CustomNavbar from "../components/navbar/navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Container, Row, Spinner } from "react-bootstrap";
import { Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./HotelRoom.css";

const HotelRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [roomImages, setRoomImages] = useState([]);
  const [singleRoomCount, setSingleRoomCount] = useState(0);
  const [doubleRoomCount, setDoubleRoomCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [singleRoomsInput, setSingleRoomsInput] = useState(0);
  const [doubleRoomsInput, setDoubleRoomsInput] = useState(0);
  const [bookedSingleRooms, setBookedSingleRooms] = useState(0);
  const [bookedDoubleRooms, setBookedDoubleRooms] = useState(0);
  const [singleRoomPrice, setSingleRoomPrice] = useState(0);
  const [doubleRoomPrice, setDoubleRoomPrice] = useState(0);

  const getFeatureIcon = (feature) => {
    switch (feature) {
      case "AC":
        return <i className="bi bi-thermometer-sun"></i>;
      case "Free Wifi":
        return <i className="bi bi-wifi"></i>;
      case "TV":
        return <i className="bi bi-tv"></i>;
      case "Geyser":
        return <i className="bi bi-droplet"></i>;
      case "Power backup":
        return <i className="bi bi-lightning-fill"></i>;
      case "Elevator":
        return <i className="bi bi-arrow-up-circle"></i>;
      default:
        return null;
    }
  };
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const hotelResponse = await fetchAllHotels(id, navigate);
        const hotel = hotelResponse.find((h) => h.id === parseInt(id));
        if (hotel) {
          setHotelDetails(hotel);
        } else {
          setErrorMessage("Hotel not found.");
        }

        const roomsResponse = await fetchRoomsByHotelId(id, navigate);

        if (roomsResponse.length === 0) {
          setSingleRoomCount(0);
          setDoubleRoomCount(0);
          setBookedSingleRooms(0);
          setBookedDoubleRooms(0);
          setAvailabilityMessage("No rooms available for this hotel.");
        } else {
          const singleRooms = roomsResponse.filter(
            (room) => room.roomType === "single"
          ).length;
          const doubleRooms = roomsResponse.filter(
            (room) => room.roomType === "double"
          ).length;

          setSingleRoomCount(singleRooms);
          setDoubleRoomCount(doubleRooms);

          const images = roomsResponse.map((room) => room.room_photo);
          setRoomImages(images);

          const firstSingleRoom = roomsResponse.find(
            (room) => room.roomType === "single"
          );
          const firstDoubleRoom = roomsResponse.find(
            (room) => room.roomType === "double"
          );

          const singleRoomPrice = firstSingleRoom?.price || 0;
          const doubleRoomPrice = firstDoubleRoom?.price || 0;

          setSingleRoomPrice(singleRoomPrice);
          setDoubleRoomPrice(doubleRoomPrice);
        }
      } catch (err) {
        console.error("Error fetching details:", err);
        if (err.response) {
          // Check if the response exists and status is 401
          if (err.response.status === 401) {
            toast.error("Token invalid or your session has expired.");
            console.log("Navigating to login...");
            navigate("/login");
          }
          console.error("Error:", err.response.data);
        }
        if (err.response && err.response.status === 404) {
          setAvailabilityMessage(
            `Total Available Rooms - Single: ${singleRoomCount}, Double: ${doubleRoomCount}`
          );
        } else {
          // In your error handling block where you navigate
          navigate("/login", {
            state: {
              errorMessage: "Token invalid or your session has expired.",
            },
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, navigate]);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setAvailabilityMessage("");

    try {
      const formattedDate = new Date(date).toLocaleDateString("en-CA");
      const bookings = await fetchBookings(id, formattedDate, navigate);

      const bookedBookings = bookings.filter(
        (booking) => booking.status === "booked"
      );

      const bookedSingleRoomsCount = bookedBookings.reduce(
        (total, booking) => total + booking.single_room,
        0
      );
      const bookedDoubleRoomsCount = bookedBookings.reduce(
        (total, booking) => total + booking.double_room,
        0
      );

      setBookedSingleRooms(bookedSingleRoomsCount);
      setBookedDoubleRooms(bookedDoubleRoomsCount);

      const availableSingleRooms = singleRoomCount - bookedSingleRoomsCount;
      const availableDoubleRooms = doubleRoomCount - bookedDoubleRoomsCount;

      setSingleRoomsInput(availableSingleRooms);
      setDoubleRoomsInput(availableDoubleRooms);

      if (availableSingleRooms === 0 && availableDoubleRooms === 0) {
        setAvailabilityMessage("No rooms are available for the selected date.");
        toast.error("No rooms available for the selected date."); // Toast message when no rooms available
      } else {
        setAvailabilityMessage(
          `Available Rooms - Single: ${availableSingleRooms}, Double: ${availableDoubleRooms}`
        );
      }
    } catch (err) {
      if (err.response) {
        // Check if the response exists and status is 401
        if (err.response.status === 401) {
          toast.error("Token invalid or your session has expired.");
          console.log("Navigating to login...");
          navigate("/login");
        }
        console.error("Error:", err.response.data);
      }
      console.error("Error checking bookings:", err);
      setAvailabilityMessage("Error checking room availability.");
    }
  };

  const handleBookNow = async () => {
    if (!selectedDate) {
      toast.error("Please select a check-in date before booking.");
      return;
    }

    // Prevent request if selected rooms exceed available rooms
    if (
      singleRoomsInput > singleRoomCount - bookedSingleRooms ||
      doubleRoomsInput > doubleRoomCount - bookedDoubleRooms
    ) {
      toast.error("You have selected more rooms than available.");
      return;
    }

    // Prevent request if both single and double rooms are 0
    if (singleRoomsInput === 0 && doubleRoomsInput === 0) {
      toast.error("Please select at least one room to book.");
      return;
    }

    console.log(singleRoomPrice, doubleRoomPrice);
    // Calculate total amount
    const totalAmount =
      singleRoomsInput * singleRoomPrice + doubleRoomsInput * doubleRoomPrice;

    // Calculate booking and checkout dates
    const bookingDate = new Date().toLocaleDateString("en-CA"); // Today's date
    const checkInDate = new Date(selectedDate).toLocaleDateString("en-CA");
    const checkOutDate = new Date(selectedDate);
    checkOutDate.setDate(checkOutDate.getDate() + 1); // Next day as checkout
    const formattedCheckOutDate = checkOutDate.toLocaleDateString("en-CA");

    console.log(id);

    const bookingData = {
      hotel_id: id, // From useParams
      user_id: localStorage.getItem("userId"), // Replace with the actual logged-in user ID
      checkInDate: checkInDate,
      checkOutDate: formattedCheckOutDate,
      bookingDate: bookingDate,
      single_room: singleRoomsInput,
      double_room: doubleRoomsInput,
      totalAmount: totalAmount,
      payments: "COD",
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:8080/api/v1/booking/save",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      bookingData.hotelDetails = hotelDetails;

      console.log(bookingData);
      // Save booking data to local storage
      localStorage.setItem("bookingDetails", JSON.stringify(bookingData));

      // Redirect to booking details page
      navigate("/booking");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Token invalid or your session has expired.");
        console.log("Navigating to login...");
        navigate("/login"); // Redirect to login page
        return null;
      }
      console.error("Error booking rooms:", error);
      toast.error("Failed to book rooms. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="text-center mt-4">
        <p>{errorMessage}</p>
      </div>
    );
  }

  if (!hotelDetails) {
    return (
      <div className="text-center mt-4">
        <p>No hotel details available.</p>
      </div>
    );
  }

  return (
    <div>
      <CustomNavbar />
      <div className="hotel-details-container">
        <div className="hotel-left">
          <Slider images={roomImages} />
          <h1 style={{ marginTop: "15px" }}>{hotelDetails.name}</h1>
          <p style={{ marginTop: "10px" }}>
            <strong>Address:</strong> {hotelDetails.address}
          </p>
          <p>
            <strong>Amenities</strong>
          </p>
          <Card.Text>
            <div className="hotel-features">
              <div className="features-icons">
                {hotelDetails.features.split(",").map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-icon">
                      {getFeatureIcon(feature.trim())}
                    </span>
                    <span className="feature-name">{feature.trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card.Text>
        </div>

        <div className="hotel-right">
          <div className="right-container">
            <div className="date-picker-container">
              <strong>Select a Date:</strong>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                placeholderText="Select a date"
                customInput={
                  <div className="custom-date-picker">
                    <FaCalendarAlt size={20} color="#555" />
                    <span>
                      {selectedDate
                        ? selectedDate.toLocaleDateString("en-CA")
                        : "Select a date"}
                    </span>
                  </div>
                }
              />
            </div>

            {selectedDate && (
              <>
                <div className="room-inputs">
                  <div className="room-input">
                    <label>Single Rooms:</label>
                    <input
                      type="number"
                      value={singleRoomsInput}
                      onChange={(e) =>
                        setSingleRoomsInput(Number(e.target.value))
                      }
                      min="0"
                      max={singleRoomCount - bookedSingleRooms}
                      placeholder="Enter number of rooms"
                    />
                  </div>
                  <div className="room-input">
                    <label>Double Rooms:</label>
                    <input
                      type="number"
                      value={doubleRoomsInput}
                      onChange={(e) =>
                        setDoubleRoomsInput(Number(e.target.value))
                      }
                      min="0"
                      max={doubleRoomCount - bookedDoubleRooms}
                      placeholder="Enter number of rooms"
                    />
                  </div>
                </div>

                <button className="book-now-btn" onClick={handleBookNow}>
                  Book Now
                </button>
              </>
            )}
          </div>
        </div>

        {/* Location Map */}
        <div className="hotel-location">
          <iframe
            src={hotelDetails.location}
            width="100%"
            height="450"
            style={{
              border: 0,
              marginTop: "5rem",
            }}
            allowFullScreen="true"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HotelRoom;
