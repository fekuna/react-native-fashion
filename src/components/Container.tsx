import React, { ReactNode } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Box } from ".";
import theme from "./Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const assets = [require("../../assets/images/patterns/1.png")];

const { width } = Dimensions.get("window");
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;

interface ContainerProps {
  children: ReactNode;
  footer: ReactNode;
}

const Container = ({ children, footer }: ContainerProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Box flex={1} backgroundColor="white">
      <StatusBar style="light" />
      <Box borderBottomLeftRadius="xl" overflow="hidden" height={height * 0.61}>
        <Image
          source={assets[0]}
          style={{
            width,
            height,
            borderBottomLeftRadius: theme.borderRadii.xl,
          }}
        />
      </Box>
      <Box flex={1} overflow="hidden" backgroundColor="secondary">
        <Image
          source={assets[0]}
          style={{
            ...StyleSheet.absoluteFillObject,
            height,
            width,
            top: -height * 0.61,
          }}
        />
        <Box
          borderRadius="xl"
          borderTopLeftRadius={0}
          backgroundColor="white"
          padding="xl"
          flex={1}
        >
          {children}
        </Box>
      </Box>
      <Box backgroundColor="secondary" paddingTop="m">
        {footer}
        <Box height={insets.bottom} />
      </Box>
    </Box>
  );
};

export default Container;

const styles = StyleSheet.create({});
