import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { HomeRoutes, HomeScreenProp } from "../../components/Navigation";
import RoundIcon from "../../components/RoundIcon";
import { Theme, useTheme, Box, Text } from "../../components/Theme";
import { Feather as Icon } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

interface BaseDrawerItem {
  icon: keyof typeof Icon.glyphMap;
  label: string;
  color: keyof Theme["colors"];
}

interface ScreenDrawerItem extends BaseDrawerItem {
  screen: keyof HomeRoutes;
}

interface OnPressDrawerItem extends BaseDrawerItem {
  onPress: (navigation: ReturnType<typeof useNavigation>) => void;
}

export type DrawerItemProps = ScreenDrawerItem | OnPressDrawerItem;

const DrawerItem = ({ icon, label, color, ...props }: any) => {
  const theme = useTheme();
  const navigation = useNavigation<HomeScreenProp>();
  const dispatch = useDispatch();

  return (
    <RectButton
      onPress={() =>
        "screen" in props
          ? navigation.navigate(props.screen)
          : props.onPress(navigation, dispatch)
      }
      style={{ borderRadius: theme.borderRadii.m }}
    >
      <Box flexDirection="row" alignItems="center" padding="m">
        <RoundIcon
          name={icon}
          backgroundColor={color}
          iconRatio={0.5}
          color="background"
          size={36}
        />
        <Text variant="button" color="secondary" marginLeft="m">
          {label}
        </Text>
      </Box>
    </RectButton>
  );
};

export default DrawerItem;
