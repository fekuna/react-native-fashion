import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode, useCallback } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";
import { useDispatch } from "react-redux";

import { Text, RoundIconButton, useTheme } from "../../components";
import { aspectRatio, Box } from "../../components/Theme";
import { getCartItems, updateCartItem } from "../../store/cart/cart.action";

interface SwipeableRowProps {
  children: ReactNode;
  onDelete: () => void;
  height: number;
  item: any;
}

const { width } = Dimensions.get("window");
const finalDestination = width;
const editWidth = 85 * aspectRatio;
const snapPoints = [-editWidth, 0, finalDestination];

const SwipeableRow = ({
  children,
  onDelete,
  height: defaultHeight,
  item,
}: SwipeableRowProps) => {
  const theme = useTheme();
  const translateX = useSharedValue(0);
  const height = useSharedValue(defaultHeight);

  const dispatch = useDispatch();

  const deleteItem = useCallback(() => {
    console.log("inside deleteItem");
    onDelete();
  }, [onDelete]);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }) => {
      translateX.value = translationX;
    },
    onEnd: ({ velocityX }) => {
      // console.log("velocityX", velocityX);
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(dest, {}, () => {
        if (dest === finalDestination) {
          height.value = withTiming(0, { duration: 250 }, () =>
            runOnJS(onDelete)()
          );
        }
      });
    },
  });

  const style = useAnimatedStyle(() => ({
    height: height.value,
    backgroundColor: theme.colors.background,
    transform: [{ translateX: translateX.value }],
  }));

  const deleteStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > 0 ? 1 : 0,
  }));
  const editStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < 0 ? 1 : 0,
  }));
  return (
    <View>
      <Animated.View style={[StyleSheet.absoluteFill, deleteStyle]}>
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={[theme.colors.danger, theme.colors.background]}
          start={[0, 0.5]}
          end={[1, 0.5]}
        />
        <Box
          justifyContent="space-evenly"
          alignItems="center"
          width={editWidth}
          flex={1}
        >
          <Text color="background" variant="header">
            Delete
          </Text>
        </Box>
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, editStyle]}>
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={[theme.colors.edit, theme.colors.background]}
          start={[1, 0.5]}
          end={[0.7, 0.5]}
        />
        <Box
          justifyContent="space-evenly"
          alignSelf="flex-end"
          alignItems="center"
          width={editWidth}
          flex={1}
        >
          <RoundIconButton
            onPress={async () => {
              console.log("Plus");
              if (item.quantity < item.product.stock) {
                await dispatch(updateCartItem(item.id, item.quantity + 1));
                await dispatch(getCartItems());
              }
            }}
            name="plus"
            size={24}
            color="background"
            // backgroundColor="primary"
            backgroundColor={
              item.quantity < item.product.stock ? "primary" : "grey"
            }
          />
          <RoundIconButton
            onPress={async () => {
              console.log("Minus");
              if (item.quantity > 1) {
                await dispatch(updateCartItem(item.id, item.quantity - 1));
                await dispatch(getCartItems());
              }
            }}
            name="minus"
            size={24}
            color="background"
            // backgroundColor="danger"
            backgroundColor={item.quantity > 1 ? "danger" : "grey"}
          />
        </Box>
      </Animated.View>
      <PanGestureHandler onGestureEvent={onGestureEvent} activeOffsetX={10}>
        <Animated.View style={style}>{children}</Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default SwipeableRow;
