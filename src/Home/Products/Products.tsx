import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons as Icon } from "@expo/vector-icons";

import { Box, Header, Text, useTheme } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { TextInput } from "react-native-gesture-handler";
import CategoryList from "./CategoryList";
import Card from "./Card";
import {
  RootStateOrAny,
  shallowEqual,
  useDispatch,
  useSelector,
} from "react-redux";
import { getProducts } from "../../store/product/product.action";

import api from "../../utils/api";
import { useFocusEffect, useIsFocused } from "@react-navigation/core";
import { DELETE_ALL_PRODUCTS } from "../../store/product/product.type";

const Products = ({ navigation }: HomeNavigationProps<"ProductList">) => {
  const isFocused = useIsFocused();
  const theme = useTheme();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { items, meta } = useSelector(
    (state: RootStateOrAny) => state.products,
    shallowEqual
  );

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
    if (currentPage <= meta.lastPage) {
      setCurrentPage((prevState) => prevState + 1);
    }
  };

  const loadProducts = async () => {
    setIsLoading(true);
    await dispatch(
      getProducts({ page: currentPage, take: 6, categoryId: categoryIndex })
    );
    setIsLoading(false);
  };

  // useEffect(() => {
  //   console.log("useEffect Mount");
  //   if (currentPage <= meta.lastPage || 2) loadProducts();

  //   (async () => {
  //     const getCategories = await api.get("/categories");
  //     setCategories([{ id: 0, name: "all" }, ...getCategories.data]);
  //   })();

  //   return () => {
  //     console.log("useEffect unmount");
  //   };
  // }, [currentPage, categoryIndex]);

  useFocusEffect(
    React.useCallback(() => {
      if (currentPage <= meta.lastPage || 2) loadProducts();

      (async () => {
        const getCategories = await api.get("/categories");
        setCategories([{ id: 0, name: "all" }, ...getCategories.data]);
      })();

      return () => {};
    }, [currentPage, categoryIndex])
  );

  useFocusEffect(
    React.useCallback(() => {
      console.log("useFocusEffect mount");

      return () => {
        console.log("useFocusEffect unmount");
        dispatch({
          type: DELETE_ALL_PRODUCTS,
        });
        setCurrentPage(1);
      };
    }, [])
  );

  return (
    <Box flex={1} backgroundColor="background">
      <Header
        title="Product List"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{
          icon: "shopping-bag",
          onPress: () => navigation.navigate("Cart"),
        }}
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
          onChangeText={(textData) => setSearchText(textData)}
          value={searchText}
          style={{
            fontSize: 18,
            fontWeight: "bold",
            flex: 1,
            color: theme.colors.body,
          }}
          onSubmitEditing={() => {
            setSearchText("");
            navigation.navigate("ProductSearch", { searchText });
          }}
        />
      </Box>
      <CategoryList
        categoryIndex={categoryIndex}
        categories={categories}
        changeCategory={(index) => {
          setCurrentPage(1);
          setCategoryIndex(index);
          dispatch({ type: DELETE_ALL_PRODUCTS });
        }}
      />
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
