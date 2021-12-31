import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode, useCallback } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import { Text, RoundIconButton, useTheme } from "../../components";
import { aspectRatio, Box } from "../../components/Theme";

interface SwipeableRowProps {
  children: ReactNode;
  onDelete: () => void;
  height: number;
}

const { width } = Dimensions.get("window");
const finalDestination = width;
const editWidth = 85 * aspectRatio;
const snapPoints = [-editWidth, 0, finalDestination];

const SwipeableRow = ({
  children,
  onDelete,
  height: defaultHeight,
}: SwipeableRowProps) => {
  const theme = useTheme();
  const translateX = useSharedValue(0);
  const height = useSharedValue(defaultHeight);

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
    onActive: ({ translationX }, ctx) => {
      translateX.value = ctx.x + translationX;
    },
    onEnd: ({ velocityX }) => {
      // console.log("velocityX", velocityX);
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(dest, {}, () => {
        if (dest === finalDestination) {
          height.value = withTiming(0, { duration: 250 }, () => deleteItem());
        }
      });
      // translateX.value = withSpring(dest, {}, () => {
      //   console.log({ dest, finalDestination });
      //   console.log("hehe");
      // });

      // translateX.value = withSpring(dest);

      // if (dest === finalDestination) {
      //   const value = withTiming(0, { duration: 250 }, () => deleteItem());
      //   console.log({ value: value.toValue });
      // }
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
            onPress={() => null}
            name="plus"
            size={24}
            color="background"
            backgroundColor="primary"
          />
          <RoundIconButton
            onPress={() => null}
            name="minus"
            size={24}
            color="background"
            backgroundColor="danger"
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
