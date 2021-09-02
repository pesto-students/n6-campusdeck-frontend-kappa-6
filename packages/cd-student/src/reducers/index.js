import { combineReducers } from "redux";
import auth from "./auth";
import campus from "./campus";
import space from "./space";

export const reducers = combineReducers({
  auth,
  campus,
  space
});
