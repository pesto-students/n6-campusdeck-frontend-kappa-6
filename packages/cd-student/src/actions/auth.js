import { AUTH } from "./constants/actionTypes";
import * as api from "../api";

// action to register a new user
export const signup = (formData, history) => async dispatch => {
  try {
    const { data } = await api.signUp(formData);

    if (data.status === "success") {
      history.push("/");
    }

    dispatch({ type: AUTH, data });
  } catch (error) {
    console.error(error);
  }
};

// action to login a user
export const signin = (formData, history) => async dispatch => {
  try {
    const { data } = await api.signIn(formData);

    if (data.status === "success") {
      history.push("/");
    }

    dispatch({ type: AUTH, data });
  } catch (error) {
    console.error(error);
  }
};