// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import logo from "../../assets/logo/logo-light.png";
// import "./login.css";
// import { loginUser } from "../../services/user-service";

// import { Link, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// const handleOAuthLogin = (nav) => {
//   console.log("handleOAuthLogin is called");
//   fetch("http://localhost:8080/api/v1/user/oauth", {
//     credentials: "include", // Include cookies sent by the server
//   })
//     .then((res) => {
//       if (!res.ok) throw new Error("Failed to fetch token");
//       return res.json();
//     })
//     .then((data) => {
//       if (data.authToken) {
//         // Save token and other user details
//         localStorage.setItem("authToken", data.token);
//         localStorage.setItem("name", data.name);
//         localStorage.setItem("userId", data.userId);
//         localStorage.setItem("role", data.role);
//         localStorage.setItem("photo", data.photo);
//         console.log(data);

//         // Redirect to home page
//         nav("/home");
//       } else {
//         console.error("Authentication failed");
//         toast.error("OAuth Authentication failed");
//       }
//     })
//     .catch((error) => {
//       console.error("Error during OAuth login:", error);
//       toast.error("Error during OAuth login");
//     });
// };

// const Login = () => {
//   const [loginDetails, setLoginDetails] = useState({
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation(); // Access the location object
//   const errorMessage = location.state?.errorMessage; // Get the error message from state if it exists

//   useEffect(() => {
//     const searchParams = new URLSearchParams(window.location.search);
//     console.log("Location Search: ", location.search);

//     console.log("Search Params:", searchParams.toString()); // Debugging log
//     if (searchParams.has("oauth2")) {
//       console.log("OAuth detected, calling handleOAuthLogin...");
//       try {
//         handleOAuthLogin(navigate);
//       } catch (err) {
//         console.error("Error in OAuth handling:", err);
//       }
//     }
//   }, [navigate, location.search]); // Add location.search to the dependency array

