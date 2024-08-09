import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native'
import {PayWithFlutterwave} from 'flutterwave-react-native';
import { useApp } from "../../context/AppContext";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../services/config";


const Checkout = ({ route, navigation }) => {
  const { currentUser, cart, setCart } = useApp();
  const [transID, setTransID] = useState(null);
  const [price, setPrice] = useState(0);

  const { tCost } = route.params;

  const handleRedirect = (paymentResponse) => {
    console.log('Flutterwave response', paymentResponse);
    if (paymentResponse.status === 'completed') {
      // add order to firestore
      addOrderToFirestore(currentUser.email, paymentResponse.transaction_id);
      
      // Details to be encoded in QR code
      const payDetails = {
        amount: parseFloat(tCost),
        email: currentUser.email,
        ref_no: paymentResponse.transaction_id,
        cart: cart,
      }

      setCart([]); // clear cart

      navigation.navigate('PaymentQRSuccess', { paymentDetails: payDetails });
    }
  }

  /* generate a random transaction reference */
  const generateTransactionRef = (length) => {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `flw_tx_ref_${result}`;
  };

  const addOrderToFirestore = async (email, transId) => {
   try {
     // add order to firestore
     const docRef = await addDoc(collection(db, "orders"), {
      "email": email,
      "date_ordered": Timestamp.fromDate(new Date()),
      "transaction ID": transId,
      "total_cost": parseFloat(tCost),
    });
   } catch (error) {
    console.error(error);
    alert('Error adding order');
   }
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <AntDesign
          name="left"
          size={24}
          color="black"
          style={{ position: "absolute", left: 30 }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Merriweather-Bold",
            fontSize: 20,
          }}
        >
          Add Payment Method
        </Text>
      </View>
      <View style={styles.checkoutInfo}>
        <View style={styles.infoHeader}>
          <PayWithFlutterwave
            onRedirect={handleRedirect}
            options={{
              tx_ref: generateTransactionRef(10),
              authorization: 'FLWPUBK_TEST-d783a34b0ec7255a4c5bd889b7878cef-X',
              customer: {
                'email': currentUser.email
              },
              amount: parseFloat(tCost),
              currency: 'NGN',
              payment_options: 'card',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 40,
  },

  title: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },

  checkoutInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
});
