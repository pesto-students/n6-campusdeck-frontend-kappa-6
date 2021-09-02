import * as api from "../api";
import { CREATE_SPACE } from "./constants/actionTypes";

// action to create a space
export const createSpace = formData => async dispatch => {
  try {
    const { data } = await api.createSpace(formData);

    // dispatch action that sets the space received to the store
    dispatch({
      type: CREATE_SPACE,
      payload: data
    });
  } catch (error) {
    console.error(error);
  }
};
