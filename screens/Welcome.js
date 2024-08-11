import { StyleSheet, View, Image } from "react-native";
import Text from "@kaloraat/react-native-text";
import ActionButton from "../components/Button";
import { useApp } from "../context/AppContext";

const Welcome = ({ navigation }) => {
  const { currentUser } = useApp();
  
  const cart = require("../assets/shopping-cart.png");

  return (
    <View style={styles.container}>
      <Text center style={{ fontFamily: "Gelasio-Bold", fontSize: 27, marginBottom: 15 }}>
        SWIFT SCAN
      </Text>
      <Text center color="#909090">
        Seamless Shopping,{"\n\n"}Your Checkout, Your Way !!!
      </Text>
      <Image source={cart} style={styles.cartImage} />
      <ActionButton
        role="dark"
        style={styles.getStarted}
        clickHandler={() => navigation.navigate("Login")}
      >
        Get Started
      </ActionButton>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    marginHorizontal: 20,
  },

  welcomeTitle: {
    fontWeight: "bold",
    fontSize: 25,
  },

  cartImage: {
    // width: 300,
    // height: 150
    alignSelf: "center",
    borderWidth: 1,
  },

  getStarted: {
    paddingHorizontal: 100
  }
});
