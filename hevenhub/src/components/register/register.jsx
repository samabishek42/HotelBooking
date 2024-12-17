import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";
import { registerUser } from "../../services/user-service";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [registrationDetails, setRegistrationDetails] = useState({
    email: "",
    mobile: "",
    name: "",
    password: "",
    type: "user", // Default user type
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event, field) => {
    const actualValue = event.target.value;
    setRegistrationDetails({
      ...registrationDetails,
      [field]: actualValue,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9][0-9]{9}/;

    if (
      !registrationDetails.email.trim() ||
      !registrationDetails.mobile.trim() ||
      !registrationDetails.username.trim() ||
      !registrationDetails.password.trim()
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (!emailRegex.test(registrationDetails.email.trim())) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (!mobileRegex.test(registrationDetails.mobile.trim())) {
      toast.error("Please enter a valid 10-digit mobile number!");
      return;
    }

    if (registrationDetails.password.trim().length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    // API Call
    setLoading(true);
    registerUser(registrationDetails)
      .then((response) => {
        setLoading(false);
        toast.success("Registration successful!");
        // Redirect to login page
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status == 409) {
          toast.error("Email already exists!");
        } else if (error.response && error.response.data) {
          toast.error(error.response.data.message || "Registration failed!");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#9a616d",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="register-container">
        <form className="register-form" onSubmit={handleRegister}>
          <h2>Register</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={registrationDetails.email}
              onChange={(e) => handleChange(e, "email")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="text"
              id="mobile"
              placeholder="Enter your mobile number"
              value={registrationDetails.mobile}
              onChange={(e) => handleChange(e, "mobile")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={registrationDetails.username}
              onChange={(e) => handleChange(e, "username")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={registrationDetails.password}
              onChange={(e) => handleChange(e, "password")}
            />
          </div>
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="login-link">
            Already have an account? <a href="/login">Log In</a>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;
// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import logo from "../../assets/logo/logo-light.png";
// import "./register.css";
// import { registerUser } from "../../services/user-service";
// import { Link, useNavigate } from "react-router-dom";

// const Register = () => {
//   const [userDetails, setUserDetails] = useState({
//     username: "",
//     email: "",
//     password: "",
//     mobile: "",
//     type: "",
//     photo: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (event, field) => {
//     const actualValue = event.target.value;
//     setUserDetails({
//       ...userDetails,
//       [field]: actualValue,
//     });
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (
//       !userDetails.username.trim() ||
//       !userDetails.email.trim() ||
//       !userDetails.password.trim() ||
//       !userDetails.mobile.trim()
//     ) {
//       toast.error("All fields are required!");
//       return;
//     }

//     setLoading(true);
//     registerUser(userDetails)
//       .then((data) => {
//         setLoading(false);
//         toast.success("Registration successful! Please login.");
//         navigate("/login");
//       })
//       .catch((error) => {
//         setLoading(false);
//         toast.error(
//           error.response?.data?.message ||
//             "Something went wrong, please try again!"
//         );
//       });
//   };

//   return (
//     <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
//       <div className="row d-flex justify-content-center align-items-center h-100 card-custom">
//         <div className="col col-xl-8">
//           <div className="card" style={{ borderRadius: "1rem" }}>
//             <div className="row g-0 card-custom">
//               <div className="col-md-6 col-lg-5 d-none d-md-block ">
//                 <img
//                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
//                   alt="register form"
//                   className="img-fluid"
//                   style={{ borderRadius: "1rem 0 0 1rem" }}
//                 />
//               </div>
//               <div className="col-md-6 col-lg-7 d-flex align-items-center">
//                 <div className="card-body p-4 p-lg-5 text-black">
//                   <form onSubmit={handleRegister}>
//                     <div className="d-flex align-items-center mb-3 pb-1">
//                       <i
//                         className="fas fa-cubes fa-2x me-3"
//                         style={{ color: "#ff6219" }}
//                       ></i>
//                       <img src={logo} alt="logo" />
//                     </div>

//                     <h5
//                       className="fw-normal mb-3 pb-3"
//                       style={{ letterSpacing: "1px" }}
//                     >
//                       Create your account
//                     </h5>

//                     <div className="form-outline mb-4">
//                       <input
//                         type="text"
//                         id="username"
//                         className="form-control form-control-lg"
//                         placeholder="Enter your name"
//                         value={userDetails.username}
//                         onChange={(e) => handleChange(e, "username")}
//                       />
//                       <label className="form-label" htmlFor="username">
//                         Username
//                       </label>
//                     </div>

//                     <div className="form-outline mb-4">
//                       <input
//                         type="email"
//                         id="email"
//                         className="form-control form-control-lg"
//                         placeholder="Enter your email"
//                         value={userDetails.email}
//                         onChange={(e) => handleChange(e, "email")}
//                       />
//                       <label className="form-label" htmlFor="email">
//                         Email address
//                       </label>
//                     </div>

//                     <div className="form-outline mb-4">
//                       <input
//                         type="password"
//                         id="password"
//                         className="form-control form-control-lg"
//                         placeholder="Enter your password"
//                         value={userDetails.password}
//                         onChange={(e) => handleChange(e, "password")}
//                       />
//                       <label className="form-label" htmlFor="password">
//                         Password
//                       </label>
//                     </div>

//                     <div className="form-outline mb-4">
//                       <input
//                         type="text"
//                         id="mobile"
//                         className="form-control form-control-lg"
//                         placeholder="Enter your mobile number"
//                         value={userDetails.mobile}
//                         onChange={(e) => handleChange(e, "mobile")}
//                       />
//                       <label className="form-label" htmlFor="mobile">
//                         Mobile
//                       </label>
//                     </div>

//                     <div className="pt-1 mb-4">
//                       <button
//                         className="btn btn-dark btn-lg btn-block"
//                         type="submit"
//                         disabled={loading}
//                       >
//                         {loading ? "Registering..." : "Register"}
//                       </button>
//                     </div>

//                     <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
//                       Already have an account?{" "}
//                       <Link to="/login" style={{ color: "#393f81" }}>
//                         Login here
//                       </Link>
//                     </p>
//                     <a href="#!" className="small text-muted">
//                       Terms of use.
//                     </a>
//                     <a href="#!" className="small text-muted">
//                       Privacy policy
//                     </a>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </section>
//   );
// };

// export default Register;
