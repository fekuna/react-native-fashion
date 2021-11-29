import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "../components/Navigation";
import Onboarding from "./Onboarding";
import Welcome from "./Welcome";
import { Login } from "./Login";

export { default as OnBoarding } from "./Onboarding";
export { default as Welcome } from "./Welcome";

const AuthenticationStack = createStackNavigator<Routes>();
export const AuthenticationNavigator = () => (
  <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
    <AuthenticationStack.Screen name="Welcome" component={Welcome} />
    <AuthenticationStack.Screen name="Login" component={Login} />
  </AuthenticationStack.Navigator>
);
