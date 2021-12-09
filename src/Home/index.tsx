import React from "react";
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import { HomeRoutes } from "../components/Navigation";
import DrawerContent, { DRAWER_WIDTH } from "./Drawer";

import OutfitIdeas from "./OutfitIdeas/OutfitIdeas";
import FavoriteOutfits from "./FavoriteOutfits/FavoriteOutfits";
import EditProfile from "./EditProfile/EditProfile";
import TransactionHistory from "./TransactionHistory/TransactionHistory";

const Drawer = createDrawerNavigator<HomeRoutes>();

export const HomeNavigator = () => (
  <Drawer.Navigator
    drawerContent={() => <DrawerContent />}
    screenOptions={{
      drawerStyle: {
        width: DRAWER_WIDTH,
      },
      headerShown: false,
    }}
  >
    <Drawer.Screen name="OutfitIdeas" component={OutfitIdeas} />
    <Drawer.Screen name="FavoriteOutfits" component={FavoriteOutfits} />
    <Drawer.Screen name="EditProfile" component={EditProfile} />
    <Drawer.Screen name="TransactionHistory" component={TransactionHistory} />
  </Drawer.Navigator>
);
