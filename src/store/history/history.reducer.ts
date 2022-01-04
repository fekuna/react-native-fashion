import { GET_HISTORY_TRANSACTION } from "./history.type";

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HISTORY_TRANSACTION:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};
