import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_USER_SERVICE_URL
});

// user auth related
export const signUp = formData => API.post("/users/signup", formData);
export const signIn = formData => API.post("/users/signin", formData);
