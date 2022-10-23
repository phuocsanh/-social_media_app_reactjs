import { postDataAPI } from "../../utils/fetchData";
import { appActionTypes, authActionTypes } from "../action-types/actionTypes";
import { toast } from "react-toastify";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: appActionTypes.loading, payload: true });
    const res = await postDataAPI("login", data);
    // console.log("🚀 ~ file: authAction.js ~ line 13 ~ login ~ res", res);
    if (res.data.status) {
      toast.success(res.data.msg);
      localStorage.setItem("firstLogin", true);
      dispatch({
        type: authActionTypes.auth,
        payload: { token: res.data.accessToken, user: res.data.data },
      });
      dispatch({ type: appActionTypes.loading, payload: false });
    } else {
      toast.error(res.data.msg);
    }
  } catch (error) {
    toast.error("Server error");
  }
};
export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    try {
      const res = await postDataAPI("refresh-token");

      dispatch({
        type: authActionTypes.auth,
        payload: { token: res.data.accessToken, user: res.data.data },
      });
    } catch (error) {
      console.log("error", error);
    }
  }
};
