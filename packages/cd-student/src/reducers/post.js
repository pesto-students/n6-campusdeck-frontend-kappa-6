import { CREATE_POST, FETCH_HOME_FEED } from "../actions/constants/actionTypes";

const postReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    case FETCH_HOME_FEED:
      return { ...state, posts: action.payload.data };
    default:
      return state;
  }
};

export default postReducer;
