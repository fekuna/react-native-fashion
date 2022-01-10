import { GET_GRAPH_DATA, GET_HISTORY_TRANSACTION } from "./history.type";

const initialState = {
  items: [],
  graph: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HISTORY_TRANSACTION:
      return {
        ...state,
        items: action.payload,
      };
    case GET_GRAPH_DATA:
      return {
        ...state,
        graph: action.payload,
      };
    default:
      return state;
  }
};
