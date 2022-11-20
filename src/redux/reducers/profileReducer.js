import { profileActionTypes } from "../action-types/actionTypes";
const initialState = {
  user: {},
  posts: [],
};
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case profileActionTypes.getUsers:
      console.log(
        "🚀 ~ file: profileReducer.js ~ line 11 ~ profileReducer ~ action.payload",
        action.payload
      );

      return { ...state, user: action.payload };

    default:
      return state;
  }
};
export default profileReducer;
