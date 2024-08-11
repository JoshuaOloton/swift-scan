import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";



const Row = ({ children }) => {
  return (
    <View style={styles.row}>
      { children }
    </View>
  );
}

const PaymentReceipt = ({ route, navigation }) => {

  const { paymentDetails } = route.params;

  const generateQR = () => {
    navigation.navigate("QRCode");
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <AntDesign 
          name="close" 
          size={30} 
          color="black" 
          style={{ 
            position: 'absolute', 
            left: 0, 
            top: '20%', 
            color: '#609966' 
          }} 
          onPress={() => navigation.goBack()}
        />
        <Text 
          style={{ 
            color: '#609966', 
            fontWeight: 'bold', 
            fontSize: 20, 
            textShadowColor: '#000', 
            textShadowRadius: 1 
          }}>
            ORDER ID  #{paymentDetails.ref_no}
          </Text>
        <Text 
          style={{ 
            color: '#609966', 
            fontWeight: 'bold', 
            fontSize: 20, 
            textShadowColor: '#000', 
            textShadowRadius: 1 
          }}>
            Aug 8th, 2024
          </Text>
        <Text 
          style={{ 
            color: '#609966', 
            fontWeight: 'bold', 
            fontSize: 30, 
            textShadowColor: '#000', 
            textShadowRadius: 1, 
            marginTop: 20 
          }}>
            YOUR ORDER HAS {"\n"} 
            BEEN COMPLETED
          </Text>
      </View>
      <View style={styles.receiptDetails}>
        { paymentDetails.cart.map((itemRow, index) => (
          <Row key={index}>
            <Text style={{ color: '#609966' }}>{itemRow.name}</Text>
            <Text style={{ color: '#609966' }}>qty: {itemRow.quantity}</Text>
            <Text style={{ color: '#609966' }}>₦{itemRow.price * itemRow.quantity}</Text>
          </Row>
        )) }
      </View>
      <Text style={{ textAlign: 'center', color: '#555', fontSize: 12 }}>Have any trouble? contact us</Text>
    </View>
  );
};

export default PaymentReceipt;

const styles = StyleSheet.create({
  container: {
    flex : 2,
    justifyContent: 'center',
    marginTop: 40,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },

  title: {
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    position: "relative",
    flex: 1,
  },

  receiptDetails: {
    flex: 2,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'silver'
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderStyle: 'dashed',
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  },

  badge: {
    borderRadius: 20,
    backgroundColor: 'green',
    padding: 10
  },

  line: {
    height: 1,
    borderWidth: 0.5,
    borderColor: '#fff',
    marginVertical: 35
    // flex: 1
  }
});

