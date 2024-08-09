import { AntDesign } from "@expo/vector-icons";
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from "../../context/AppContext";
import CartItem from "../../components/CartItem";
import Button from "../../components/Button";
import { useEffect, useState } from "react";


const CartScreen = ({ navigation }) => {
  const { cart } = useApp();
  
  const [totalCost, setTotalCost] = useState(0)
  const [loading, setLoading] = useState(false);

  
  const proceedToCheckout = () => {
    try {
      // use reduce function to store accumulated cost of all items
      let tCost = cart.map(item => item.price * item.quantity).reduce((a ,b) => a + b, 0).toFixed(2);
      navigation.navigate('Checkout', { tCost });

      // let tc = 0;
      // for (let item of cart) {
      //   tc += item.price;
      // }
      // console.log(tc.toFixed(2));
      // console.log(cart);
      // alert(totalCost);
    } catch (error) {
      setLoading(false);
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
          My cart
        </Text>
      </View>
      <View style={styles.cartContent}>
        { cart.length > 0 ? (
          <>
            <View style={styles.cartItems}>
              { cart.map(item => (
                <CartItem
                  key={item.barcode}
                  barcode={item.barcode}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                />
              )) }
            </View>
            <Button role="dark" clickHandler={proceedToCheckout}>
              {!loading ? (
                "Go to Checkout"
              ) : (
                <ActivityIndicator size="large" color="#fff" />
              )}
            </Button>
          </>
        ) : (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontFamily: 'Gelasio' }}>Cart is empty</Text>
              <MaterialCommunityIcons name="emoticon-sad-outline" size={35} color="black" />
          </View>
        )}
      </View>
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 40,
  },

  title: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    position: "relative",
  },

  cartContent: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },

  cartItems: {
    flex: 1,
    paddingVertical: 15,
  }
})