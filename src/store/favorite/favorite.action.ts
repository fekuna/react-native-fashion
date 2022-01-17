import api from "../../utils/api";
import { GET_PRODUCT_FAVORITES } from "./favorite.type";

export const getProductFavorites = () => async (dispatch) => {
  let response;
  try {
    response = await api.get(`/products/favorite`);
  } catch (err) {
    console.log("failed to get products");
  }

  if (response?.status === 200) {
    // console.log(response.data);
    dispatch({ type: GET_PRODUCT_FAVORITES, payload: response.data });
  }
};
