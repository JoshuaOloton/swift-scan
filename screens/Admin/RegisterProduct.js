import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View, Image, ActivityIndicator } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from "react-native-reanimated";
import Text from "@kaloraat/react-native-text";
import UserInput from "../../components/UserInput";
import Button from "../../components/Button";
import { db } from "../../services/config";
import { useState, useEffect } from "react";
import { doc, collection, getDoc, addDoc, Timestamp } from "firebase/firestore";

export default function RegisterProduct({ route, navigation }) {
  const OFFSET = 4;
  const TIME = 60;
  const REPS = 10;

  const offset = useSharedValue(0);

  const image = require("../../assets/barcode.png");
  const { barcode } = route.params;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    offset.value = withRepeat(withTiming(offset.value === 0 ? OFFSET : 0, { duration: TIME }), REPS, true);
  }, [errorMsg]);

  // useEffect(() => {
  //   const productExistsRedirect = async (id) => { // id is unique barcode
  //     const productRef = doc(db, "products", id);
  //     const productSnap = await getDoc(productRef);
  //     console.log('productSnap');
  //     console.log(productSnap);
  //     if (productSnap.exists()) {
  //       alert("Product already exists. Please scan another product to continue.");
  //       // navigation.goBack();
  //     }
  //   }
  //   productExistsRedirect();
  // }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }))

  

  const addProductToInventory = async (name, quantity, price, description) => {
    try {
      console.log("Add product to inventory");
      console.log({
        name,
        quantity,
        price,
        description,
      });

      // check if product with barcode alreay exists
      // const exists = await productExists(barcode);
      // if (exists) {
      //   setErrorMsg("Product already exists");
      //   return;
      // } 

      const docRef = await addDoc(collection(db, "products"), {
        name,
        quantity,
        price,
        description,
        date_added: Timestamp.fromDate(new Date()),
        barcode
      });
      console.log("docRef ==> ", docRef);
      console.log("Success?");
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("Name: ", name);
      console.log("Quantity: ", quantity);
      console.log("Price: ", price);
      console.log("Description: ", description);

      setErrorMsg("");
      setLoading(true);
      await addProductToInventory(name, quantity, price, description);
      alert(`Product with id: ${barcode} added successfully! Please scan another product to continue.`);
      navigation.goBack();
    } catch (error) {
      setErrorMsg(`Something went wrong. ${error.message}`);
      setLoading(false);
    }
  };

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
          Register Product
        </Text>
      </View>
      <View style={styles.product}>
        <View style={styles.barcode}>
          <Image source={image} />
          <Text center>{barcode}</Text>
        </View>
        {errorMsg && <Animated.Text style={[styles.error, {fontFamily: 'Nunito Sans'}, style]}>{errorMsg}</Animated.Text>}
        <View style={styles.registerForm}>
          <UserInput
            name="Name of Product"
            value={name}
            setValue={setName}
            autoCapitalize="words"
          />
          <UserInput
            name="Quantity"
            value={quantity}
            setValue={setQuantity}
            autoCapitalize="words"
          />
          <UserInput
            name="Price"
            value={price}
            setValue={setPrice}
            inputMode="numeric"
          />
          <UserInput
            name="Description"
            value={description}
            setValue={setDescription}
            autoCapitalize="sentences"
            multiline={true}
          />
        </View>
        <Button role="submit-form" clickHandler={handleSubmit}>
          {!loading ? "ADD" : <ActivityIndicator size="large" color="#fff" />}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 40,
    paddingHorizontal: 40,
  },

  title: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    position: "relative",
  },

  product: {
    flex: 1,
    paddingVertical: 15,
  },

  barcode: {
    alignItems: "center",
    marginBottom: 30,
  },

  registerForm: {
    flex: 1,
  },

  error: {
    color: 'red',
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 10
  }
});
