import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, useTheme, Box } from "../../components";
import { HomeScreenProp } from "../../components/Navigation";
import { aspectRatio } from "../../components/Theme";
import TransactionItem from "./TransactionItem";

const TransactionItemList = ({ route: { params } }) => {
  console.log("TransactionItemList", params.transaction);
  const theme = useTheme();

  const navigation = useNavigation<HomeScreenProp>();

  return (
    <View style={{ flex: 1 }}>
      <Header
        dark={false}
        title="Shopping Cart"
        left={{
          icon: "arrow-left",
          onPress: () => {
            // Remove the home route from the stack
            navigation.navigate("TransactionHistory");
          },
        }}
      />
      {params.transaction?.order_items.length > 0 ? (
        <FlatList
          contentContainerStyle={
            {
              // paddingVertical: 130,
            }
          }
          showsVerticalScrollIndicator={false}
          data={params.transaction?.order_items}
          renderItem={({ item: it, index }) => {
            return <TransactionItem key={it.id} item={it} />;
          }}
        />
      ) : (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text>No product found</Text>
        </Box>
      )}
    </View>
  );
};

export default TransactionItemList;
