import * as api from "../api";
import {
  CREATE_POST,
  FETCH_HOME_FEED,
  CREATE_COMMENT,
  LIKE_POST,
  FETCH_SPACE_FEED,
  CLEAR_POSTS
} from "./constants/actionTypes";

export const likePost = id => async dispatch => {
  try {
    const { data } = await api.likePost(id);

    dispatch({
      type: LIKE_POST,
      payload: data
    });
  } catch (error) {
    console.error(error);
  }
};

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

    dispatch({
      type: CLEAR_POSTS
    });

    // dispatch action that sets the post received to the store
    dispatch({
      type: FETCH_HOME_FEED,
      payload: data
    });
  } catch (error) {
    console.error(error);
  }
};

export const getSpaceFeed = id => async dispatch => {
  try {
    const { data } = await api.getSpaceFeed(id);

    dispatch({
      type: CLEAR_POSTS
    });

    // dispatch action that sets the post received to the store
    dispatch({
      type: FETCH_SPACE_FEED,
      payload: data
    });
  } catch (error) {
    console.error(error);
  }
};

export const createComment =
  (newComment, postComments, setPostComments) => async dispatch => {
    try {
      const { data } = await api.createComment(newComment);

      // getting comment id from the newly created comment
      const {
        data: {
          comment: { _id: newCommentId }
        }
      } = data;

      setPostComments([...postComments, newCommentId]);

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
