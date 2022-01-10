import React, { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import { Box, Text } from "../../components";
import { API_URL } from "../../utils/api";

const { width, height } = Dimensions.get("window");

const Slider = ({ images }) => {
  const [imgActive, setImgActive] = useState(0);

  const onSwipe = ({ nativeEvent }) => {
    const slide = Math.round(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== imgActive) {
      setImgActive(slide);
    }
  };

  console.log("Slider", images);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        onScroll={onSwipe}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        style={{
          width,
          height: height * 0.45,
        }}
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <Image
              key={index}
              resizeMode="contain"
              source={{
                uri: `${API_URL}/api/products/${image.imgPath}`,
              }}
              style={{
                width,
              }}
            />
          ))
        ) : (
          <Image
            resizeMode="contain"
            source={{
              uri: `${API_URL}/api/products/product-default.png`,
            }}
            style={{
              width,
            }}
          />
        )}
      </ScrollView>
      <View style={styles.wrapDot}>
        {images.map((img, index) => (
          <Text
            key={index}
            style={[
              { fontSize: 25 },
              imgActive === index ? styles.dotActive : styles.dot,
            ]}
          >
            ●
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapDot: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    margin: 3,
    color: "#888",
  },
  dotActive: {
    margin: 3,
    color: "#2CB9B0",
  },
});

export default Slider;
