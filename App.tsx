import * as React from "react";
import { LogBox } from "react-native";
import { ThemeProvider } from "./src/components/Theme";

import { LoadAssets } from "./src/components";
import { AuthenticationNavigator } from "./src/Authentication";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { AppRoutes } from "./src/components/Navigation";

// Ignore warning
LogBox.ignoreLogs([
  "ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.",
]);

const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
  "SFProDisplay-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
};

const AppStack = createStackNavigator<AppRoutes>();

export default function App() {
  return (
    <ThemeProvider>
      <LoadAssets {...{ fonts }}>
        <SafeAreaProvider>
          <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen
              name="Authentication"
              component={AuthenticationNavigator}
            />
          </AppStack.Navigator>
        </SafeAreaProvider>
      </LoadAssets>
    </ThemeProvider>
  );
}
