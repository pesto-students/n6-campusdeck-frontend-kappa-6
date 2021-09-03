import * as api from "../api";
import {
  CREATE_SPACE,
  FETCH_SPACE,
  FETCH_ALL_SPACES_BY_CAMPUS
} from "./constants/actionTypes";

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

// action to get space details by ID
export const getSpace = id => async dispatch => {
  try {
    const {
      data: { data }
    } = await api.getSpace(id);

    // dispatch action that sets the space received to the store
    dispatch({
      type: FETCH_SPACE,
      payload: data
    });
  } catch (error) {
    console.error(error);
  }
};

// action to get all spaces in a campus
export const getAllSpacesByCampus = campusId => async dispatch => {
  try {
    const {
      data: { data }
    } = await api.getAllSpacesByCampus(campusId);

    // dispatch action that sets the spaces received to the store
    dispatch({
      type: FETCH_ALL_SPACES_BY_CAMPUS,
      payload: data
    });
  } catch (error) {
    console.error(error);
  }
};
