import { combineReducers } from "redux";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import profileReducer from "./profileReducer";
export default combineReducers({ authReducer, appReducer, profileReducer });
