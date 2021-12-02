import React from "react";

import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { TextInputProps, TextInput, StyleSheet } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { Box, Text, useTheme } from "..";
import RoundIcon from "../RoundIcon";

interface RNTextInputProps extends TextInputProps {
  icon: keyof typeof Icon.glyphMap;
  error?: FieldError;
  touched?: boolean;
}

const RNTextInput = forwardRef<TextInput, RNTextInputProps>(
  ({ icon, error, touched, ...props }, ref) => {
    const theme = useTheme();
    const SIZE = theme.borderRadii.m * 2;
    const color = !touched ? "body" : error ? "danger" : "primary";
    const themeColor = theme.colors[color];

    return (
      <Box
        flexDirection="row"
        alignItems="center"
        height={48}
        borderRadius="s"
        borderColor={color}
        borderWidth={StyleSheet.hairlineWidth}
      >
        <Box padding="s">
          <Icon name={icon} size={16} color={themeColor} />
        </Box>
        <Box flex={1}>
          <TextInput
            underlineColorAndroid="transparent"
            placeholderTextColor={themeColor}
            {...{ ref }}
            {...props}
          />
        </Box>
        {touched && (
          <Box marginRight="s">
            <RoundIcon
              name={!error ? "check" : "x"}
              size={SIZE}
              backgroundColor={!error ? "primary" : "danger"}
              color="background"
            />
          </Box>
        )}
      </Box>
    );
  }
);

export default RNTextInput;
