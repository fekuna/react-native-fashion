import React from "react";
import { useNavigation } from "@react-navigation/native";
import { CommonActions, DrawerActions } from "@react-navigation/routers";
import { Dimensions, Image } from "react-native";
import { Box, Text, useTheme } from "../../components";

import { HomeScreenProp } from "../../components/Navigation";

import Header from "../../components/Header";
import DrawerItem from "./DrawerItem";

const { width } = Dimensions.get("window");
export const DRAWER_WIDTH = width * 0.8;
const aspectRatio = 769 / 1531;
const height = DRAWER_WIDTH * aspectRatio;

export const assets = [require("./assets/drawer.png")];

const items = [
  {
    icon: "zap",
    label: "Outfit Ideas",
    screen: "OutfitIdeas",
    color: "primary",
  },
  {
    icon: "heart",
    label: "Favorite Outfits",
    screen: "FavoriteOutfits",
    color: "drawer1",
  },
  {
    icon: "user",
    label: "Edit Profile",
    screen: "EditProfile",
    color: "drawer2",
  },
  {
    icon: "clock",
    label: "Transaction History",
    screen: "TransactionHistory",
    color: "drawer3",
  },
  {
    icon: "settings",
    label: "Notification Settings",
    screen: "Settings",
    color: "drawer4",
  },
  {
    icon: "log-out",
    label: "Logout",
    onPress: (navigation) =>
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Authentication" }],
        })
      ),
    color: "secondary",
  },
];

const Drawer = () => {
  const theme = useTheme();
  const navigation = useNavigation<HomeScreenProp>();

  return (
    <Box flex={1}>
      <Box flex={0.2}>
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
            title="Menu"
            left={{
              icon: "x",
              onPress: () => navigation.dispatch(DrawerActions.closeDrawer()),
            }}
            right={{
              icon: "shopping-bag",
              onPress: () => navigation.navigate("Cart"),
            }}
            dark
          />
        </Box>
      </Box>
      <Box flex={0.8}>
        <Box flex={1} backgroundColor="secondary" />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderTopLeftRadius="xl"
          borderBottomRightRadius="xl"
          backgroundColor="background"
          justifyContent="center"
          padding="xl"
        >
          <Box
            position="absolute"
            left={DRAWER_WIDTH / 2 - 50}
            top={-50}
            backgroundColor="primary"
            style={{ borderRadius: 50 }}
            width={100}
            height={100}
          />
          <Box marginTop="xl">
            <Text variant="title1" textAlign="center">
              Mike Peter
            </Text>
            <Text variant="body" textAlign="center">
              mike@fashionvista.com
            </Text>
          </Box>
          {items.map((item, idx) => (
            <DrawerItem key={idx} {...item} />
          ))}
        </Box>
      </Box>
      <Box
        backgroundColor="background"
        width={DRAWER_WIDTH}
        overflow="hidden"
        height={height * 0.61}
      >
        <Image
          source={assets[0]}
          style={{
            width: DRAWER_WIDTH,
            height,
            borderTopLeftRadius: theme.borderRadii.xl,
          }}
        />
      </Box>
    </Box>
  );
};

export default Drawer;
