import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { AuthNavigationProps } from "../../components/Navigation";

import { Theme, makeStyles } from "../../components/Theme";

import Slide, { SLIDE_HEIGHT } from "./Slide";
import SliderImage from "./SliderImage";
import Subslide from "./Subslide";
import Dot from "./Dot";

const { width } = Dimensions.get("window");
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomEndRadius: theme.borderRadii.xl,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: theme.borderRadii.xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const slides = [
  {
    title: "Relaxed",
    color: "#BFEAF5",
    subtitle: "Find Your Outfits",
    description:
      "Confused about your outfits? Don't worry find the best oufit here",
    picture: {
      src: require("../../../assets/images/1.png"),
      width: 2513,
      height: 3583,
    },
  },
  {
    title: "Playfull",
    color: "#BEECC4",
    subtitle: "Hear it First, Wear it First",
    description:
      "Hating the clothes in your wardrobe? Explore hundreds of ourfit ideas",
    picture: {
      src: require("../../../assets/images/2.png"),
      width: 2513,
      height: 3583,
    },
  },
  {
    title: "Excentric",
    color: "#FFE4D9",
    subtitle: "Your Style, Your Way",
    description:
      "Create your individuals & unique style and look amazing everyday",
    picture: {
      src: require("../../../assets/images/3.png"),
      width: 2513,
      height: 3583,
    },
  },
  {
    title: "Funky",
    color: "#FFDDDD",
    subtitle: "Look Good, Feel Good",
    description:
      "Discover the best trends in fashion and explore your personality",
    picture: {
      src: require("../../../assets/images/4.png"),
      width: 2513,
      height: 3583,
    },
  },
];

const Onboarding = ({ navigation }: AuthNavigationProps<"Onboarding">) => {
  const styles = useStyles();
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
        {slides.map(({ picture }, index) => {
          return (
            <SliderImage
              key={index}
              index={index}
              scrollOffset={x}
              picture={picture}
            />
          );
        })}
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
        >
          {slides.map(({ title, picture }, index) => (
            <Slide
              key={index}
              right={!!(index % 2)}
              {...{ title, picture: picture.src }}
            />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={[{ ...StyleSheet.absoluteFillObject }, rSlideStyles2]}
        />
        <Animated.View style={[styles.footerContent]}>
          {/* Slide Indicators */}
          <Animated.View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot key={index} scrollOffset={x} index={index} />
            ))}
          </Animated.View>

          {/* Subslides */}
          <Animated.View
            style={[
              {
                flexDirection: "row",
                width: width * slides.length,
                flex: 1,
              },
              rSubslideStyles,
            ]}
          >
            {slides.map(({ subtitle, description }, index) => {
              const last = index === slides.length - 1;

              return (
                <Subslide
                  key={index}
                  onPress={() => {
                    if (last) {
                      navigation.navigate("Welcome");
                    } else {
                      scroll.current?.getNode().scrollTo({
                        x: width * (index + 1),
                        animated: true,
                      });
                    }
                  }}
                  last={index === slides.length - 1}
                  {...{ subtitle, description }}
                />
              );
            })}
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

export default Onboarding;
