import React from "react";
import { Image } from "react-native";

import { Box, Text, useTheme } from "../../components";
import { API_URL } from "../../utils/api";

import SwipeableRow from "./SwipeableRow";

interface ItemProps {
  onDelete: () => void;
  item: any;
}

const Item = ({ onDelete, item }: ItemProps) => {
  console.log("item cartItem", item);
  const theme = useTheme();
  const height = 120 + theme.spacing.m * 2;
  return (
    <SwipeableRow onDelete={onDelete} height={height} item={item}>
      <Box padding="m" flexDirection="row">
        <Box
          width={120}
          height={120}
          borderRadius="m"
          // style={{ backgroundColor: "#BFEAF5" }}
        >
          {item.image ? (
            <Image
              resizeMode="contain"
              source={{
                uri: `${API_URL}/api/products/${item.image}`,
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          ) : (
            <Image
              resizeMode="contain"
              source={{
                uri: `${API_URL}/api/products/product-default.png`,
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          )}
        </Box>
        <Box padding="m" flex={1} justifyContent="center">
          {/* <Text variant="header">Size M, L</Text> */}
          <Text variant="title3" marginBottom="s">
            {item.product.title}
          </Text>
          {item.size ? (
            <Text variant="title3" marginBottom="s">
              size: {item.size.toUpperCase()}
            </Text>
          ) : null}
          <Text variant="title3" color="primary">
            ${item.product.price}
          </Text>
        </Box>
        <Box justifyContent="center">
          <Box
            backgroundColor="secondary"
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 24,
              height: 24,
              borderRadius: 12,
            }}
          >
            <Text variant="header" color="background">
              x{item.quantity}
            </Text>
          </Box>
        </Box>
      </Box>
    </SwipeableRow>
  );
};

export default Item;
