import { appActionTypes } from "../action-types/actionTypes";
const initialState = {
  notify: "",
  loading: false,
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case appActionTypes.notify:
      return { ...state, notify: action.payload };
    case appActionTypes.loading:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};
export default appReducer;
