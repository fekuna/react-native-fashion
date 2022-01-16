import { Alert } from "react-native";
import api from "../../utils/api";
import { GET_CART_ITEMS } from "./cart.type";

interface AddItemToCart {
  productId: number;
  quantity?: number;
  size: { id: number; name: string }[];
  image?: string;
}

export const addItemToCart =
  ({ productId, quantity = 1, size = [], image }: AddItemToCart) =>
  async (dispatch) => {
    console.log("addItemToCart", { productId, quantity, image, size });
    let response;
    try {
      response = await api.post("/cart", {
        productId,
        quantity,
        size: size[0]?.name,
        image,
      });
    } catch (err) {
      Alert.alert("Oops", String(err.response?.data.message));
      console.log("addItemToCart err:", err.response?.data);
    }

    if (response?.status === 201) {
      Alert.alert("Product added");
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

export const createOrder =
  (shippingFee: number, address: string) => async (dispatch) => {
    let response;

    try {
      response = await api.post(`/orders`, { shippingFee, address });
    } catch (err) {
      if (err.response?.data.statusCode === 400) {
        Alert.alert("Oops", String(err.response?.data?.message));
      }
      console.log("order Err: ", err.response?.data);
    }

    console.log("createOrder", response?.status);

    if (response?.status === 201) {
      Alert.alert("Success", "Your order has been added", [
        { text: "OK", onPress: () => dispatch(getCartItems()) },
      ]);
    }
  };
