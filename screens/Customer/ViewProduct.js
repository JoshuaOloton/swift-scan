import { AntDesign } from "@expo/vector-icons";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Button from "../../components/Button";
import React, { useState, useEffect } from "react";
import { db } from "../../services/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useApp } from "../../context/AppContext";

const ViewProduct = ({ navigation, route }) => {
  const { cart, setCart } = useApp();

  const { barcode } = route.params;

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const updateQuantity = (update) => {
    if (quantity + update < 1) {
      return;
    }
    setQuantity((prev) => prev + update);
  };

  const addToCart = () => {
    try {
      setLoading(true);
      setCart((currentCart) => {
        const existingCart = cart.find(
          (item) => item.barcode === product.barcode
        );
        if (existingCart) {
          return currentCart.map((item) =>
            item.barcode === product.barcode
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...currentCart, { ...product, quantity }];
        }
      });
      // const cartCopy = [...cart];
      // const itemIndex = cartCopy.findIndex(
      //   (i) => i.barcode === product.barcode
      // );
      // if (itemIndex !== -1) {
      //   cartCopy[itemIndex].quantity += 1;
      // } else {
      //   cartCopy.push({ ...product, quantity });
      // }
      // setCart(cartCopy);
      navigation.navigate("ScanProduct"); // navigate back to scan product
    } catch (error) {
      console.log("error");
      console.log(error);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (product) {
      setTotalPrice(product.price * quantity);
    }
  }, [quantity, product]);

  useEffect(() => {
    const fetchProduct = async (barcode) => {
      console.log("fetchProduct");
      console.log(barcode);

      const productRef = collection(db, "products");
      const q = query(productRef, where("barcode", "==", barcode));

      console.log("q");
      console.log(q);
      // console.log(q.data());

      try {
        const querySnapshot = await getDocs(q);
        console.log("querySnapshot");
        console.log(querySnapshot);
        const q1 = querySnapshot.docs[0].data();
        console.log("q1");
        console.log(q1);
        setProduct(q1);
        setTotalPrice(q1.price);
      } catch (error) { // Product not found, scan again
        alert("Error fetching product");
        setTimeout(() => {
          navigation.navigate("ScanProduct");
        }, 1000);
      }
    };
    fetchProduct(barcode);
  }, []);

  useEffect(() => {
    console.log("product");
    console.log(product);
  }, [product]);

  if (product === null) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 27, fontWeight: "bold" }}>{product.name}</Text>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          gap: 40,
          marginTop: 10,
          marginBottom: 20,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 20 }}>&#8358;{totalPrice.toFixed(2)}</Text>
        <View style={styles.btnWrapper}>
          <TouchableOpacity onPress={() => updateQuantity(-1)}>
            <AntDesign name="minuscircleo" size={22} color="black" />
          </TouchableOpacity>
          <Text>{quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(1)}>
            <AntDesign name="pluscircleo" size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.review}>
        <AntDesign name="star" size={24} color="#f2c94c" />
        <Text>4.5</Text>
        <Text style={{ color: "#808080", marginStart: 10 }}>(50 reviews)</Text>
      </View>
      <Text style={styles.description}>{product.description}</Text>

      <Button role="submit-form" clickHandler={addToCart}>
        {!loading ? (
          "ADD TO CART"
        ) : (
          <ActivityIndicator size="large" color="#fff" />
        )}
      </Button>
    </View>
  );
};

export default ViewProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 40,
    paddingHorizontal: 40,
    paddingTop: 100,
    paddingBottom: 10,
  },

  btnWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  description: {
    fontSize: 16,
    color: "#606060",
    textAlign: "justify",
    flex: 1,
  },

  review: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
  }
});
