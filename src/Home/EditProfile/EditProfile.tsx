import React, { useState } from "react";
import { DrawerActions } from "@react-navigation/native";
import { Alert, Dimensions, Image, Pressable, View } from "react-native";

import { HomeNavigationProps } from "../../components/Navigation";
import { Box, Header, Text, useTheme } from "../../components";
import Tabs from "./Tabs";
import Configuration from "./Configuration";
import PersonalInfo from "./PersonalInfo";

import { useFocusEffect } from "@react-navigation/core";

import api, { API_URL } from "../../utils/api";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { UPDATE_CURRENT_USER } from "../../store/user/user.type";
import EditPassword from "./ChangePassword";
import RoundIcon from "../../components/RoundIcon";

import * as ImagePicker from "expo-image-picker";
import FormData from "form-data";

const { width } = Dimensions.get("window");
const tabs = [
  { id: "info", title: "Personal Info" },
  { id: "password", title: "Password" },
];

const EditProfile = ({ navigation }: HomeNavigationProps<"EditProfile">) => {
  const theme = useTheme();

  const user = useSelector((state: RootStateOrAny) => state.auth.user);

  const dispatch = useDispatch();

  const loadUser = async () => {
    let response;
    try {
      response = await api.get(`/users/${user.sub}`);
    } catch (err) {
      Alert.alert(`failed to get current user`);
    }

    if (response?.status === 200) {
      dispatch({
        type: UPDATE_CURRENT_USER,
        payload: response.data,
      });
      // setUserData(response.data);
    }
  };

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = pickerResult.uri;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("image", { uri: localUri, name: filename, type });

    let response;
    try {
      response = await api.put("/users/img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log(err.response);
      Alert.alert(`failed to upload user`);
    }

    if (response?.status === 200) {
      Alert.alert(`update profile photo success`, null, [
        {
          onPress: () => {
            loadUser();
          },
        },
      ]);
    }

    console.log("Picker Result: ", { localUri, filename, type });
  };

  useFocusEffect(
    React.useCallback(() => {
      loadUser();
    }, [])
  );

  console.log("userData", user);

  return (
    <Box flex={1} backgroundColor="background">
      <Box flex={0.2} backgroundColor="background">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderBottomRightRadius="xl"
          backgroundColor="secondary"
        >
          <Header
            title="Edit Profile"
            left={{
              icon: "menu",
              onPress: () => navigation.dispatch(DrawerActions.openDrawer()),
            }}
            dark
          />
        </Box>
      </Box>
      <Box>
        <Box
          position="absolute"
          left={width / 2 - 50}
          top={-30}
          backgroundColor="primary"
          style={{ borderRadius: 50 }}
          width={100}
          height={100}
        >
          <Image
            source={{
              uri: `${API_URL}/api/${user.img}`,
            }}
            style={{
              // backgroundColor: "red",
              width: 100,
              borderRadius: 50,
              height: 100,
              // overflow: "hidden",
            }}
          />
          <View
            style={{
              position: "absolute",
              left: 0,
              bottom: -5,
              zIndex: 99,
            }}
          >
            <Pressable onPress={openImagePickerAsync}>
              <RoundIcon
                name="pen-tool"
                backgroundColor="primary"
                color="background"
                size={30}
              />
            </Pressable>
          </View>
        </Box>
        <Box marginVertical="m" style={{ marginTop: 50 + theme.spacing.m }}>
          <Text variant="title1" textAlign="center">
            {user.name}
          </Text>
          <Text variant="body" textAlign="center">
            {user.email}
          </Text>
        </Box>
      </Box>
      <Tabs tabs={tabs}>
        <PersonalInfo loadUser={loadUser} />
        {/* <Configuration /> */}
        <EditPassword />
      </Tabs>
    </Box>
  );
};

export default EditProfile;
