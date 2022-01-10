import React from "react";
import { StyleSheet } from "react-native";
import { Text, useTheme } from "./Theme";
import { RectButton, RectButtonProperties } from "react-native-gesture-handler";
import { SubmitHandler } from "react-hook-form";

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    // height: 5,
    // width: 245,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface OptionButtonProps {
  variant: "default" | "primary";
  label?: string;
  onPress: any;
  style?: RectButtonProperties["style"];
}

const OptionButton = ({
  variant,
  label,
  onPress,
  style,
}: OptionButtonProps) => {
  const { colors } = useTheme();
  const backgroundColor = variant === "primary" ? colors.primary : colors.info;
  const color = variant === "primary" ? colors.background : colors.background;

  return (
    <RectButton
      style={[styles.container, style, { backgroundColor }]}
      {...{ onPress }}
    >
      <Text
        variant="button"
        style={{ color, textTransform: "uppercase", fontSize: 13 }}
      >
        {label}
      </Text>
    </RectButton>
  );
};

OptionButton.defaultProps = { variant: "default" };

export default OptionButton;
