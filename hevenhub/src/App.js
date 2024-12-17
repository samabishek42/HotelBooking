import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { GoogleOAuthProvider } from "@react-oauth/google"; // Import this
import Login from "./components/login/login";
import Register from "./components/register/register";
import Home from "./pages/home";
import HotelRoom from "./pages/HotelRoom";
import Booking from "./pages/booking";
import BookingHistory from "./pages/BookingHistory"; // Importing the Booking component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import OAuthCallback from "./OAuthCallback";

function App() {
  return (
    // {/* Wrapping the entire Router inside GoogleOAuthProvider */}
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/hotel/:id" element={<HotelRoom />} />
          <Route path="/booking" element={<Booking />} />
          {/* <Route
            path="/login/oauth2/authorization/google"
            element={<OAuthCallback />}
          /> */}
          <Route path="/booking-history" element={<BookingHistory />} />{" "}
          {/* Booking route added */}
        </Routes>
      </div>
    </Router>
    // </GoogleOAuthProvider>
  );
}

export default App;
