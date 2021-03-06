import React from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box, Text } from "./Theme";
import RoundIconButton from "./RoundIconButton";
import { View } from "react-native";

interface HeaderProps {
  left: {
    icon: keyof typeof Icon.glyphMap;
    onPress: () => void;
  };
  title: string;
  right?: {
    icon: keyof typeof Icon.glyphMap;
    onPress: () => void;
  };
  dark: boolean;
  disableMarginTop?: boolean;
}

const Header = ({
  left,
  title,
  right,
  dark,
  disableMarginTop,
}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const color = dark ? "background" : "secondary";

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="m"
      style={{ marginTop: !!disableMarginTop ? 0 : insets.top }}
    >
      <RoundIconButton
        name={left.icon}
        iconRatio={0.4}
        onPress={left.onPress}
        size={44}
        align="center"
        {...{ color }}
      />
      <Text variant="header" {...{ color }}>
        {title.toUpperCase()}
      </Text>
      {right ? (
        <RoundIconButton
          name={right.icon}
          iconRatio={0.4}
          onPress={right.onPress}
          size={44}
          align="center"
          {...{ color }}
        />
      ) : (
        <View style={{ width: 44 }} />
      )}
    </Box>
  );
};

export default Header;
