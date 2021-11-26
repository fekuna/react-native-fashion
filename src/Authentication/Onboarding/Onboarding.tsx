import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

import Slide, { SLIDE_HEIGHT } from "./Slide";
import Subslide from "./Subslide";

const BORDER_RADIUS = 75;
const { width } = Dimensions.get("window");

const slides = [
  {
    title: "Relaxed",
    color: "#BFEAF5",
    subtitle: "Find Your Outfits",
    description:
      "Confused about your outfits? Don't worry find the best oufit here",
    picture: require("../../../assets/images/1.png"),
  },
  {
    title: "Playfull",
    color: "#BEECC4",
    subtitle: "Hear it First, Wear it First",
    description:
      "Hating the clothes in your wardrobe? Explore hundreds of ourfit ideas",
    picture: require("../../../assets/images/2.png"),
  },
  {
    title: "Excentric",
    color: "#FFE4D9",
    subtitle: "Your Style, Your Way",
    description:
      "Create your individuals & unique style and look amazing everyday",
    picture: require("../../../assets/images/3.png"),
  },
  {
    title: "Funky",
    color: "#FFDDDD",
    subtitle: "Look Good, Feel Good",
    description:
      "Discover the best trends in fashion and explore your personality",
    picture: require("../../../assets/images/4.png"),
  },
];

const Onboarding = () => {
  const scroll = useRef<Animated.ScrollView>(null);
  const x = useSharedValue(0);

  const rSlideStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      slides.map((_, i) => i * width),
      slides.map((slide) => slide.color)
    );

    return {
      backgroundColor,
    };
  });

  const rSlideStyles2 = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      slides.map((_, i) => i * width),
      slides.map((slide) => slide.color)
    );

    return {
      backgroundColor,
    };
  });

  const scrollHandler = useAnimatedScrollHandler((event) => {
    x.value = event.contentOffset.x;
  });

  const rSubslideStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -x.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, rSlideStyles]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          // {...{ onScroll }}
        >
          {slides.map(({ title }, index) => (
            <Slide key={index} right={!!(index % 2)} {...{ title }} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={[{ ...StyleSheet.absoluteFillObject }, rSlideStyles2]}
        />
        <Animated.View
          style={[
            styles.footerContent,
            {
              width: width * slides.length,
              flex: 1,
            },
            rSubslideStyles,
          ]}
        >
          {slides.map(({ subtitle, description }, index) => (
            <Subslide
              key={index}
              onPress={() => {
                if (scroll.current) {
                  console.log({ scrollTo: width * index });
                  scroll.current.getNode().scrollTo({
                    x: width * (index + 1),
                    animated: true,
                  });
                }
              }}
              last={index === slides.length - 1}
              {...{ subtitle, description }}
            />
          ))}
        </Animated.View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flexDirection: "row",
    backgroundColor: "white",
    borderTopLeftRadius: BORDER_RADIUS,
  },
});
