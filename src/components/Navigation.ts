import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface AuthNavigationProps<RouteName extends keyof AuthRoutes> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthRoutes, RouteName>,
    DrawerNavigationProp<AppRoutes, "Home">
  >;
  route: RouteProp<AuthRoutes, RouteName>;
}

export interface HomeNavigationProps<RouteName extends keyof HomeRoutes> {
  navigation: DrawerNavigationProp<HomeRoutes, RouteName>;
  route: RouteProp<HomeRoutes, RouteName>;
  dispatch: any;
}

export type AppRoutes = {
  Authentication: undefined;
  Home: undefined;
};

export type AuthRoutes = {
  Onboarding: undefined;
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  PasswordChanged: undefined;
};

export type HomeRoutes = {
  OutfitIdeas: undefined;
  FavoriteOutfits: undefined;
  TransactionHistory: undefined;
  EditProfile: undefined;
  Settings: undefined;
  Cart: undefined;
};

export type HomeScreenProp = DrawerNavigationProp<HomeRoutes, keyof HomeRoutes>;
