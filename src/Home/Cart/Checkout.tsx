import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import api, { API_URL } from "../../utils/api";

import { Box, Button, Text } from "../../components";

import Card, { CardType } from "./Card";
import AddCard from "./AddCard";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { createOrder, getCartItems } from "../../store/cart/cart.action";
import { HomeScreenProp } from "../../components/Navigation";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/core";
import { setCurrentUser } from "../../store/user/user.action";

interface CheckoutProps {
  minHeight: number;
}

const cards = [
  {
    id: 0,
    type: CardType.VISA,
    last4digits: 5467,
    expirationDate: "05/24",
  },
  {
    id: 1,
    type: CardType.MASTERCARD,
    last4digits: 2620,
    expirationDate: "02/24",
  },
];

interface LineItemProps {
  label: string;
  value: number;
}

const LineItem = ({ label, value }: LineItemProps) => {
  return (
    <Box flexDirection="row" paddingVertical="s">
      <Box flex={1}>
        <Text variant="title3" color="background">
          {label}
        </Text>
      </Box>
      <Box>
        <Text color="primary" variant="title3">
          ${value}
        </Text>
      </Box>
    </Box>
  );
};

const Checkout = ({ minHeight }: CheckoutProps) => {
  const [selectedCard, setSelectedCard] = useState(cards[0].id);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(12);
  const cartItems = useSelector((state: RootStateOrAny) => state.cart.items);
  const user = useSelector((state: RootStateOrAny) => state.auth.user);

  const navigation = useNavigation<HomeScreenProp>();

  const dispatch = useDispatch();

  useEffect(() => {
    const countPrice = cartItems.reduce(
      (previousValue, item) =>
        previousValue + item.product.price * item.quantity,
      0
    );

    setTotalPrice(countPrice);
  }, [totalPrice, cartItems]);

  return (
    <Box flex={1} backgroundColor="secondary" style={{ paddingTop: minHeight }}>
      <Box flex={1} padding="m">
        <ScrollView
          style={{ flexGrow: 0 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <AddCard />
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              selected={selectedCard === card.id}
              onSelect={() => setSelectedCard(card.id)}
            />
          ))}
        </ScrollView>
        <Box marginTop="l">
          <Text color="background" variant="title3">
            Delivery Address
          </Text>
          <Box flexDirection="row" opacity={0.5} paddingVertical="m">
            <Box flex={1}>
              {user.address ? (
                <Text color="background">{user.address}</Text>
              ) : (
                <Text color="background">No address found</Text>
              )}
            </Box>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("EditShippingAddress", {
                  address: user.address,
                })
              }
            >
              <Box justifyContent="center" alignItems="center">
                <Text color="background">Change</Text>
              </Box>
            </TouchableWithoutFeedback>
          </Box>
          <LineItem
            label={`Total Items (${cartItems.length})`}
            value={+totalPrice.toFixed(2)}
          />
          <LineItem
            label="Standard Delivery"
            value={+deliveryPrice.toFixed(2)}
          />
          <LineItem
            label="Total Payment"
            value={+(totalPrice + deliveryPrice).toFixed(2)}
          />
        </Box>
        <Box
          paddingVertical="s"
          alignItems="center"
          // justifyContent="flex-end"
          flex={1}
        >
          <Button
            label="Pay now"
            variant="primary"
            onPress={() => {
              dispatch(createOrder(deliveryPrice, user.address));
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
