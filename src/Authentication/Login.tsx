import React, { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { SchemaOf, object, string } from "yup";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

import { Box, Button, Text } from "../components";
import Container from "../components/Container";
import RNTextInput from "../components/Form/TextInput";
import { AuthNavigationProps } from "../components/Navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import Footer from "./components/Footer";
import { CommonActions } from "@react-navigation/routers";
import Checkbox from "../components/Form/Checkbox";
import { BorderlessButton } from "react-native-gesture-handler";

import api from "../utils/api";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { signin } from "../store/user/user.action";

interface LoginFormProps {
  email: string;
  password: string;
}

const loginFormSchema: SchemaOf<LoginFormProps> = object({
  email: string().required("Email is required").email("Invalid email"),
  password: string()
    .required("Required")
    .min(2, "Too Short!")
    .max(50, "Too Long!"),
});

const Login = ({ navigation }: AuthNavigationProps<"Login">) => {
  const isAuthenticated = useSelector(
    (state: RootStateOrAny) => state.auth?.isAuthenticated
  );
  const { control, handleSubmit } = useForm<LoginFormProps>({
    resolver: yupResolver(loginFormSchema),
    // defaultValues: { email: "", password: "" },
    mode: "all",
  });

  const dispatch = useDispatch();

  const password = useRef<TextInput>(null);
  const [remember, setRemember] = useState(false);

  const footer = (
    <Footer
      title="Don't have an account?"
      action="Sign Up here"
      onPress={() => navigation.navigate("SignUp")}
    />
  );

  const onSubmit = async (data) => {
    console.log(
      "\n onsubmit - accessToken: ",
      await SecureStore.getItemAsync("accessToken")
    );

    dispatch(signin(data));
  };

  useEffect(() => {
    // if (isAuthenticated) {
    //   console.log("bangsat");
    //   navigation.dispatch(
    //     CommonActions.reset({
    //       index: 0,
    //       routes: [{ name: "Home" }],
    //     })
    //   );
    // }

    console.log("useEffect - isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Container pattern={0} {...{ footer }}>
      <Text variant="title1" textAlign="center" marginBottom="l">
        Welcome Back
      </Text>
      <Text variant="body" textAlign="center" marginBottom="l">
        Use your credentials below and login to your account.
      </Text>
      <Box>
        <Box marginBottom="m">
          <Controller
            control={control}
            name="email"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { isTouched, error },
            }) => (
              <RNTextInput
                icon="mail"
                placeholder="Enter your email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={error}
                touched={isTouched}
                autoCompleteType="email"
                returnKeyType="next"
                returnKeyLabel="next"
                onSubmitEditing={() => password.current?.focus()}
              />
            )}
          />
        </Box>
        <Box marginBottom="m">
          <Controller
            control={control}
            name="password"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error, isTouched },
            }) => (
              <RNTextInput
                ref={password}
                icon="lock"
                placeholder="Enter your password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={error}
                touched={isTouched}
                autoCompleteType="password"
                autoCapitalize="none"
                returnKeyType="go"
                returnKeyLabel="go"
                onSubmitEditing={handleSubmit(onSubmit)}
                secureTextEntry
              />
            )}
          />
        </Box>
        <Box
          flexDirection="row"
          justifyContent="flex-end"
          marginVertical="s"
          alignItems="center"
        >
          {/* <Checkbox
            label="Remember me"
            checked={remember}
            onChange={() => setRemember((prevState) => !prevState)}
          /> */}
          <BorderlessButton
            onPress={() => {
              // navigation.navigate("ForgotPassword");
              navigation.push("ForgotPassword");
            }}
          >
            <Text variant="button" color="primary">
              Forgot Password
            </Text>
          </BorderlessButton>
        </Box>
        <Box alignItems="center" marginTop="m">
          <Button
            variant="primary"
            label="Log into your account"
            onPress={handleSubmit(onSubmit)}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
