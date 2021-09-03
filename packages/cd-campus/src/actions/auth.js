import { AUTH } from "./constants/actionTypes";
import * as api from "../api";

// action to register an admin
export const signUp = (formData, history) => async dispatch => {
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
