import axios from "axios";

// constructing base API for each service
const USER_API = axios.create({
  baseURL: process.env.REACT_APP_USER_SERVICE_URL
});

const CAMPUS_API = axios.create({
  baseURL: process.env.REACT_APP_CAMPUS_SERVICE_URL
});

const SPACE_API = axios.create({
  baseURL: process.env.REACT_APP_SPACE_SERVICE_URL
});

// user auth related
export const signUp = formData => USER_API.post("/users/signup", formData);
export const signIn = formData => USER_API.post("/users/signin", formData);

// campus related
export const fetchAllCampus = () => CAMPUS_API.get("/campus");

// space related
export const createSpace = formData => SPACE_API.post("/space", formData);
