import React, { useRef } from "react";
import { TextInput } from "react-native";
import { Controller, useForm } from "react-hook-form";

import { Box, Button, Text } from "../components";
import Container from "../components/Container";
import RNTextInput from "../components/Form/TextInput";
import { AuthNavigationProps } from "../components/Navigation";
import { SchemaOf, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Footer from "./components/Footer";
import { CommonActions } from "@react-navigation/routers";

interface LoginFormProps {
  email: string;
  password: string;
}

const loginFormSchema: SchemaOf<LoginFormProps> = object({
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const Login = ({ navigation }: AuthNavigationProps<"Login">) => {
  const { control, handleSubmit } = useForm<LoginFormProps>({
    resolver: yupResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
    mode: "all",
  });

  const password = useRef<TextInput>(null);

  const footer = (
    <Footer
      title="Don't have an account?"
      action="Sign Up here"
      onPress={() => navigation.navigate("SignUp")}
    />
  );

  const onSubmit = (data) =>
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    );

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
