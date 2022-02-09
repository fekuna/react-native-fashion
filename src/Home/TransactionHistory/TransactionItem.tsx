import React, { useEffect } from "react";
import { View, Image, Alert } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { Box, Text } from "../../components";
import { cancelOrderItemStatus } from "../../store/history/history.action";
import { API_URL } from "../../utils/api";

const TransactionItem = ({ item }) => {
  console.log("item", item);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("TransactionItem");
  }, [item.status?.isAvailable]);

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
          <Text
            variant="title3"
            color={item.status?.isAvailable ? "primary" : "danger"}
            textTransform="capitalize"
          >
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
      {item.status.isAvailable ? (
        <Box position="absolute" bottom={12} right={30}>
          <TouchableWithoutFeedback
            onPress={() => {
              Alert.alert("Warning", "Are you sure to cancel this order?", [
                { text: "cancel", style: "cancel" },
                {
                  text: "yes",
                  onPress: () => {
                    dispatch(cancelOrderItemStatus(item.id));
                  },
                },
              ]);
            }}
          >
            <Text color="danger" fontSize={18} fontWeight="bold">
              Cancel
            </Text>
          </TouchableWithoutFeedback>
        </Box>
      ) : null}
    </Box>
  );
};

export default TransactionItem;
