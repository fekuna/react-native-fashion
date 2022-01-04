import React from "react";

import { Box, Text, useTheme } from "../../components";

import SwipeableRow from "./SwipeableRow";

interface ItemProps {
  onDelete: () => void;
  item: any;
}

const Item = ({ onDelete, item }: ItemProps) => {
  const theme = useTheme();
  const height = 120 + theme.spacing.m * 2;
  return (
    <SwipeableRow onDelete={onDelete} height={height} item={item}>
      <Box padding="m" flexDirection="row">
        <Box
          width={120}
          height={120}
          borderRadius="m"
          style={{ backgroundColor: "#BFEAF5" }}
        />
        <Box padding="m" flex={1} justifyContent="center">
          {/* <Text variant="header">Size M, L</Text> */}
          <Text variant="title3" marginBottom="s">
            {item.product.title}
          </Text>
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
