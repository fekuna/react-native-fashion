import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { ScrollView } from "react-native-gesture-handler";

import { Header, Box, useTheme, Text } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { aspectRatio } from "../../components/Theme";

import CartContainer from "./CartContainer";
import Checkout from "./Checkout";
import Item from "./Item";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getCartItems, removeCartItem } from "../../store/cart/cart.action";
import { CommonActions, StackActions } from "@react-navigation/routers";
import { useFocusEffect, useIsFocused } from "@react-navigation/core";

import api from "../../utils/api";
import { setCurrentUser } from "../../store/user/user.action";

const height = 100 * aspectRatio;
const d = "M 0 0 A 50 50 0 0 0 50 50 H 325 A 50 50 0 0 1 375 100 V 0 Z";

const defaultItems = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const Cart = ({ navigation }: HomeNavigationProps<"Cart">) => {
  const [items, setItems] = useState(defaultItems);
  const theme = useTheme();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootStateOrAny) => state.cart.items);
  const totalItems = useSelector(
    (state: RootStateOrAny) => state.cart.meta?.total
  );
  const user = useSelector((state: RootStateOrAny) => state.auth.user);

  const isFocused = useIsFocused();

  const getUser = async () => {
    let response;
    try {
      response = await api.get(`/users/${user.sub}`);
    } catch (err) {
      console.log("getUser err", err.response);
    }

    console.log("getUser", response?.status);

    if (response?.status === 200) {
      console.log("Checkout");
      dispatch(setCurrentUser({ ...response.data, sub: response.data.id }));
    }
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getCartItems());
      getUser();
    }
  }, [isFocused]);

  return (
    <CartContainer CheckoutComponent={Checkout}>
      <Box backgroundColor="primary">
        <Header
          dark
          title="Shopping Cart"
          left={{
            icon: "arrow-left",
            onPress: () => {
              // Remove the home route from the stack
              navigation.goBack();
            },
          }}
        />
      </Box>
      <Box flex={1}>
        {cartItems.length > 0 ? (
          <FlatList
            contentContainerStyle={{
              paddingVertical: 50 * aspectRatio,
            }}
            showsVerticalScrollIndicator={false}
            data={cartItems}
            renderItem={({ item: it, index }) => {
              return (
                <Item
                  key={it.id}
                  onDelete={async () => {
                    await dispatch(removeCartItem(it.id));
                  }}
                  item={it}
                />
              );
            }}
          />
        ) : (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text>No product found</Text>
          </Box>
        )}

        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height,
          }}
        >
          <Svg
            style={{ ...StyleSheet.absoluteFillObject }}
            viewBox="0 0 375 100"
          >
            <Path d={d} fill={theme.colors.primary} />
          </Svg>
          <Text variant="title2" textAlign="center" color="background">
            {totalItems} Items Added
          </Text>
        </Box>
      </Box>
    </CartContainer>
  );
};

export default Cart;
