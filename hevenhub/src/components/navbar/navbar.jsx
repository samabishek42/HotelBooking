import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHistory } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/logo/logo-light.png";
import "./navbar.css";
import axios from "axios";

const CustomNavbar = () => {
  const navLinkStyle = {
    padding: "12px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    color: "black",
    transition: "background-color 0.3s ease, color 0.3s ease",
  };

  const activeNavLinkStyle = {
    backgroundColor: "black",
    color: "white",
  };

  const navigate = useNavigate();

  const handleBookingHistoryClick = () => {
    navigate("/booking-history");
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "http://localhost:8080/api/v1/user/logout",
        {}, // No body required
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the token from localStorage
      localStorage.removeItem("authToken");

      // Navigate to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="px-3 sticky-top">
      <Navbar.Brand href="#" className="navbar-logo">
        <img src={logo} style={{ width: "300px" }} alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link
            as={NavLink}
            to="/home"
            style={({ isActive }) =>
              isActive
                ? { ...navLinkStyle, ...activeNavLinkStyle }
                : navLinkStyle
            }
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/about"
            style={({ isActive }) =>
              isActive
                ? { ...navLinkStyle, ...activeNavLinkStyle }
                : navLinkStyle
            }
          >
            About
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/contact"
            style={({ isActive }) =>
              isActive
                ? { ...navLinkStyle, ...activeNavLinkStyle }
                : navLinkStyle
            }
          >
            Contact
          </Nav.Link>
        </Nav>
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="outline-secondary"
            onClick={handleBookingHistoryClick}
          >
            <FaHistory /> Booking History
          </Button>
          {/* Uncomment when needed */}
          {/* <Button variant="outline-secondary">
            <FaShoppingCart /> Cart
          </Button> */}
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
