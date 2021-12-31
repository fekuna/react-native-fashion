import { useNavigation } from "@react-navigation/native";
import React from "react";
import { MaterialIcons as Icon } from "@expo/vector-icons";

import { Box, Text, useTheme } from "../../components";
import { HomeScreenProp } from "../../components/Navigation";
import { Dimensions, Image, Pressable, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { API_URL } from "../../utils/api";

const { width } = Dimensions.get("window");

const Card = ({ item }) => {
  const navigation = useNavigation<HomeScreenProp>();
  const theme = useTheme();

  const productImage =
    item.product_images.length > 0
      ? `${API_URL}/api/products/${item.product_images[0].imgPath}`
      : `${API_URL}/api/products/product-default.png`;

  return (
    <Box style={{ marginBottom: 15 }}>
      <Pressable
        style={{
          position: "absolute",
          width: 100,
          right: 10,
          top: 5,
          zIndex: 100,
          alignItems: "flex-end",
        }}
        onPress={() => console.log("aoskd")}
      >
        <Box
          width={30}
          height={30}
          borderRadius="l"
          justifyContent="center"
          alignItems="center"
          style={[
            {
              // backgroundColor: plant.like
              //   ? "rgba(245, 42, 42,0.2)"
              //   : "rgba(0,0,0,0.2) ",
              backgroundColor: "rgba(0,0,0,0.2)",
            },
          ]}
        >
          <Icon
            name="favorite"
            size={18}
            // color={plant.like ? theme.colors.love : theme.colors.body}
            color={theme.colors.body}
          />
        </Box>
      </Pressable>
      <TouchableOpacity
        onPress={() => {
          // console.log(plant);
          navigation.navigate("ProductDetail", { ...item });
        }}
      >
        <Box
          height={225}
          width={width / 2 - 30}
          backgroundColor="background2"
          borderRadius="m"
        >
          <Box flex={2} alignItems="center">
            <Image
              source={{
                uri: productImage,
              }}
              // style={{ flex: 1, resizeMode: "contain" }}
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                // borderTopLeftRadius: 20,
                // borderTopRightRadius: ,
                resizeMode: "contain",
              }}
            />
          </Box>

          <Box flex={1} marginHorizontal="s">
            <Text fontWeight="bold" fontSize={17} marginTop="m">
              {/* {plant.name} */}
              {item.title}
            </Text>
            <Text variant="body">${item.price}</Text>
          </Box>
        </Box>
      </TouchableOpacity>
      <Box
        style={{
          position: "absolute",
          bottom: 5,
          right: 10,
        }}
      >
        <Pressable
          style={{
            height: 25,
            width: 50,
            backgroundColor: theme.colors.green,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 5,
            zIndex: 100,
          }}
          onPress={() => console.log("add to cart")}
        >
          <Text fontSize={18} color="background" fontWeight="bold">
            +
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
};

export default Card;
