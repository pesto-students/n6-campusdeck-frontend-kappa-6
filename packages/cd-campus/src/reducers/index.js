import { combineReducers } from "redux";
import auth from "./auth";
import campus from "./campus";

export const reducers = combineReducers({
  auth,
  campus
});
