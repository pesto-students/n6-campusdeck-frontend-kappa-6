import { AUTH, LOGOUT } from "../actions/constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      // save user info in local storage
      localStorage.setItem("admin", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      // removes user info from local storage
      localStorage.removeItem("admin");
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
