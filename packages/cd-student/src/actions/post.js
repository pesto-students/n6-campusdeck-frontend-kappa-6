import * as api from "../api";
import {
  CREATE_POST,
  FETCH_HOME_FEED,
  CREATE_COMMENT
} from "./constants/actionTypes";

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

export const getHomeFeed = () => async dispatch => {
  try {
    const { data } = await api.getHomeFeed();

    // dispatch action that sets the post received to the store
    dispatch({
      type: FETCH_HOME_FEED,
      payload: data
    });
  } catch (error) {
    console.error(error);
  }
};

export const createComment = newComment => async dispatch => {
  try {
    const { data } = await api.createComment(newComment);

    dispatch({
      type: CREATE_COMMENT,
      payload: data
    });
  } catch (error) {
    console.error(error);
  }
};

export const getCommentById = id => async dispatch => {
  try {
    const {
      data: { data }
    } = await api.getCommentById(id);

    return data;
  } catch (error) {
    console.error(error);
  }
  return null;
};
