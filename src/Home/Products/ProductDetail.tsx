import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Image, ScrollView, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { Box, Header, Text, useTheme } from "../../components";
import CheckboxGroup from "../../components/CheckboxGroup";
import {
  HomeNavigationProps,
  HomeScreenProp,
} from "../../components/Navigation";
import { addItemToCart } from "../../store/cart/cart.action";
import Slider from "./Slider";

const ProductDetail = ({ route: { params } }) => {
  const theme = useTheme();
  const navigation = useNavigation<HomeScreenProp>();

  const initQuantity = params.stock > 0 ? 1 : 0;
  const [quantity, setQuantity] = useState(initQuantity);
  const [size, setSize] = useState([]);

  const dispatch = useDispatch();

  console.log("product detail", params.stock);

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
        right={{
          icon: "shopping-bag",
          onPress: () => navigation.navigate("Cart"),
        }}
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
        // marginBottom="s"
        borderRadius="l"
        marginTop="l"
        paddingTop="m"
        position="relative"
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

        <Box paddingHorizontal="m" marginTop="s">
          <Text variant="title3">Size</Text>
          <CheckboxGroup
            options={params.sizes}
            selectedValue={size}
            setSelectedValue={setSize}
            radio
          />
        </Box>

        <Box paddingHorizontal="m" marginTop="s" paddingBottom="xl">
          <Text variant="title3">About</Text>
          <ScrollView
            contentContainerStyle={{
              // marginTop: 10,
              paddingBottom: 130,
              // padding: 50,
              // overflow: "scroll",
            }}
          >
            <Text variant="body" marginBottom="xl">
              {params.description ? params.description : "tidak ada deskripsi"}
            </Text>
          </ScrollView>
        </Box>

        {/* Buy Container */}
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          // flex={1}
          backgroundColor="background2"
          marginTop="l"
          flexDirection="row"
          justifyContent="space-around"
          paddingBottom="s"
        >
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
            onPress={() => {
              // validate size selected if product has size
              let allowSubmit = true;
              if (params.sizes.length > 0 && size.length < 1) {
                console.log("mashook");
                allowSubmit = false;
                Alert.alert(null, "Please choose your size");
              }

              if (allowSubmit && quantity > 0) {
                dispatch(
                  addItemToCart({
                    productId: params.id,
                    quantity,
                    size,
                    image: params.product_images[0]?.imgPath,
                  })
                );
              }
            }}
          >
            <Box
              width={130}
              height={50}
              backgroundColor={quantity > 0 ? "green" : "grey"}
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
    </SafeAreaView>
  );
};

export default ProductDetail;
