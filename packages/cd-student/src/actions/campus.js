import * as api from "../api";
import { FETCH_ALL_CAMPUS, FETCH_CAMPUS_BY_ID } from "./constants/actionTypes";

// action to fetch all campus
export const fetchAllCampus = () => async dispatch => {
  try {
    const { data } = await api.fetchAllCampus();
    // dispatch action that sets the campus received to the store
    dispatch({
      type: FETCH_ALL_CAMPUS,
      payload: data
    });
  } catch (error) {
    console.error(error);
  }
};

export const getCampusById = id => async dispatch => {
  try {
    const { data } = await api.getCampusById(id);
    // dispatch action that sets the campus received to the store
    dispatch({
      type: FETCH_CAMPUS_BY_ID,
      payload: data
    });
  } catch (error) {
    console.error(error);
  }
};
