import { CREATE_SPACE } from "../actions/constants/actionTypes";

const spaceReducer = (state = { spaces: [] }, action) => {
  switch (action.type) {
    case CREATE_SPACE:
      return { ...state, spaces: [...state.spaces, action.payload] };
    default:
      return state;
  }
};

export default spaceReducer;
