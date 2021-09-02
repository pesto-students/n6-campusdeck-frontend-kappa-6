import { FETCH_ALL_CAMPUS } from "../actions/constants/actionTypes";

const campusReducer = (state = { campus: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL_CAMPUS:
      return { ...state, campus: action.payload.data };
    default:
      return state;
  }
};

export default campusReducer;
