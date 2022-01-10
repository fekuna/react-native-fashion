import React from "react";
import { View, Image } from "react-native";
import { Box, Text } from "../../components";
import { API_URL } from "../../utils/api";

const TransactionItem = ({ item }) => {
  return (
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
          {item.product_title}
        </Text>
        <Box flexDirection="row">
          {item.size ? (
            <Text variant="body" marginBottom="s" marginRight="s">
              size: {item.size.toUpperCase()}
            </Text>
          ) : null}
          <Text variant="body"> - </Text>
          <Text variant="title3" color="primary" textTransform="capitalize">
            {item.status.name}
          </Text>
        </Box>
        <Text variant="title3" color="primary">
          ${item.price}
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
  );
};

export default TransactionItem;
