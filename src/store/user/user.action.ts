import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { Alert } from "react-native";
import api from "../../utils/api";
import { SIGN_IN } from "./user.type";

export const signin = (data) => async (dispatch) => {
  const { email, password } = data;

  console.log({ email, password });

  let response;
  try {
    response = await api.post("/auth/signin", { email, password });
  } catch (err) {
    if (err.response?.data?.statusCode === 403) {
      Alert.alert("Login failed!", String(err.response.data.message));
    }
  }

  if (response?.status === 200) {
    const { access_token, refresh_token } = response?.data;

    await SecureStore.setItemAsync("accessToken", access_token);
    await SecureStore.setItemAsync("refreshToken", refresh_token);

    const jwtDecoded = await jwtDecode(access_token);
    dispatch(setCurrentUser(jwtDecoded));
  }
};

export const signup = (data) => async (dispatch) => {
  const { email, name, password, passwordConfirm } = data;
  console.log("SIGNUP", data);

  let response;
  try {
    response = await api.post("/auth/signup", {
      email,
      name,
      password,
      passwordConfirm,
      roleId: 1,
    });
  } catch (err) {
    if (err.response?.data) {
      if (Array.isArray(err.response.data.message)) {
        return Alert.alert(
          "Something went wrong",
          String(err.response.data.message[0])
        );
      }
      Alert.alert("Something went wrong", String(err.response.data.message));
    }
  }

  if (response?.status === 201) {
    const { access_token, refresh_token } = response?.data;

    await SecureStore.setItemAsync("accessToken", access_token);
    await SecureStore.setItemAsync("refreshToken", refresh_token);
    const jwtDecoded = await jwtDecode(access_token);

    console.log("\njwtDecoded: ", jwtDecoded);
    Alert.alert("Success", "Sign up success", [
      {
        text: "Ok",
        onPress: () => {
          dispatch(setCurrentUser(jwtDecoded));
        },
      },
    ]);
  }

  // console.log("\naccessToken: ", await SecureStore.getItemAsync("accessToken"));
  // console.log(
  //   "\nrefreshToken: ",
  //   await SecureStore.getItemAsync("refreshToken")
  // );
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
