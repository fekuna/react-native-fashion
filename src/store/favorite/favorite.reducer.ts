import {
  DELETE_ALL_PRODUCT_FAVORITES,
  GET_PRODUCT_FAVORITES,
} from "./favorite.type";

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_FAVORITES:
      return {
        ...state,
        items: action.payload,
      };
    case DELETE_ALL_PRODUCT_FAVORITES:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};
