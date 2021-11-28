import React from "react";
import {
  Dimensions,
  Image,
  ImageRequireSource,
  StyleSheet,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface SliderIamgeProps {
  index: number;
  scrollOffset: Animated.SharedValue<number>;
  picture: {
    src: ImageRequireSource;
    width: number;
    height: number;
  };
}

const { width } = Dimensions.get("window");

const BORDER_RADIUS = 75;

const SliderImage = ({ index, scrollOffset, picture }: SliderIamgeProps) => {
  const rSlideStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value / width,
      [index - 1, index, index + 1],
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.underlay, rSlideStyles]}>
      <Image
        source={picture.src}
        style={[
          {
            width: width - BORDER_RADIUS,
            height: ((width - BORDER_RADIUS) * picture.height) / picture.width,
            // borderBottomRightRadius: BORDER_RADIUS
          },
        ]}
      />
    </Animated.View>
  );
};

export default SliderImage;

const styles = StyleSheet.create({
  underlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottomRightRadius: BORDER_RADIUS,
    overflow: "hidden",
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderBottomRightRadius: BORDER_RADIUS,
  },
});
