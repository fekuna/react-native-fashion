import React from "react";
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import { HomeRoutes } from "../components/Navigation";
import DrawerContent, { DRAWER_WIDTH } from "./Drawer";

import OutfitIdeas from "./OutfitIdeas/OutfitIdeas";

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
  </Drawer.Navigator>
);
