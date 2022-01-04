import api from "../../utils/api";
import { GET_CART_ITEMS } from "./cart.type";

interface AddItemToCart {
  productId: number;
  quantity?: number;
}

export const addItemToCart =
  ({ productId, quantity = 1 }: AddItemToCart) =>
  async (dispatch) => {
    console.log({ productId, quantity });
    let response;
    try {
      response = await api.post("/cart", { productId, quantity });
    } catch (err) {
      console.log("addItemToCart err:", err);
    }
  };

export const getCartItems = () => async (dispatch) => {
  let response;

  try {
    response = await api.get("/cart");
  } catch (err) {
    console.log("getCartItems err:", err);
  }

  dispatch({
    type: GET_CART_ITEMS,
    payload: response.data,
  });
};

export const removeCartItem = (id: number) => async (dispatch) => {
  let response;

  try {
    response = await api.delete(`/cart/${id}`);
  } catch (err) {
    console.log("remove cart item: ", err);
  }

  if (response?.status === 200) {
    console.log(`cart item with ID ${id} removed`);
  }
};

export const updateCartItem =
  (id: number, quantity: number) => async (dispatch) => {
    console.log("updateCartItem", { id, quantity });
    let response;

    try {
      response = await api.put(`/cart/${id}`, { quantity });
    } catch (err) {
      console.log("remove cart item: ", err);
    }

    if (response?.status === 200) {
      console.log(`cart item with ID ${id} removed`);
    }

    console.log("Update Cart Item", response?.status);
  };
