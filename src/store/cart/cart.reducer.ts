import { ADD_TO_CART, GET_CART_ITEMS } from "./cart.type";

const initialState = {
  items: [],
  meta: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_ITEMS:
      return {
        ...state,
        items: action.payload.data,
        meta: action.payload.meta,
      };
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
};
