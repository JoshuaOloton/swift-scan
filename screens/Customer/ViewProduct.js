import { AntDesign } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import ActionButton from "../../components/Button";
import React, { useState, useEffect } from "react";
import { db } from "../../services/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useApp } from "../../context/AppContext";

const ViewProduct = ({ navigation, route }) => {
  const { cart, setCart } = useApp();
  const storage = getStorage();

  const { barcode } = route.params;

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const updateQuantity = (update) => {
    if (quantity + update < 1) {
      return;
    }
    setQuantity((prev) => prev + update);
  };

  // Add product to cart
  const addToCart = () => {
    try {
      setLoading(true);
      setCart((currentCart) => {
        const existingCart = currentCart.find(
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
      const productRef = collection(db, "products");
      const q = query(productRef, where("barcode", "==", barcode));

      try {
        const querySnapshot = await getDocs(q);
        const q1 = querySnapshot.docs[0].data();
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
    const fetchProductImage = async () => {
      const storageRef = ref(storage, `products/${barcode}.png`);
      getDownloadURL(storageRef)
      .then((url) => {
        console.log(url);
        setImageUrl(url);
      })
      .catch((error) => {
        console.error('Error fetching image URL:', error);
      });
    };
    fetchProductImage();
  }, [barcode]); // Include dependencies array

  if (product === null) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
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
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20, flex: 1, width: '100%' }}>
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 300, height: 300 }}
          />
        </View>
      <View style={styles.content}>
        <Text style={{ fontSize: 20, fontFamily: 'Gelasio' }}>{product.name}</Text>
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            gap: 40,
            marginTop: 10,
            marginBottom: 10,
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
        <ActionButton role="dark" clickHandler={addToCart}>
          {!loading ? (
            "ADD TO CART"
          ) : (
            <ActivityIndicator size="large" color="#fff" />
          )}
        </ActionButton>
      </View>
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
  },

  title: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    position: "relative",
  },

  content: {
    flex: 1,
    paddingHorizontal: 40,
    marginVertical: 20,
    flex: 1
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
