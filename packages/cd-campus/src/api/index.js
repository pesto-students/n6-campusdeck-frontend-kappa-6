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

const POST_API = axios.create({
  baseURL: process.env.REACT_APP_POST_SERVICE_URL
});

// interceptor function that will add token in auth header of each request
const addToken = req => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  const token = profile?.token;

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
};

// adding the interceptor function to all requests for these APIs
USER_API.interceptors.request.use(addToken);
CAMPUS_API.interceptors.request.use(addToken);
SPACE_API.interceptors.request.use(addToken);
POST_API.interceptors.request.use(addToken);

// user auth related
export const signUp = formData => USER_API.post("/users/signup", formData);
export const signIn = formData => USER_API.post("/users/signin", formData);

// campus related
export const fetchAllCampus = () => CAMPUS_API.get("/campus");
