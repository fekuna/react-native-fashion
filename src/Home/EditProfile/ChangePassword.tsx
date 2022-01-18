import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView } from "react-native";
import { RootStateOrAny, useSelector } from "react-redux";
import { object, SchemaOf, string, ref as yupRef } from "yup";
import { Box, Button, Text, TextInput } from "../../components";
import CheckboxGroup from "../../components/CheckboxGroup";
import api from "../../utils/api";

// const genders = [
//   { value: "male", label: "Male" },
//   { value: "female", label: "Female" },
// ];
const gendersData = [
  { id: 1, name: "male" },
  { id: 2, name: "female" },
];

interface changePasswordFormProps {
  currentPassword: string;
  newPassword: string;
  passwordConfirm: string;
}

const changePasswordSchema: SchemaOf<changePasswordFormProps> = object({
  currentPassword: string().required("Current password is required"),
  newPassword: string()
    .required("Password Required")
    .min(4)
    .max(20)
    .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: "Password too weak",
    }),
  passwordConfirm: string()
    .min(4)
    .max(20)
    .equals([yupRef("newPassword")], "Passwords don't match")
    .required("Confirm Password Required"),
});

const EditPassword = () => {
  const user = useSelector((state: RootStateOrAny) => state.auth.user);

  const { control, handleSubmit, reset } = useForm<changePasswordFormProps>({
    resolver: yupResolver(changePasswordSchema),
    mode: "all",
  });

  const [genders, setGenders] = useState([]);

  const onSubmit = async (data, e) => {
    let response;
    try {
      const { currentPassword, newPassword, passwordConfirm } = data;
      console.log({ currentPassword, newPassword, passwordConfirm });
      response = await api.put(`/auth/password`, {
        currentPassword,
        newPassword,
        passwordConfirm,
      });
    } catch (err) {
      // console.log(err.response);
      Alert.alert("Failed to change password");
    }

    if (response?.status === 200) {
      Alert.alert("Update password success", null, [
        { onPress: () => reset() },
      ]);
    }
  };

  // const user = useSelector((state: RootStateOrAny) => state.auth.user);

  console.log("genders", genders);

  return (
    <ScrollView>
      <Box padding="m">
        <Text variant="body" marginBottom="m">
          Change Password
        </Text>
        <Box marginBottom="m">
          <Controller
            control={control}
            name="currentPassword"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { isTouched, error },
            }) => (
              <TextInput
                secureTextEntry
                icon="lock"
                placeholder="Current password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={error}
                touched={isTouched}
                autoCompleteType="name"
                returnKeyType="next"
                returnKeyLabel="next"
              />
            )}
          />
        </Box>
        <Box marginBottom="m">
          <Controller
            control={control}
            name="newPassword"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { isTouched, error },
            }) => (
              <TextInput
                secureTextEntry
                icon="key"
                placeholder="New password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={error}
                touched={isTouched}
                autoCompleteType="name"
                returnKeyType="next"
                returnKeyLabel="next"
              />
            )}
          />
        </Box>
        <Box marginBottom="m">
          <Controller
            control={control}
            name="passwordConfirm"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { isTouched, error },
            }) => (
              <TextInput
                secureTextEntry
                icon="key"
                placeholder="Confirm Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={error}
                touched={isTouched}
                returnKeyType="next"
                returnKeyLabel="next"
              />
            )}
          />
        </Box>
        <Box alignItems="center" marginTop="m">
          <Button
            variant="primary"
            label="Submit"
            onPress={handleSubmit(onSubmit)}
          />
        </Box>
      </Box>
    </ScrollView>
  );
};

export default EditPassword;
