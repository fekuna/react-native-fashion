import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Box, Header, Text, makeStyles, useTheme } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import ScrollableContent from "../../components/ScrollableContent";
import { Theme } from "../../components/Theme";
import {
  getGraphData,
  getHistoryTransaction,
} from "../../store/history/history.action";
import Graph, { DataPoint } from "./Graph/Graph";
import Transaction from "./Transaction";

const startDate = new Date("09/01/2021").getTime();
const numberOfMonths = 6;

// const graphData: DataPoint[] = [
//   {
//     id: 245674,
//     createdAt: new Date("10/01/2019").getTime(),
//     totalPrice: 139.42,
//     color: "primary",
//   },
//   {
//     id: 245675,
//     createdAt: new Date("12/01/2019").getTime(),
//     totalPrice: 281.23,
//     color: "graph1",
//   },
//   {
//     id: 245677,
//     createdAt: new Date("02/01/2020").getTime(),
//     totalPrice: 198.54,
//     color: "graph2",
//   },
// ];

const footerHeight = Dimensions.get("window").width / 5.5;
const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  scrollView: {
    paddingBottom: footerHeight,
  },
}));

const TransactionHistory = ({
  navigation,
}: HomeNavigationProps<"TransactionHistory">) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const transition = useSharedValue(0);
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  const [totalOrderPrice, setTotalOrderPrice] = useState(0);

  const { items, graph } = useSelector(
    (state: RootStateOrAny) => state.transactionHistories
  );

  useEffect(() => {
    console.log("useEffect nich");
    (async () => {
      if (isFocused) {
        setIsLoading(true);
        const getHistories: any = await dispatch(getHistoryTransaction());
        await dispatch(getGraphData());

        // console.log("getHistories", getHistories);

        const total = getHistories.reduce(
          (prevValue, item) => prevValue + item.total,
          0
        );

        setTotalOrderPrice(total);
      }
    })();

    setIsLoading(false);

    transition.value = withTiming(1, { duration: 650 });
    return () => {
      transition.value = 0;
    };
  }, [isFocused, totalOrderPrice]);

  // console.log("TransactionHistories", { items, graph });

  if (isLoading) {
    return <ActivityIndicator size="large" color="#aaa" />;
  }

  return (
    !isLoading && (
      <ScrollableContent>
        <Box flex={1} backgroundColor="background">
          <Header
            title="Transaction History"
            left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
            right={{ icon: "share", onPress: () => true }}
            dark={false}
          />
          <Box flex={1} padding="m">
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Box>
                <Text variant="header" color="secondary" opacity={0.3}>
                  TOTAL SPENT
                </Text>
                <Text variant="title1">${totalOrderPrice.toFixed(2)}</Text>
              </Box>
              <Box backgroundColor="primaryLight" borderRadius="l" padding="s">
                <Text color="primary">All Time</Text>
              </Box>
            </Box>
            {!isLoading ? (
              <Graph
                data={graph}
                startDate={startDate}
                numberOfMonths={numberOfMonths}
                transition={transition}
                theme={theme}
              />
            ) : (
              <ActivityIndicator />
            )}
            <ScrollView
              contentContainerStyle={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              {items.map((transaction) => (
                <Transaction key={transaction.id} transaction={transaction} />
              ))}
            </ScrollView>
          </Box>
        </Box>
      </ScrollableContent>
    )
  );
};

export default TransactionHistory;
