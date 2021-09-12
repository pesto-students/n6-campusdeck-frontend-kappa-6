import { AUTH } from "./constants/actionTypes";
import * as api from "../api";

// action to register an admin
export const signUp = (formData, history) => async dispatch => {
  try {
    const { data } = await api.signUp(formData);

    if (data.status === "success") {
      history.push("/students");
    }

    dispatch({ type: AUTH, data });
  } catch (error) {
    console.error(error);
  }
};

// action to login an admin
export const signIn = (formData, history) => async dispatch => {
  try {
    const { data } = await api.signIn(formData);

    if (data.status === "success") {
      history.push("/students");
    }

    dispatch({ type: AUTH, data });
  } catch (error) {
    console.error(error);
  }
};
