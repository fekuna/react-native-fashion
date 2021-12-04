import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthRoutes } from "../components/Navigation";
import Onboarding from "./Onboarding";
import Welcome from "./Welcome";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import PasswordChanged from "./PasswordChanged";

export { default as OnBoarding } from "./Onboarding";
export { default as Welcome } from "./Welcome";

const AuthenticationStack = createStackNavigator<AuthRoutes>();
export const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
      <AuthenticationStack.Screen name="Welcome" component={Welcome} />
      <AuthenticationStack.Screen name="Login" component={Login} />
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <AuthenticationStack.Screen
        name="PasswordChanged"
        component={PasswordChanged}
      />
    </AuthenticationStack.Navigator>
  );
};
