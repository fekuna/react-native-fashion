import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons as Icon } from "@expo/vector-icons";

import { Box, Header, Text, useTheme } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { TextInput } from "react-native-gesture-handler";
import CategoryList from "./CategoryList";
import plants from "./data/plants";
import Card from "./Card";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/product/product.action";

const { width } = Dimensions.get("window");

const categories = ["ALL", "BAJU", "CELANA", "SEPATU", "AKSESORIS"];

const Products = ({ navigation }: HomeNavigationProps<"ProductList">) => {
  const theme = useTheme();
  const [categoryIndex, setCategoryIndex] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { items, meta } = useSelector(
    (state: RootStateOrAny) => state.products
  );

  const renderLoader = () => {
    console.log("renderLoader", isLoading);
    return isLoading ? (
      <View
        style={{
          marginVertical: 16,
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    console.log("loadMoreItem", meta);
    if (currentPage <= meta.lastPage) {
      console.log("mashook");
      setCurrentPage(currentPage + 1);
    }
  };

  const loadProducts = async () => {
    setIsLoading(true);
    await dispatch(getProducts({ page: currentPage, take: 6 }));
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentPage <= meta.lastPage || 2) loadProducts();
  }, [currentPage]);

  return (
    <Box flex={1} backgroundColor="background">
      <Header
        title="Product List"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "shopping-bag", onPress: () => true }}
        dark={false}
      />
      <Box
        height={50}
        backgroundColor="background2"
        borderRadius="l"
        marginVertical="l"
        marginHorizontal="l"
        flexDirection="row"
        alignItems="center"
      >
        <Icon name="search" size={25} style={{ marginLeft: 20 }} />
        <TextInput
          placeholder="Search"
          style={{
            fontSize: 18,
            fontWeight: "bold",
            flex: 1,
            color: theme.colors.body,
          }}
        />
      </Box>
      <CategoryList categories={categories} />
      <FlatList
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        keyExtractor={(item) => item.id + Math.random()}
        data={items}
        renderItem={({ item }) => {
          return <Card key={item.id} item={item} />;
        }}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
    </Box>
  );
};

export default Products;
