import React, { useEffect, useRef, useState } from "react";
import { Alert, Dimensions, ScrollView, View } from "react-native";
import {
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";
import { Header, Text } from "../../components";
import { Box, useTheme } from "../../components";

import { HomeNavigationProps } from "../../components/Navigation";
import Footer from "./Footer";
import TopCurve from "./TopCurve";
import Outfit from "./Outfit";
import { useFocusEffect } from "@react-navigation/core";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getProductFavorites } from "../../store/favorite/favorite.action";
import api from "../../utils/api";

const { width: wWidth } = Dimensions.get("window");

// const defaultOutfits = [
//   { id: 0, color: "#BFEAF5", aspectRatio: 1, selected: false },
//   { id: 1, color: "#BEECC4", aspectRatio: 200 / 145, selected: false },
//   { id: 2, color: "#FFE4D9", aspectRatio: 180 / 145, selected: false },
//   { id: 3, color: "#FFDDDD", aspectRatio: 180 / 145, selected: false },
//   { id: 4, color: "#BFEAF5", aspectRatio: 1, selected: false },
//   { id: 5, color: "#F3F0EF", aspectRatio: 120 / 145, selected: false },
//   { id: 6, color: "#D5C3BB", aspectRatio: 210 / 145, selected: false },
//   { id: 7, color: "#DEEFC4", aspectRatio: 160 / 145, selected: false },
// ];

const FavoriteOutfits = ({
  navigation,
}: HomeNavigationProps<"FavoriteOutfits">) => {
  const transition = (
    <Transition.Together>
      <Transition.Out type="fade" />
      <Transition.In type="fade" />
    </Transition.Together>
  );
  const list = useRef<TransitioningView>(null);
  // const [outfits, setOutfits] = useState(defaultOutfits);
  const theme = useTheme();
  const width = (wWidth - theme.spacing.m * 3) / 2;
  const [footerHeight, setFooterHeight] = useState(0);

  const outfits = useSelector(
    (state: RootStateOrAny) => state.productFavorites.items
  );

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getProductFavorites());

      return () => {
        console.log("unmount");
      };
    }, [])
  );

  const removeFavoriteHandler = async (productId: number) => {
    let response;
    try {
      response = await api.delete(`/products/favorite/${productId}`);
    } catch (err) {
      Alert.alert("failed to remove item");
    }

    if (response?.status === 200) {
      dispatch(getProductFavorites());
    }
  };

  return (
    <Box flex={1} backgroundColor="background">
      <Header
        title="Favorite Outfits"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "shopping-bag", onPress: () => true }}
        dark={false}
      />
      <Box flex={1}>
        {outfits.length > 0 ? (
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: theme.spacing.s,
              paddingBottom: footerHeight,
            }}
          >
            <Transitioning.View ref={list} {...{ transition }}>
              <Box flexDirection="row">
                <Box marginRight="m">
                  {outfits
                    .filter((_, i) => i % 2 !== 0)
                    .map((outfit) => (
                      <Outfit
                        key={outfit.id}
                        outfit={outfit}
                        width={width}
                        removeHandler={removeFavoriteHandler}
                      />
                    ))}
                </Box>
                <Box>
                  {outfits
                    .filter((_, i) => i % 2 === 0)
                    .map((outfit) => (
                      <Outfit
                        key={outfit.id}
                        outfit={outfit}
                        width={width}
                        removeHandler={removeFavoriteHandler}
                      />
                    ))}
                </Box>
              </Box>
            </Transitioning.View>
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>No item found</Text>
          </View>
        )}

        <TopCurve footerHeight={footerHeight} />
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          onLayout={({
            nativeEvent: {
              layout: { height },
            },
          }) => setFooterHeight(height)}
        >
          {/* <Footer
            label="Add more to favorites"
            onPress={() => {
              list.current?.animateNextTransition();
              // setOutfits(outfits.filter((outfit) => !outfit.selected));
            }}
          /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default FavoriteOutfits;
