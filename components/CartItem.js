import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useApp } from "../context/AppContext";


const CartItem = ({ barcode, name, price, quantity }) => {
  const { cart, setCart } = useApp();

  const removeItem = (barcode) => {
    // const newCart = currentCart.filter((item) => item.barcode !== barcode);

    setCart((currentCart) => currentCart.filter((item) => item.barcode !== barcode));
  }

  const updateQuantity = (barcode, update) => {
    setCart(currentCart => currentCart.map(item => 
      item.barcode === barcode ? 
      { ...item, quantity: item.quantity + update } : item)
    );
  } 

  return (
    <View style={styles.cartItemWrapper}>
      <View style={styles.productInfo}>
        <View style={{ gap: 5 }}>
          <Text style={{ color: "#999", fontSize: 19 }}>{name}</Text>
          <Text style={{ fontSize: 17, marginLeft: 10 }}>&#8358;{parseFloat(price * quantity).toFixed(2)}</Text>
        </View>
        <TouchableOpacity onPress={() => removeItem(barcode)}>
          <MaterialIcons name="cancel" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.btnWrapper}>
        <TouchableOpacity onPress={() => updateQuantity(barcode, -1)}>
          <AntDesign name="minuscircleo" size={24} color="#999" />
        </TouchableOpacity>
        <Text>{quantity}</Text>
        <TouchableOpacity onPress={() => updateQuantity(barcode, 1)}>
          <AntDesign name="pluscircleo" size={24} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItemWrapper: {
    gap: 10,
  },

  productInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  btnWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
