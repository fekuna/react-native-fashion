import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components";

import api from "../../utils/api";
import Card from "./Card";

interface getProductProps {
  page?: number;
  take?: number;
  keyword?: string;
  categoryId?: number;
}

const ProductSearch = ({ navigation, route }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const [productData, setProductData] = useState([]);
  const [productMeta, setproductMeta] = useState({ lastPage: null });
  const [currentPage, setCurrentPage] = useState(1);

  const getProductSearch = async ({
    page = 1,
    take = 10,
    keyword = "",
    categoryId = 0,
  }: getProductProps) => {
    setIsLoading(true);
    // console.log("getProductSearch", { page, take, keyword, categoryId });

    let response;
    try {
      response = await api.get(
        `/products?page=${page}&take=${take}&keyword=${keyword}&categoryId=${categoryId}`
      );
    } catch (err) {
      console.log("failed to get products");
    }

    if (response?.status === 200) {
      const { data, meta } = response.data;
      setProductData((prevState) => [...prevState, ...data]);
      setproductMeta(meta);
    }
    setIsLoading(false);
  };

  const renderLoader = () => {
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
    console.log("loadMoreItem", productMeta.lastPage);
    if (currentPage <= productMeta?.lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (currentPage <= productMeta.lastPage || 2) {
      console.log("useEffect");
      getProductSearch({
        keyword: route.params.searchText,
      });
    }
    return () => {
      setProductData([]);
      setproductMeta({ lastPage: null });
    };
  }, [currentPage]);

  // console.log("ProductSearch State", productMeta);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Header
        title="Product Search"
        left={{
          icon: "arrow-left",
          onPress: () => navigation.goBack(),
        }}
        right={{ icon: "shopping-bag", onPress: () => true }}
        dark={false}
        disableMarginTop
      />
      {productData.length > 0 ? (
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
          data={productData}
          renderItem={({ item }) => {
            return <Card key={item.id} item={item} />;
          }}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No product found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProductSearch;
