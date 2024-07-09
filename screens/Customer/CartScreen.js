import { AntDesign } from "@expo/vector-icons";
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from "../../context/AppContext";
import CartItem from "../../components/CartItem";
import Button from "../../components/Button";
import { useState } from "react";


const CartScreen = ({ navigation }) => {
  const { cart } = useApp();

  const [loading, setLoading] = useState(false);

  const proceedToCheckout = () => {
    try {
      setLoading(true);
      navigation.navigate('Checkout');
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
        ) : (
          <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#000', flex: 1 }}>
              <Text style={{ fontSize: 20, fontFamily: 'Gelasio' }}>Cart is empty</Text>
              <MaterialCommunityIcons name="emoticon-sad-outline" size={35} color="black" />
          </View>
        )}
        <Button role="submit-form" clickHandler={proceedToCheckout}>
          {!loading ? (
            "Check out"
          ) : (
            <ActivityIndicator size="large" color="#fff" />
          )}
        </Button>
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
    borderWidth: 1,
    borderColor: '#000'
  },

  cartItems: {
    flex: 1,
    paddingVertical: 15,
  }
})