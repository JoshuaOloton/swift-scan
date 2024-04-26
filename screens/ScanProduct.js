import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";

const ScanProduct = () => {
  console.log('StatusBar.currentHeight ==> ', StatusBar.currentHeight);
  return (
    <View
      style={{
        marginTop: StatusBar.currentHeight,
        backgroundColor: "tan",
        flex: 1,
      }}
    >
      <Text style={{ fontSize: 40, color: 'rdd' }}>Scan Product Now</Text>
    </View>
  );
};

export default ScanProduct;

const styles = StyleSheet.create({});
