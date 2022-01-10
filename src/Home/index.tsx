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
import Settings from "./Settings/Settings";
import Cart from "./Cart";
import Products from "./Products";
import { createStackNavigator } from "@react-navigation/stack";
import ProductDetail from "./Products/ProductDetail";
import ProductSearch from "./Products/ProductSearch";
import EditShippingAddress from "./Cart/EditShippingAddress";
import TransactionItemList from "./TransactionHistory/TransactionItemList";

const Drawer = createDrawerNavigator<HomeRoutes>();

const AppStack = createStackNavigator();

const ProductsStack = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false }}>
    <AppStack.Screen name="Products" component={Products} />
    <AppStack.Screen name="ProductDetail" component={ProductDetail} />
    <AppStack.Screen name="ProductSearch" component={ProductSearch} />
  </AppStack.Navigator>
);

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
    {/* <Drawer.Screen name="OutfitIdeas" component={OutfitIdeas} /> */}
    <Drawer.Screen name="ProductList" component={ProductsStack} />
    <Drawer.Screen name="FavoriteOutfits" component={FavoriteOutfits} />
    <Drawer.Screen name="EditProfile" component={EditProfile} />
    <Drawer.Screen name="TransactionHistory" component={TransactionHistory} />
    <Drawer.Screen name="TransactionItemList" component={TransactionItemList} />
    <Drawer.Screen name="Settings" component={Settings} />
    <Drawer.Screen name="Cart" component={Cart} />
    <Drawer.Screen name="EditShippingAddress" component={EditShippingAddress} />
  </Drawer.Navigator>
);
