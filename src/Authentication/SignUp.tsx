import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { object, SchemaOf, string, ref as yupRef } from "yup";
import { Box, Button, Text } from "../components";
import Container from "../components/Container";
import { AuthNavigationProps } from "../components/Navigation";
import Footer from "./components/Footer";
import RNTextInput from "../components/Form/TextInput";

interface LoginFormProps {
  email: string;
  password: string;
  confirmPassword: string;
}

const signupFormSchema: SchemaOf<LoginFormProps> = object({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  confirmPassword: string()
    .equals([yupRef("password")], "Passwords don't match")
    .required("Required"),
});

const SignUp = ({ navigation }: AuthNavigationProps<"SignUp">) => {
  const { control, handleSubmit } = useForm<LoginFormProps>({
    resolver: yupResolver(signupFormSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
    mode: "all",
  });

  const password = useRef<TextInput>(null);
  const confirmPassword = useRef<TextInput>(null);
  const footer = (
    <Footer
      title="Already have an account?"
      action="Login here"
      onPress={() => navigation.navigate("Login")}
    />
  );

  const onSubmit = (data) => console.log("signUp: ", data);

  return (
    <Container pattern={1} {...{ footer }}>
      <Text variant="title1" textAlign="center" marginBottom="l">
        Create account
      </Text>
      <Text variant="body" textAlign="center" marginBottom="l">
        Let us know your email and password.
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
                returnKeyType="next"
                returnKeyLabel="next"
                onSubmitEditing={() => confirmPassword.current?.focus()}
                secureTextEntry
              />
            )}
          />
        </Box>
        <Controller
          control={control}
          name="confirmPassword"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error, isTouched },
          }) => (
            <RNTextInput
              ref={confirmPassword}
              icon="lock"
              placeholder="Confirm your password"
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
        <Box alignItems="center" marginTop="m">
          <Button
            variant="primary"
            label="Create your account"
            onPress={handleSubmit(onSubmit)}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
