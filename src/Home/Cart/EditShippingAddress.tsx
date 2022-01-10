import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, Alert } from "react-native";
import { Button, Header } from "../../components";
import RNTextInput from "../../components/Form/TextInput";

import api from "../../utils/api";

const { width } = Dimensions.get("window");

const EditShippingAddress = ({ navigation, route }) => {
  const { params } = route;
  const [address, setAddress] = useState(params.address);

  useEffect(() => {
    console.log("mounted");
    return () => {
      console.log("EditShippingAddress unmount");
    };
  }, []);

  const onSubmit = async () => {
    let response;
    try {
      response = await api.put(`/users/${params.userId}`, { address });
    } catch (err) {
      Alert.alert("Change address success", "Something went wrong");
      console.log("getUser err", err.response);
    }

    console.log("getUser", response?.status);

    if (response?.status === 200) {
      Alert.alert("Change address success", null, [
        { text: "OK", onPress: () => navigation.navigate("Cart") },
      ]);
      console.log("Checkout");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        dark={false}
        title="Edit Shipping Address"
        left={{
          icon: "arrow-left",
          onPress: () => {
            // Remove the home route from the stack
            navigation.navigate("Cart");
            // navigation.dispatch();
          },
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ marginBottom: 20, width: width, paddingHorizontal: 20 }}>
          <RNTextInput
            icon="map-pin"
            placeholder="Address"
            autoCapitalize="none"
            autoCompleteType="street-address"
            // multiline
            // value={route.params?.address ? route.params?.address : address}
            value={address}
            onChangeText={(text) => {
              console.log(text);
              setAddress(text);
            }}
          />
        </View>
        <Button variant="primary" onPress={() => onSubmit()} label="Submit" />
      </View>
    </View>
  );
};

export default EditShippingAddress;
