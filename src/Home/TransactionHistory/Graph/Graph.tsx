import React from "react";
import { Dimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Theme } from "../../../components/Theme";
import { Box, useTheme } from "../../../components";
import { useFocusEffect } from "@react-navigation/native";
import Underlay, { MARGIN } from "./Underly";
import moment from "moment";
import { lerp } from "./Scale";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

export interface DataPoint {
  id: number;
  createdAt: number;
  totalPrice: number;
  color?: keyof Theme["colors"];
}

interface GraphProps {
  data: DataPoint[];
  startDate: number;
  numberOfMonths: number;
  transition: any;
  theme: any;
}

const { width: wWidth } = Dimensions.get("window");
const aspectRatio = 195 / 305;
const AnimatedBox = Animated.createAnimatedComponent(Box);

const colors: (keyof Theme["colors"])[] = [
  "primary",
  "secondary",
  "edit",
  "graph1",
  "graph2",
  "drawer3",
  "love",
  "green",
  "primary",
  "love",
  "graph2",
  "drawer3",
];

const Graph = ({
  data,
  startDate,
  numberOfMonths,
  transition,
  theme,
}: GraphProps) => {
  // const theme = useTheme();
  // const transition = useSharedValue(0);

  // useFocusEffect(() => {
  //   transition.value = withTiming(1, { duration: 650 });
  //   return () => (transition.value = 0);
  // });

  const canvasWidth = wWidth - theme.spacing.m * 2;
  const canvasHeight = canvasWidth * aspectRatio;
  const width = canvasWidth - theme.spacing[MARGIN];
  const height = canvasHeight - theme.spacing[MARGIN];

  const step = width / numberOfMonths;
  const values = data.map((p) => p.totalPrice);
  const minY = Math.min(...values);
  const maxY = Math.max(...values);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  // console.log("Graph Data", data);

  return (
    <Box marginTop="l" paddingBottom={MARGIN} paddingLeft={MARGIN}>
      <Underlay
        minY={minY}
        maxY={maxY}
        startDate={startDate}
        numberOfMonths={numberOfMonths}
        step={step}
      />
      <View style={{ width, height, overflow: "hidden" }}>
        {data.map((point) => {
          const i = Math.round(
            moment.duration(moment(point.createdAt).diff(startDate)).asMonths()
          );
          const totalHeight = lerp(0, height, point.totalPrice / maxY);
          const style = useAnimatedStyle(() => {
            const currentHeight = totalHeight * transition.value;
            const translateY = (totalHeight - currentHeight) / 2;
            return {
              transform: [{ translateY }, { scaleY: transition.value }],
            };
          });

          return (
            <AnimatedBox
              key={point.id}
              position="absolute"
              left={i * step}
              bottom={0}
              width={step}
              height={totalHeight}
              style={style}
            >
              <Box
                // backgroundColor={
                //   theme.colors[colors[getRandomInt(1, 12)] || "primary"]
                // }
                // backgroundColor="primary"
                backgroundColor={`${colors[getRandomInt(1, 12)]}`}
                opacity={0.1}
                position="absolute"
                top={0}
                bottom={0}
                left={theme.spacing.m}
                right={theme.spacing.m}
                borderTopLeftRadius="m"
                borderTopRightRadius="m"
              />
              <Box
                // backgroundColor={
                //   theme.colors[colors[getRandomInt(1, 12)] || "primary"]
                // }
                // backgroundColor="primary"
                backgroundColor={`${colors[getRandomInt(1, 12)]}`}
                position="absolute"
                top={0}
                height={32}
                left={theme.spacing.m}
                right={theme.spacing.m}
                borderRadius="m"
              />
            </AnimatedBox>
          );
        })}
      </View>
    </Box>
  );
};

export default Graph;
