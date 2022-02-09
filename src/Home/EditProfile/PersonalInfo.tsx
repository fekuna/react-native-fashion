import { yupResolver } from "@hookform/resolvers/yup";
import { useFocusEffect } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView } from "react-native";
import { RootStateOrAny, useSelector } from "react-redux";
import { object, SchemaOf, string } from "yup";
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

interface personalInfoFormProps {
  name: string;
  email: string;
  address: string;
}

const personalInfoSchema: SchemaOf<personalInfoFormProps> = object({
  name: string()
    .required("Name is required")
    .min(2, "Too Short!")
    .max(25, "Too Long!"),
  email: string().required("Email is required").email("Invalid email"),
  address: string()
    .required("Address is required")
    .min(5, "Too Short!")
    .max(60, "Too Long!"),
});

const PersonalInfo = ({ loadUser }) => {
  const user = useSelector((state: RootStateOrAny) => state.auth.user);

  console.log("personal info", user);

  const { control, handleSubmit } = useForm<personalInfoFormProps>({
    resolver: yupResolver(personalInfoSchema),
    defaultValues: {
      name: user.name,
      address: user.address,
      email: user.email,
    },
    mode: "all",
  });

  const [genders, setGenders] = useState([]);

  const onSubmit = async (data) => {
    let response;
    try {
      response = await api.put(`/users/${user.sub}`, {
        name: data.name,
        email: data.email,
        address: data.address,
        genderId: genders[0]?.id,
      });
    } catch (err) {
      Alert.alert("Failed to edit profile");
    }
    console.log(data);

    if (response?.status === 200) {
      Alert.alert("Update data success", null, [
        {
          onPress: () => {
            loadUser();
          },
        },
      ]);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log("hehe");
    }, [])
  );

  // const user = useSelector((state: RootStateOrAny) => state.auth.user);

  console.log("genders", genders);

  return (
    <ScrollView>
      <Box padding="m">
        <Text variant="body" marginBottom="m">
          Account Information
        </Text>
        <Box marginBottom="m">
          <Controller
            control={control}
            name="name"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { isTouched, error },
            }) => (
              <TextInput
                icon="user"
                placeholder="Enter your full name"
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
            name="email"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { isTouched, error },
            }) => (
              <TextInput
                icon="mail"
                placeholder="Enter your email"
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
            name="address"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { isTouched, error },
            }) => (
              <TextInput
                icon="map-pin"
                placeholder="Address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={error}
                touched={isTouched}
                returnKeyType="next"
                returnKeyLabel="next"
                defaultValue={user.address}
              />
            )}
          />
        </Box>
        <CheckboxGroup
          options={gendersData}
          radio
          selectedValue={genders}
          setSelectedValue={setGenders}
        />
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

export default PersonalInfo;
