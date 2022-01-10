import api from "../../utils/api";
import { GET_PRODUCTS } from "./product.type";

interface getProductProps {
  page?: number;
  take?: number;
  keyword?: string;
  categoryId?: number;
}

export const getProducts =
  ({ page, take, keyword = "", categoryId }: getProductProps) =>
  async (dispatch) => {
    console.log("getProductAction", { page, take, keyword, categoryId });

    let response;
    try {
      response = await api.get(
        `/products?page=${page}&take=${take}&keyword=${keyword}&categoryId=${categoryId}`
      );
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
