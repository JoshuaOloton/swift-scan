import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from 'react-native'
import {PayWithFlutterwave} from 'flutterwave-react-native';


const Checkout = () => {

  const handleRedirect = (data) => {
    console.log(data);
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
          <Text style={{ fontSize: 20, fontFamily: 'Gelasio' }}>Select card type</Text>
          <PayWithFlutterwave
            onRedirect={handleRedirect}
            options={{
              tx_ref: generateTransactionRef(10),
              authorization: 'FLWPUBK_TEST-4b3f',
              customer: {
                'email': 'test@demo.com'
              },
              amount: 2000,
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
