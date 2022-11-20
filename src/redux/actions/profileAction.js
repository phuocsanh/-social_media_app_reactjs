import { getDataAPI, postDataAPI } from "../../utils/fetchData";
import {
  appActionTypes,
  authActionTypes,
  profileActionTypes,
} from "../action-types/actionTypes";
import { toast } from "react-toastify";

export const getUserById = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: appActionTypes.loading, payload: true });
    const res = await getDataAPI(`getUserById/${id}`, token);

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
