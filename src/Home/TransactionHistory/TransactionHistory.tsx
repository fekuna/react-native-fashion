import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Box, Header, Text, makeStyles } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import ScrollableContent from "../../components/ScrollableContent";
import { Theme } from "../../components/Theme";
import { getHistoryTransaction } from "../../store/history/history.action";
import Graph, { DataPoint } from "./Graph/Graph";
import Transaction from "./Transaction";

const startDate = new Date("09/01/2019").getTime();
const numberOfMonths = 6;

const graphData: DataPoint[] = [
  {
    id: 245674,
    created_at: new Date("10/01/2019").getTime(),
    total: 139.42,
    color: "primary",
  },
  {
    id: 245675,
    created_at: new Date("12/01/2019").getTime(),
    total: 281.23,
    color: "graph1",
  },
  {
    id: 245677,
    created_at: new Date("02/01/2020").getTime(),
    total: 198.54,
    color: "graph2",
  },
];

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

  const [totalOrderPrice, setTotalOrderPrice] = useState(0);

  const transactionHistories = useSelector(
    (state: RootStateOrAny) => state.transactionHistories.items
  );

  useEffect(() => {
    if (isFocused) {
      console.log("isFocused", isFocused);
      dispatch(getHistoryTransaction());
    }

    console.log("TransactionHisotry useEffect: ", transactionHistories);

    const totalOrderPrice = transactionHistories.reduce(
      (prevValue, item) => prevValue + item.total,
      0
    );

    setTotalOrderPrice(totalOrderPrice);
  }, [isFocused]);

  // console.log("TransactionHistories", transactionHistories);

  return (
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
              <Text variant="title1">${totalOrderPrice}</Text>
            </Box>
            <Box backgroundColor="primaryLight" borderRadius="l" padding="s">
              <Text color="primary">All Time</Text>
            </Box>
          </Box>
          <Graph
            data={graphData}
            startDate={startDate}
            numberOfMonths={numberOfMonths}
          />
          <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {transactionHistories.map((transaction) => (
              <Transaction key={transaction.id} transaction={transaction} />
            ))}
          </ScrollView>
        </Box>
      </Box>
    </ScrollableContent>
  );
};

export default TransactionHistory;
