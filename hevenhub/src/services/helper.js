import axios from "axios";

// Create Axios Instance
export const myAxios = axios.create({
  baseURL: "http://localhost:8080", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = (loginDetails) => {
  return myAxios
    .post("/api/v1/user/login", loginDetails)
    .then((res) => res.data);
};

export const registerUser = (userDetails) => {
  return myAxios
    .post("/api/v1/user/registerUser", userDetails)
    .then((res) => res.data);
};
