import api from "../../utils/api";
import { GET_PRODUCTS } from "./product.type";

interface getProductProps {
  page?: number;
  take?: number;
  keyword?: string;
}

export const getProducts =
  ({ page, take, keyword }: getProductProps) =>
  async (dispatch) => {
    let response;
    try {
      response = await api.get(`/products?page=${page}&take=${take}`);
    } catch (err) {
      console.log("failed to get products");
    }

    // console.log("Inside getProducts", response.data);

    const { data, meta } = response?.data;
    // console.log("getProducts", { data, meta });
    dispatch({
      type: GET_PRODUCTS,
      payload: {
        data,
        meta,
      },
    });
  };
