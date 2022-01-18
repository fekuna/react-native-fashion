import axios from "axios";
import * as SecureStore from "expo-secure-store";
import store from "../store";
import { logout } from "../store/user/user.action";
import { SIGN_IN } from "../store/user/user.type";

export const API_URL = "http://192.168.1.9:8000";

const instance = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    console.log("Interceptors request");
    const token = await SecureStore.getItemAsync("accessToken");
    if (token && config.url !== "/auth/refresh") {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  (err) => {
    console.log("Interceptors Request Err", err);
    return Promise.reject(err);
  }
);

// const responseInterceptor =
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    console.log("Interceptors Response err", originalConfig);

    if (originalConfig.url !== "/auth/signin" && err.response) {
      console.log("Api APi", err.response.status);
      // Access Token was expired
      console.log("originalConfig Retry", originalConfig._retry);
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        console.log("originalConfig Retry 2", originalConfig._retry);

        const refreshToken = await SecureStore.getItemAsync("refreshToken");

        try {
          // console.log("Try refresh", refreshToken);

          // instance.interceptors.response.eject(responseInterceptor);
          // instance(originalConfig);

          const rs = await instance.post(
            "/auth/refresh",
            {},
            {
              ...originalConfig,
              headers: {
                Authorization: "Bearer " + refreshToken,
              },
            }
          );

          // console.log("RefreshToken successful", rs);

          const { access_token, refresh_token } = rs.data;
          await SecureStore.setItemAsync("accessToken", access_token);
          await SecureStore.setItemAsync("refreshToken", refresh_token);

          return instance(originalConfig);
        } catch (err) {
          // console.log("Inside catch", err.response);

          if (err.response?.status === 401) {
            console.log("mashook");
            await SecureStore.deleteItemAsync("accessToken");
            await SecureStore.deleteItemAsync("refreshToken");
            store.dispatch({ type: SIGN_IN, payload: {} });
          }
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
