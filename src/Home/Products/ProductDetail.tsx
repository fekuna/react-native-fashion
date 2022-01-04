import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { Box, Header, Text, useTheme } from "../../components";
import {
  HomeNavigationProps,
  HomeScreenProp,
} from "../../components/Navigation";
import { addItemToCart } from "../../store/cart/cart.action";
import product from "../../store/product";
import { API_URL } from "../../utils/api";
import Slider from "./Slider";

const ProductDetail = ({ route: { params } }) => {
  const theme = useTheme();
  const navigation = useNavigation<HomeScreenProp>();
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Header
        title={params.title}
        left={{
          icon: "arrow-left",
          onPress: () => navigation.goBack(),
        }}
        right={{ icon: "shopping-bag", onPress: () => true }}
        dark={false}
        disableMarginTop
      />

      <Box
        flex={0.45}
        marginTop="l"
        // justifyContent="center"
        // alignItems="center"
      >
        <Slider images={params.product_images} />
      </Box>

      <Box
        flex={0.55}
        backgroundColor="background2"
        // marginHorizontal="s"
        marginBottom="s"
        borderRadius="l"
        marginTop="l"
        paddingTop="m"
      >
        <Box
          marginLeft="l"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text variant="title2">{params.title}</Text>
          <Box
            backgroundColor="green"
            width={80}
            height={40}
            justifyContent="center"
            borderTopLeftRadius="l"
            borderBottomLeftRadius="l"
          >
            <Text variant="title3" textAlign="center" color="white">
              ${params.price}
            </Text>
          </Box>
        </Box>

        <Box paddingHorizontal="m" marginTop="m">
          <Text variant="title3">About</Text>
          <ScrollView>
            <Text variant="body">
              {params.description ? params.description : "tidak ada deskripsi"}
            </Text>
          </ScrollView>

          <Box marginTop="l" flexDirection="row" justifyContent="space-between">
            <Box flexDirection="row" alignItems="center">
              <TouchableWithoutFeedback
                onPress={() => {
                  if (quantity > 1) {
                    setQuantity((prevState) => prevState - 1);
                  }
                }}
              >
                <Box
                  borderColor="grey"
                  borderWidth={1}
                  borderRadius="s"
                  justifyContent="center"
                  alignItems="center"
                  width={60}
                  height={40}
                  backgroundColor={quantity > 1 ? "danger" : "grey"}
                >
                  <Text fontWeight="bold" fontSize={28} color="white">
                    -
                  </Text>
                </Box>
              </TouchableWithoutFeedback>

              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                  fontWeight: "bold",
                }}
              >
                {quantity}
              </Text>

              <TouchableWithoutFeedback
                onPress={() => {
                  if (params.stock > quantity) {
                    setQuantity((prevState) => prevState + 1);
                  }
                }}
              >
                <Box
                  borderColor="grey"
                  borderWidth={1}
                  borderRadius="s"
                  justifyContent="center"
                  alignItems="center"
                  width={60}
                  height={40}
                  backgroundColor={params.stock > quantity ? "green" : "grey"}
                >
                  <Text fontWeight="bold" fontSize={28} color="white">
                    +
                  </Text>
                </Box>
              </TouchableWithoutFeedback>
            </Box>

            <TouchableWithoutFeedback
              onPress={() =>
                dispatch(addItemToCart({ productId: params.id, quantity }))
              }
            >
              <Box
                width={130}
                height={50}
                backgroundColor="green"
                justifyContent="center"
                alignItems="center"
                borderRadius="l"
              >
                <Text variant="title2" color="white">
                  Buy
                </Text>
              </Box>
            </TouchableWithoutFeedback>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default ProductDetail;
