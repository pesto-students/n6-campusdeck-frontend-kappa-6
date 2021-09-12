import { combineReducers } from "redux";
import auth from "./auth";
import campus from "./campus";
import space from "./space";
import post from "./post";

export const reducers = combineReducers({
  auth,
  campus,
  space,
  post
});
