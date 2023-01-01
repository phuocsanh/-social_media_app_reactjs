import { appActionTypes, authActionTypes } from "../action-types/actionTypes";

export const theme = (data) => async (dispatch) => {
  console.log("🚀 ~ file: appAction.js ~ line 4 ~ theme ~ data", data);
  try {
    dispatch({ type: appActionTypes.theme, payload: data });
  } catch (error) {
    console.log("error theme", error);
  }
};
export const saveUserId = (data) => async (dispatch) => {
  console.log("🚀 ~ file: appAction.js ~ line 12 ~ save UserId ~ data", data);
  try {
    dispatch({ type: appActionTypes.saveUserId, payload: data });
  } catch (error) {
    console.log("error theme", error);
  }
};
