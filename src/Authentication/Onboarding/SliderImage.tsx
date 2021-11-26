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
      <Image source={picture.src} style={styles.picture} />
    </Animated.View>
  );
};

export default SliderImage;

const styles = StyleSheet.create({
  underlay: {},
  picture: {},
});
