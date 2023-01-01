import { authActionTypes } from "../action-types/actionTypes";
const initialState = {
  auth: null,
  authIsLogin: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.auth:
      // console.log("action.payload ", action.payload);
      return { ...state, auth: action.payload };
    case authActionTypes.getUserIsLogin:
      console.log("action.payload 12", action.payload);
      return { ...state, authIsLogin: action.payload };

    default:
      return state;
  }
};
export default authReducer;
