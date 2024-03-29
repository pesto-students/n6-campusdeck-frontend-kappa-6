import {
  CREATE_POST,
  FETCH_HOME_FEED,
  FETCH_SPACE_FEED,
  CREATE_COMMENT,
  LIKE_POST,
  CLEAR_POSTS
} from "../actions/constants/actionTypes";

const postReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    case FETCH_HOME_FEED:
    case FETCH_SPACE_FEED:
      return { ...state, posts: action.payload.data };
    case CREATE_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === +action.payload.data._id) {
            return action.payload.data;
          }
          return post;
        })
      };
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === +action.payload.data._id) {
            return action.payload.data;
          }
          return post;
        })
      };
    case CLEAR_POSTS:
      return { ...state, posts: [] };
    default:
      return state;
  }
};

export default postReducer;
