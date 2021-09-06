import {
  AUTH,
  LOGOUT,
  FETCH_USER,
  FETCH_MY_SPACES
} from "../actions/constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      // save user info in local storage
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      // removes user info from local storage
      localStorage.removeItem("profile");
      return { ...state, authData: null };
    case FETCH_USER:
      return { ...state, user: action.payload.data };
    case FETCH_MY_SPACES: {
      return { ...state, mySpaces: action.payload.data };
    }
    default:
      return state;
  }
};

export default authReducer;
