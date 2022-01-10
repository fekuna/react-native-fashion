import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { Alert } from "react-native";
import api from "../../utils/api";
import { SIGN_IN } from "./user.type";

export const signin = (data) => async (dispatch) => {
  const { email, password } = data;

  console.log({ email, password });

  const response = await api.post("/auth/signin", { email, password });

  const { access_token, refresh_token } = response?.data;

  await SecureStore.setItemAsync("accessToken", access_token);
  await SecureStore.setItemAsync("refreshToken", refresh_token);

  const jwtDecoded = await jwtDecode(access_token);

  // console.log("\naccessToken: ", await SecureStore.getItemAsync("accessToken"));
  // console.log(
  //   "\nrefreshToken: ",
  //   await SecureStore.getItemAsync("refreshToken")
  // );
  console.log("\njwtDecoded: ", jwtDecoded);

  dispatch(setCurrentUser(jwtDecoded));
};

export const logout = () => async (dispatch) => {
  let response;
  try {
    response = await api.post("/auth/logout");
  } catch (err) {
    console.log("inside logout function error");
    // return Promise.reject(err);
  }

  console.log("Inside logout function", response?.status);

  if (response?.status === 200) {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");

    dispatch(setCurrentUser({}));
  }
};

export const setCurrentUser = (decoded) => {
  return { type: SIGN_IN, payload: decoded };
};

interface updateUserType {
  name?: string;
  email?: string;
  address?: string;
}

export const updateUser =
  (userId: string, data: updateUserType) => async (dispatch) => {
    let response;
    try {
      response = await api.put(`/users/${userId}`, data);
    } catch (err) {
      console.log("inside updateUser function error", err.response?.data);
      Alert.alert("Update failed", "Something went wrong");
      // return Promise.reject(err);
    }

    console.log("Inside updateUser function", response?.status);

    if (response?.status === 200) {
      Alert.alert("Update success");
    }
  };
