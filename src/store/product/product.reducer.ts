import { GET_PRODUCTS } from "./product.type";

const initialState = {
  items: [],
  meta: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        items: [...state.items, ...action.payload.data],
        meta: action.payload.meta,
      };
    default:
      return state;
  }
};
