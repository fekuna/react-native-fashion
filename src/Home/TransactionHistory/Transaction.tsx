import React from "react";
import moment from "moment";
import { DataPoint } from "./Graph/Graph";
import { Box, Text } from "../../components";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { HomeScreenProp } from "../../components/Navigation";
import { useNavigation } from "@react-navigation/core";

interface TransactionProps {
  transaction: any;
}

const Transaction = ({ transaction }: TransactionProps) => {
  console.log("transaction", transaction);

  const navigation = useNavigation<HomeScreenProp>();

  return (
    <Box
      flexDirection="row"
      marginTop="l"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Box flexDirection="row" alignItems="center" marginBottom="s">
          {/* <Box
            backgroundColor={transaction.color}
            marginRight="s"
            style={{ width: 10, height: 10, borderRadius: 5 }}
          /> */}
          <Text variant="title3">
            {`#${transaction.id}`} - status:{" "}
            {transaction.status.name.toUpperCase()}
          </Text>
        </Box>
        <Text color="info">
          {`$${transaction.total.toFixed(2)} - ${moment(
            transaction.created_at
          ).format("MMMM DD, YYYY")}`}
        </Text>
      </Box>
      <Box>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("TransactionItemList", { transaction })
          }
        >
          <Text variant="button" color="secondary">
            See more
          </Text>
        </TouchableWithoutFeedback>
      </Box>
    </Box>
  );
};

export default Transaction;
