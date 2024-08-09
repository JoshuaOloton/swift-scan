import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Row = ({ children }) => {
  return <View style={styles.row}>{children}</View>;
};

const OrderCard = ({ orderNo, date, amount }) => {
  return (
    <View>
      <Row>
        <Text style={styles.orderNo}>Order No {orderNo}</Text>
        <Text>{date.toDate().toLocaleDateString('en-GB')}</Text>
      </Row>
      <View style={styles.line}></View>
      <Row>
        <Text>Amount</Text>
        <Text>Total Amount: ₦ 
          <Text style={{ fontWeight: 'bold' }}>{amount}</Text>
        </Text>
      </Row>
      <Row>
        <Text>Reorder</Text>
        <Text style={{ color: 'green' }}>Successful</Text>
      </Row>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  orderNo: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  line: {
    height: 1,
    borderWidth: 0.5,
    borderColor: "#fff",
    flex: 1,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
});
