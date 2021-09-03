import { CREATE_POST } from "../actions/constants/actionTypes";

const postReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    default:
      return state;
  }
};

export default postReducer;
