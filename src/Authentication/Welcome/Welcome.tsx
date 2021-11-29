import React from "react";
import { Image, Dimensions } from "react-native";
import { Box, Button, Text } from "../../components";
import { Routes, StackNavigationProps } from "../../components/Navigation";
import theme from "../../components/Theme";

const picture = {
  src: require("../../../assets/images/5.png"),
  width: 3383,
  height: 5074,
};

const { width } = Dimensions.get("window");

const Welcome = ({ navigation }: StackNavigationProps<Routes, "Welcome">) => {
  return (
    <Box flex={1} backgroundColor={"white"}>
      <Box
        flex={1}
        borderBottomRightRadius={"xl"}
        backgroundColor={"grey"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Image
          source={picture.src}
          style={{
            flex: 1,
            width: width - theme.borderRadii.xl,
            height:
              ((width - theme.borderRadii.xl) * picture.height) / picture.width,
            borderBottomRightRadius: 75,
          }}
          resizeMode="cover"
        />
      </Box>
      <Box flex={1} backgroundColor={"grey"}>
        <Box
          flex={1}
          backgroundColor={"white"}
          borderTopLeftRadius={"xl"}
          justifyContent="space-evenly"
          alignItems="center"
          padding={"xl"}
        >
          <Text variant="title2">Let's get started</Text>
          <Text variant="body">
            Login to your account below or signup for an amazing experience
          </Text>
          <Button
            variant="primary"
            label="Have an account? Login"
            onPress={() => navigation.navigate("Login")}
          />
          <Button
            variant="default"
            label="Join us, it's free"
            onPress={() => {}}
          />
          <Button
            variant="transparent"
            label="Forgot Password"
            onPress={() => {}}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;
