import { authActionTypes } from "../action-types/actionTypes";
const initialState = {
  auth: {},
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.auth:
      // console.log("action.payload ", action.payload);
      return { ...state, auth: action.payload };

    default:
      return state;
  }
};
export default authReducer;
