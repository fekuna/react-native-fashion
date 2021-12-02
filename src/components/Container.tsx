import React, { ReactNode } from "react";
import { Dimensions, Image, Platform, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Box, useTheme } from ".";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";

export const assets = [
  require("../../assets/images/patterns/1.png"),
  require("../../assets/images/patterns/2.png"),
  require("../../assets/images/patterns/3.png"),
] as const;

const { width, height: wHeight } = Dimensions.get("window");
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;

interface ContainerProps {
  children: ReactNode;
  footer: ReactNode;
  pattern: 0 | 1 | 2;
}

const Container = ({ children, footer, pattern }: ContainerProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const asset = assets[pattern];

  return (
    <KeyboardAwareScrollView>
      <Box
        flex={1}
        height={
          wHeight + (Platform.OS === "android" ? Constants.statusBarHeight : 0)
        }
        backgroundColor="secondary"
      >
        <Box backgroundColor="background">
          <Box
            borderBottomLeftRadius="xl"
            overflow="hidden"
            height={height * 0.61}
          >
            <Image
              source={asset}
              style={{
                width,
                height,
                borderBottomLeftRadius: theme.borderRadii.xl,
              }}
            />
          </Box>
        </Box>
        <Box flex={1} overflow="hidden">
          <Image
            source={asset}
            style={{
              ...StyleSheet.absoluteFillObject,
              height,
              width,
              top: -height * 0.61,
            }}
          />
          <Box
            borderRadius="xl"
            borderTopLeftRadius="zero"
            backgroundColor="background"
            padding="xl"
            justifyContent="center"
            flex={1}
          >
            {children}
          </Box>
        </Box>
        <Box backgroundColor="secondary" paddingTop="m">
          {footer}
          <Box height={Math.max(insets.bottom, 16)} />
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default Container;

const styles = StyleSheet.create({});
