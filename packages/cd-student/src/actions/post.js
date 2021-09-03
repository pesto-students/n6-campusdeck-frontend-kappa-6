import * as api from "../api";
import { CREATE_POST } from "./constants/actionTypes";

// action to create a post
export const createPost = formData => async dispatch => {
  try {
    const { data } = await api.createPost(formData);

    // dispatch action that sets the post received to the store
    dispatch({
      type: CREATE_POST,
      payload: data
    });
  } catch (error) {
    console.error(error);
  }
};
