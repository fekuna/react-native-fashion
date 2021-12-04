import React from "react";
import { Linking } from "react-native";

import Container from "../components/Container";
import { Box, Button, Text } from "../components";
import { AuthNavigationProps } from "../components/Navigation";
import Footer from "./components/Footer";
import { Controller, useForm } from "react-hook-form";
import { object, SchemaOf, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RNTextInput from "../components/Form/TextInput";

interface ForgotPasswordFormProps {
  email: string;
}

const ForgotPasswordFormSchema: SchemaOf<ForgotPasswordFormProps> = object({
  email: string().email("Invalid email").required("Email is required"),
});

const ForgotPassword = ({
  navigation,
}: AuthNavigationProps<"ForgotPassword">) => {
  const { control, handleSubmit } = useForm<ForgotPasswordFormProps>({
    resolver: yupResolver(ForgotPasswordFormSchema),
    defaultValues: { email: "" },
    mode: "all",
  });

  const footer = (
    <Footer
      title="Not working?"
      action="Try another way"
      onPress={() => Linking.openURL("mailto:help@support.com")}
    />
  );

  const onSubmit = (data) => navigation.navigate("PasswordChanged");

  return (
    <Container pattern={2} {...{ footer }}>
      <Text variant="title1" textAlign="center" marginBottom="l">
        Forgot Password?
      </Text>
      <Text variant="body" textAlign="center" marginBottom="l">
        Enter the email address associated with your account.
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
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
          />
        </Box>
        <Box alignItems="center" marginTop="m">
          <Button
            variant="primary"
            label="Reset Password"
            onPress={handleSubmit(onSubmit)}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
