import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col xs={12} sm={6} md={3} className="footer-section">
            <h5>About Us</h5>
            <p>
              We are a leading hotel booking platform providing the best
              accommodations worldwide. Find your perfect stay with us.
            </p>
          </Col>
          <Col xs={12} sm={6} md={3} className="footer-section">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </Col>
          <Col xs={12} sm={6} md={3} className="footer-section">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="#" className="social-icon"><FaFacebook /></a>
              <a href="#" className="social-icon"><FaTwitter /></a>
              <a href="#" className="social-icon"><FaInstagram /></a>
              <a href="#" className="social-icon"><FaLinkedin /></a>
            </div>
          </Col>
          <Col xs={12} sm={6} md={3} className="footer-section">
            <h5>Contact</h5>
            <p>Email: support@hotelbooking.com</p>
            <p>Phone: +1 (800) 123-4567</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} Hotel Booking. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
