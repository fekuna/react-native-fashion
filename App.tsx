import * as React from "react";
import { LogBox } from "react-native";
import * as SecureStore from "expo-secure-store";
import { ThemeProvider } from "./src/components/Theme";

import { LoadAssets } from "./src/components";
import { AuthenticationNavigator } from "./src/Authentication";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { AppRoutes } from "./src/components/Navigation";
import { HomeNavigator } from "./src/Home";
import {
  Provider,
  RootStateOrAny,
  useDispatch,
  useSelector,
} from "react-redux";
import store from "./src/store";
import { logout, setCurrentUser } from "./src/store/user/user.action";
import jwtDecode from "jwt-decode";

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

const RootNavigation = () => {
  const isAuthenticated = useSelector(
    (state: RootStateOrAny) => state.auth?.isAuthenticated
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    const checkLoggedIn = async () => {
      // await SecureStore.deleteItemAsync("accessToken");
      // await SecureStore.deleteItemAsync("refreshToken");
      const accessToken = await SecureStore.getItemAsync("accessToken");
      if (accessToken) {
        const tokenDecoded = await jwtDecode(accessToken);
        dispatch(setCurrentUser(tokenDecoded));
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <AppStack.Screen
          name="Authentication"
          component={AuthenticationNavigator}
        />
      ) : (
        <AppStack.Screen name="Home" component={HomeNavigator} />
      )}
    </AppStack.Navigator>
  );
};

export default function App() {
  // const accessToken = await SecureStore.getItemAsync("accessToken");

  // console.log("RootNavigation -  isAuth", accessToken);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <LoadAssets {...{ fonts }}>
          <SafeAreaProvider>
            <RootNavigation />
          </SafeAreaProvider>
        </LoadAssets>
      </ThemeProvider>
    </Provider>
  );
}
