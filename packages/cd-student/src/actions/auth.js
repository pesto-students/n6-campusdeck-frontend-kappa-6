import { AUTH } from "./constants/actionTypes";
import * as api from "../api";

// action to register a new user
export const signup = formData => async dispatch => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
  } catch (error) {
    console.error(error);
  }
};