//   const handleChange = (event, field) => {
//     const actualValue = event.target.value;
//     setLoginDetails({
//       ...loginDetails,
//       [field]: actualValue,
//     });
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!loginDetails.email.trim() || !loginDetails.password.trim()) {
//       toast.error("Both email and password are required!");
//       return;
//     }
//     if (!emailRegex.test(loginDetails.email.trim())) {
//       toast.error("Please enter a valid email address!");
//       return;
//     }

//     setLoading(true);
//     loginUser(loginDetails)
//       .then((jwtTokenData) => {
//         setLoading(false);
//         const expirationTime = new Date().getTime() + 10 * 60 * 1000;
//         localStorage.setItem("authToken", jwtTokenData.token);
//         localStorage.setItem("authTokenExpiration", expirationTime);
//         localStorage.setItem("name", jwtTokenData.name);
//         localStorage.setItem("userId", jwtTokenData.userId);
//         localStorage.setItem("role", jwtTokenData.role);
//         localStorage.setItem("photo", jwtTokenData.photo);
//         toast.success("Login successful!");
//         navigate("/home");
//       })
//       .catch((error) => {
//         setLoading(false);
//         toast.error(
//           error.response?.data?.message || "Enter a valid email and password"
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
//                   alt="login form"
//                   className="img-fluid"
//                   style={{ borderRadius: "1rem 0 0 1rem" }}
//                 />
//               </div>
//               <div className="col-md-6 col-lg-7 d-flex align-items-center">
//                 <div className="card-body p-4 p-lg-5 text-black">
//                   <form onSubmit={handleLogin}>
//                     <div className="d-flex align-items-center mb-3 pb-1">
//                       <i
//                         className="fas fa-cubes fa-2x me-3"
//                         style={{ color: "#ff6219" }}
//                       ></i>
//                       <img src={logo} alt="Logo" />
//                     </div>
//                     <h5
//                       className="fw-normal mb-3 pb-3"
//                       style={{ letterSpacing: "1px" }}
//                     >
//                       Sign into your account
//                     </h5>

//                     <div className="form-outline mb-4">
//                       <input
//                         type="email"
//                         id="form2Example17"
//                         className="form-control form-control-lg"
//                         placeholder="Enter your email"
//                         value={loginDetails.email}
//                         onChange={(e) => handleChange(e, "email")}
//                       />
//                       <label className="form-label" htmlFor="form2Example17">
//                         Email address
//                       </label>
//                     </div>

//                     <div className="form-outline mb-4">
//                       <div className="input-group">
//                         <input
//                           type={showPassword ? "text" : "password"}
//                           id="form2Example27"
//                           className="form-control form-control-lg"
//                           placeholder="Enter your password"
//                           value={loginDetails.password}
//                           onChange={(e) => handleChange(e, "password")}
//                         />
//                         <button
//                           type="button"
//                           className="btn btn-outline-secondary"
//                           onClick={() => setShowPassword(!showPassword)}
//                         >
//                           {showPassword ? "Hide" : "Show"}
//                         </button>
//                       </div>
//                       <label className="form-label" htmlFor="form2Example27">
//                         Password
//                       </label>
//                     </div>

//                     <div className="pt-1 mb-4">
//                       <button
//                         className="btn btn-dark btn-lg btn-block"
//                         type="submit"
//                         disabled={loading}
//                       >
//                         {loading ? "Logging in..." : "Login"}
//                       </button>
//                     </div>

//                     <div className="text-center mb-3">
//                       <a
//                         href="http://localhost:8080/oauth2/authorization/google"
//                         className="btn btn-lg btn-block"
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           gap: "10px",
//                           fontSize: "16px",
//                           padding: "10px 20px",
//                           background: "#34A853",
//                           color: "#fff",
//                           border: "none",
//                           borderRadius: "5px",
//                           marginTop: "-10px",
//                           textDecoration: "none", // To make the button look like a proper link
//                         }}
//                       >
//                         Login with Google
//                       </a>
//                     </div>
//                     <p className="mb-3 pb-lg-2" style={{ color: "black" }}>
//                       Don't have an account?{" "}
//                       <Link
//                         to="/register"
//                         style={{
//                           color: "#007bff",
//                           textDecoration: "none",
//                         }}
//                       >
//                         Register here
//                       </Link>
//                     </p>
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

// export default Login;
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/logo/logo-light.png";
import "./login.css";
import { loginUser } from "../../services/user-service";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Access the location object
  const errorMessage = location.state?.errorMessage;

  const handleChange = (event, field) => {
    const actualValue = event.target.value;
    setLoginDetails({
      ...loginDetails,
      [field]: actualValue,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!loginDetails.email.trim() || !loginDetails.password.trim()) {
      toast.error("Both email and password are required!");
      return;
    }
    if (!emailRegex.test(loginDetails.email.trim())) {
      toast.error("Please enter a valid email address!");
      return;
    }

    setLoading(true);
    loginUser(loginDetails)
      .then((jwtTokenData) => {
        setLoading(false);
        const expirationTime = new Date().getTime() + 10 * 60 * 1000;
        localStorage.setItem("authToken", jwtTokenData.token);
        localStorage.setItem("authTokenExpiration", expirationTime);
        localStorage.setItem("name", jwtTokenData.name);
        localStorage.setItem("userId", jwtTokenData.userId);
        localStorage.setItem("role", jwtTokenData.role);
        localStorage.setItem("photo", jwtTokenData.photo);
        toast.success("Login successful!");
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(
          error.response?.data?.message || "Enter a valid email and password"
        );
      });
  };

  const handleOAuthRedirect = () => {
    // Extract the OAuth code directly from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const oauth2Code = searchParams.get("oauth2");

    if (oauth2Code) {
      handleOAuthLogin(oauth2Code);
    } else {
      // If no OAuth code, just redirect the user to the login page
      window.location.href = "http://localhost:8080/oauth2/code/google";
    }
  };

  const handleOAuthLogin = (oauth2Code) => {
    console.log("handleOAuthLogin is called");
    // Exchange the OAuth code for an access token
    fetch("http://localhost:8080/login/oauth2/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: oauth2Code }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.authToken) {
          // Save token and user details to localStorage
          localStorage.setItem("authToken", data.authToken);
          localStorage.setItem("name", data.name);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("role", data.role);
          localStorage.setItem("photo", data.photo);
          console.log(data);

          // Redirect to home page
          navigate("/home");
        } else {
          console.error("Authentication failed");
          toast.error("OAuth Authentication failed");
        }
      })
      .catch((error) => {
        console.error("Error during OAuth login:", error);
        toast.error("Error during OAuth login");
      });
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="row d-flex justify-content-center align-items-center h-100 card-custom">
        <div className="col col-xl-8">
          <div className="card" style={{ borderRadius: "1rem" }}>
            <div className="row g-0 card-custom">
              <div className="col-md-6 col-lg-5 d-none d-md-block ">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                  alt="login form"
                  className="img-fluid"
                  style={{ borderRadius: "1rem 0 0 1rem" }}
                />
              </div>
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">
                  <form onSubmit={handleLogin}>
                    <div className="d-flex align-items-center mb-3 pb-1">
                      <i
                        className="fas fa-cubes fa-2x me-3"
                        style={{ color: "#ff6219" }}
                      ></i>
                      <img src={logo} alt="Logo" />
                    </div>
                    <h5
                      className="fw-normal mb-3 pb-3"
                      style={{ letterSpacing: "1px" }}
                    >
                      Sign into your account
                    </h5>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form2Example17"
                        className="form-control form-control-lg"
                        placeholder="Enter your email"
                        value={loginDetails.email}
                        onChange={(e) => handleChange(e, "email")}
                      />
                      <label className="form-label" htmlFor="form2Example17">
                        Email address
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="form2Example27"
                          className="form-control form-control-lg"
                          placeholder="Enter your password"
                          value={loginDetails.password}
                          onChange={(e) => handleChange(e, "password")}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      <label className="form-label" htmlFor="form2Example27">
                        Password
                      </label>
                    </div>

                    <div className="pt-1 mb-4">
                      <button
                        className="btn btn-dark btn-lg btn-block"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Logging in..." : "Login"}
                      </button>
                    </div>

                    <div className="text-center mb-3">
                      <button
                        className="btn btn-lg btn-block"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                          fontSize: "16px",
                          padding: "10px 20px",
                          background: "#34A853",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          marginTop: "-10px",
                          textDecoration: "none", // To make the button look like a proper link
                        }}
                        onClick={handleOAuthRedirect}
                      >
                        Login with Google
                      </button>
                    </div>
                    <p className="mb-3 pb-lg-2" style={{ color: "black" }}>
                      Don't have an account?{" "}
                      <Link
                        to="/register"
                        style={{
                          color: "#007bff",
                          textDecoration: "none",
                        }}
                      >
                        Register here
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
