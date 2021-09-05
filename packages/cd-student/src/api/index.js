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

// user related
export const signUp = formData => USER_API.post("/users/signup", formData);
export const signIn = formData => USER_API.post("/users/signin", formData);
export const getUser = id => USER_API.get(`/users/${id}`);

// campus related
export const fetchAllCampus = () => CAMPUS_API.get("/campus");
export const getCampusById = id => CAMPUS_API.get(`/campus/${id}`);

// space related
export const createSpace = formData => SPACE_API.post("/space", formData);
export const getSpace = id => SPACE_API.get(`/space/${id}`);
export const getAllSpacesByCampus = campusId =>
  SPACE_API.get(`/space/campus/${campusId}`);

// post related
export const createPost = formData => POST_API.post("/post", formData);
export const getHomeFeed = () => POST_API.get("/post/feed");
export const createComment = newComment =>
  POST_API.post(`/comment/${newComment.parent}`, newComment);
export const getCommentById = id => POST_API.get(`/comment/${id}`);
export const likePost = id => POST_API.patch(`/post/${id}/likePost`);
export const getSpaceFeed = id => POST_API.get(`/post/space/${id}`);
