import { getDataAPI, postDataAPI } from "../../utils/fetchData";
import {
  appActionTypes,
  authActionTypes,
  profileActionTypes,
} from "../action-types/actionTypes";
import { toast } from "react-toastify";

export const getUserById = (id, token) => async (dispatch) => {
  console.log(
    "🚀 ~ file: profileAction.js ~ line 29 ~ getUserById ~ getUserById",
    id,
    token
  );
  try {
    dispatch({ type: appActionTypes.loading, payload: true });
    const res = await getDataAPI(`getUserById/${id}`, token);
    console.log(
      "🚀 ~ file: profileAction.js ~ line 18 ~ getUserById ~ res",
      res
    );

    if (res.data.status) {
      dispatch({
        type: profileActionTypes.getUsers,
        payload: res.data.data,
      });
      dispatch({ type: appActionTypes.loading, payload: false });
    } else {
      // toast.error(res.data.msg);
      dispatch({ type: appActionTypes.loading, payload: false });
    }
  } catch (error) {
    // toast.error("Server error");
    dispatch({ type: appActionTypes.loading, payload: false });
  }
};

export const uploadImage =
  (data, token, onSucces, onFailure, isImageUser) => async (dispatch) => {
    try {
      dispatch({ type: appActionTypes.loading, payload: true });
      const res = await postDataAPI(
        `uploadImage`,
        { data: data, isImageUser: isImageUser },
        token
      );

      if (res.data.status) {
        dispatch({
          type: profileActionTypes.getUsers,
          payload: res.data.data,
        });
        dispatch({ type: appActionTypes.loading, payload: false });
        onSucces();
      } else {
        toast.error(res.data.msg);
        dispatch({ type: appActionTypes.loading, payload: false });
        onFailure();
      }
    } catch (error) {
      toast.error("Server error");
      onFailure();
      dispatch({ type: appActionTypes.loading, payload: false });
    }
  };
export const updateInfoUser = (action) => async (dispatch) => {
  const type = action?.data?.type || "null";
  // console.log("🚀 ~ file: profileAction.js:73 ~ updateInfoUser ~ type", type);
  try {
    dispatch({ type: appActionTypes.loading, payload: true });
    const res = await postDataAPI(
      `updateInfo?type=${type}`,
      { data: action?.data?.value },
      action?.data?.token
    );

    if (res.data.status) {
      dispatch({ type: appActionTypes.loading, payload: false });
      action?.onSuccess?.("Uploaded successfully");
    } else {
      toast.error(res.data.msg);
      dispatch({ type: appActionTypes.loading, payload: false });
      action?.onFailure?.('"Upload failed"');
    }
  } catch (error) {
    toast.error("Server error");
    action?.onFailure?.();
  }
  dispatch({ type: appActionTypes.loading, payload: false });
};
