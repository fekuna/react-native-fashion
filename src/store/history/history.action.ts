import api from "../../utils/api";
import { GET_HISTORY_TRANSACTION } from "./history.type";

export const getHistoryTransaction = () => async (dispatch) => {
  let response;

  try {
    response = await api.get("/orders/user");
  } catch (err) {
    console.log("getHistoryTransaction err: ", err);
  }

  console.log("getHistoryTransaction", response?.status);

  if (response?.status === 200) {
    dispatch({
      type: GET_HISTORY_TRANSACTION,
      payload: response.data,
    });
  }
};
