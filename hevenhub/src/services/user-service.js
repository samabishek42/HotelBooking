import { myAxios } from "./helper";
import axios from "axios";

// Login User Service
export const loginUser = (loginDetails) => {
  return myAxios
    .post("api/v1/user/login", loginDetails)
    .then((response) => response.data);
};

// Register User Service
export const registerUser = (userDetails) => {
  return myAxios
    .post("api/v1/user/registerUser", userDetails)
    .then((response) => response.data);
};

export const googleLogin = (googleToken) => {
  return axios
    .post("http://your-api-url/google-login", { token: googleToken })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
