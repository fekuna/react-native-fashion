import { Alert } from "react-native";
import api from "../../utils/api";
import { GET_GRAPH_DATA, GET_HISTORY_TRANSACTION } from "./history.type";

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
    return response.data;
  }
};

export const getGraphData = () => async (dispatch) => {
  let response;

  try {
    response = await api.get("/orders/graph");
  } catch (err) {
    console.log("getGraphData failed", err);
  }

  if (response?.status === 200) {
    dispatch({
      type: GET_GRAPH_DATA,
      payload: response.data,
    });

    return response.data;
  }
};

export const cancelOrderItemStatus = (itemId: number) => async (dispatch) => {
  let response;

  try {
    response = await api.put(`/orderitems/status/${itemId}`, { statusId: 4 });
  } catch (err) {
    Alert.alert("Cancel order item failed", "something went wrong");
  }

  if (response?.status === 200) {
    Alert.alert(null, "Cancel item success", [
      {
        text: "ok",
        onPress: () => {
          // dispatch(getHistoryTransaction());
        },
      },
    ]);
  }
};
