import {
  FETCH_ALL_CAMPUS,
  FETCH_CAMPUS_BY_ID
} from "../actions/constants/actionTypes";

const campusReducer = (state = { campus: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL_CAMPUS:
      return { ...state, campus: action.payload.data };
    case FETCH_CAMPUS_BY_ID:
      return { ...state, singleCampus: action.payload.data };
    default:
      return state;
  }
};

export default campusReducer;
