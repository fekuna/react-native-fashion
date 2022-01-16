import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { MaterialIcons as Icon } from "@expo/vector-icons";

import { Box, Text, useTheme } from "../../components";
import { HomeScreenProp } from "../../components/Navigation";
import { Dimensions, Image, Pressable, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { API_URL } from "../../utils/api";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";

import api from "../../utils/api";

const { width } = Dimensions.get("window");

const Card = ({ item }) => {
  // console.log("Card", item);
  const navigation = useNavigation<HomeScreenProp>();
  const theme = useTheme();

  const user = useSelector((state: RootStateOrAny) => state.auth.user);

  // console.log(user);

  const [isFavorite, setIsFavorite] = useState(
    item.user_favorites.some((favorite) => favorite.id === user.sub)
  );

  const dispatch = useDispatch();

  const favoriteHandler = async (productId) => {
    let response;
    try {
      response = await api.post(`/products/favorite/${productId}`);
    } catch (err) {
      console.log("Error add to favorite", err);
    }

    if (response?.status === 201) {
      console.log("add to favorite success");
      setIsFavorite((favorite) => !favorite);
    }
  };

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
        onPress={() => favoriteHandler(item.id)}
      >
        <Box
          width={30}
          height={30}
          borderRadius="l"
          justifyContent="center"
          alignItems="center"
          style={[
            {
              backgroundColor: isFavorite
                ? "rgba(255,0,88, 0.2)"
                : "rgba(0,0,0,0.2)",
            },
          ]}
        >
          <Icon
            name="favorite"
            size={18}
            // color={plant.like ? theme.colors.love : theme.colors.body}
            color={isFavorite ? theme.colors.danger : theme.colors.body}
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
                // borderTopLeftRadius: 25,
                // borderTopRightRadius: 25,
                resizeMode: "contain",
              }}
            />
          </Box>

          <Box flex={1} marginHorizontal="s">
            <Text
              numberOfLines={1}
              fontWeight="bold"
              fontSize={17}
              marginTop="m"
            >
              {/* {plant.name} */}
              {item.title}
            </Text>
            <Text variant="body">${item.price}</Text>
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default Card;
