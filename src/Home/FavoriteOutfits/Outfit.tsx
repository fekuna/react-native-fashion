import React, { useState } from "react";
import { Image, Pressable, View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { Box, Text, useTheme } from "../../components";
import RoundIcon from "../../components/RoundIcon";
import { addItemToCart } from "../../store/cart/cart.action";
import { API_URL } from "../../utils/api";

interface OutfitProps {
  outfit: any;
  width: number;
  removeHandler: any;
}

const Outfit = ({ outfit, width, removeHandler }: OutfitProps) => {
  const [selected, setSelected] = useState(false);
  const theme = useTheme();

  const dispatch = useDispatch();

  const outfitSelected = () => {
    setSelected((prev) => !prev);
    outfit.selected = !outfit.selected;
  };

  const productImage =
    outfit.product_images.length > 0
      ? `${API_URL}/api/products/${outfit.product_images[0].imgPath}`
      : `${API_URL}/api/products/product-default.png`;

  console.log("outfit", outfit);

  return (
    <Box
      borderRadius="s"
      marginBottom="m"
      // alignItems="flex-end"
      padding="m"
      style={{
        backgroundColor: theme.colors.background2,
        width,
        // height: width * outfit.aspectRatio,
        height: 225,
      }}
    >
      {selected && (
        <View
          style={{
            position: "absolute",
            right: 12,
            top: 10,
            zIndex: 99,
          }}
        >
          <RoundIcon
            name="x-circle"
            backgroundColor="danger"
            color="background"
            size={24}
          />
        </View>
      )}
      <Box width="100%" flex={0.7}>
        <Pressable onPress={outfitSelected} style={{ flex: 1 }}>
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
        </Pressable>
      </Box>
      <Box flex={0.25} marginBottom="l">
        <Text fontWeight="bold" fontSize={17} marginTop="m" numberOfLines={1}>
          {outfit.title}
        </Text>
        <Text>${outfit.price}</Text>
      </Box>
      <View
        style={{
          position: "absolute",
          right: 10,
          bottom: 5,
          zIndex: 99,
        }}
      >
        <Pressable
          onPress={() => {
            dispatch(
              addItemToCart({
                productId: outfit.id,
                quantity: 1,
                size: outfit.sizes?.length > 0 ? [outfit.sizes[0]] : undefined,
                image: outfit.product_images[0]?.imgPath,
              })
            );
          }}
        >
          <RoundIcon
            name="shopping-cart"
            backgroundColor="primary"
            color="background"
            size={26}
          />
        </Pressable>
      </View>

      <View
        style={{
          position: "absolute",
          left: 10,
          bottom: 5,
          zIndex: 99,
        }}
      >
        <Pressable onPress={() => removeHandler(outfit.id)}>
          <RoundIcon
            name="trash"
            backgroundColor="danger"
            color="background"
            size={26}
          />
        </Pressable>
      </View>
    </Box>
  );
};

export default Outfit;
