import React, { FC, ReactNode } from "react";
import { Dimensions, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { clamp, snapPoint } from "react-native-redash";
import { RootStateOrAny, useSelector } from "react-redux";

import { Box, useTheme } from "../../components";

const { width, height: screenHeight } = Dimensions.get("window");
const { height: windowsHeight } = Dimensions.get("screen");

const softbarheight = windowsHeight - screenHeight;

const aspectRatio = width / 375;
const height = (682 - softbarheight) * aspectRatio;
const minHeight = 220 * aspectRatio;
const snapPoints = [-(height - minHeight), 0];

interface CartContainerProps {
  children: ReactNode;
  CheckoutComponent: FC<{ minHeight: number }>;
}

const CartContainer = ({ children, CheckoutComponent }: CartContainerProps) => {
  const theme = useTheme();
  const translateY = useSharedValue(0);
  const cartItems = useSelector((state: RootStateOrAny) => state.cart.items);

  // console.log("Cart Container", cartItems);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { y: number }
  >({
    onStart: (event, ctx) => {
      ctx.y = translateY.value;
    },
    onActive: ({ translationY }, ctx) => {
      translateY.value = clamp(
        ctx.y + translationY,
        snapPoints[0],
        snapPoints[1]
      );
    },
    onEnd: ({ velocityY }) => {
      const dest = snapPoint(translateY.value, velocityY, snapPoints);
      translateY.value = withSpring(dest);
    },
  });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  return (
    <Box flex={1}>
      <CheckoutComponent minHeight={minHeight} />
      <Animated.View
        style={[
          {
            overflow: "hidden",
            backgroundColor: "white",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height,
            borderBottomLeftRadius: theme.borderRadii.xl,
            borderBottomRightRadius: theme.borderRadii.xl,
          },
          style,
        ]}
      >
        {children}
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: theme.borderRadii.xl,
              justifyContent: "flex-end",
              alignItems: "center",
              // backgroundColor: "red",
            }}
          >
            <View
              style={{
                height: 5 * aspectRatio,
                backgroundColor: theme.colors.background2,
                width: 100 * aspectRatio,
                borderRadius: 2.5,
                marginBottom: theme.spacing.m,
              }}
            />
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </Box>
  );
};

export default CartContainer;
