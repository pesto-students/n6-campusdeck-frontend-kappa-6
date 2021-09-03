import {
  CREATE_SPACE,
  FETCH_ALL_SPACES_BY_CAMPUS
} from "../actions/constants/actionTypes";

const spaceReducer = (state = { spaces: [] }, action) => {
  switch (action.type) {
    case CREATE_SPACE:
      return { ...state, spaces: [...state.spaces, action.payload] };
    case FETCH_ALL_SPACES_BY_CAMPUS:
      return { spaces: action.payload };
    default:
      return state;
  }
};

export default spaceReducer;
