import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useEffect } from "react";

const ScanProduct = ({ navigation }) => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [result, setResult] = useState("");

  /* Reset barcode when screen is navigated back to
  useful for when a product fetch fails o barcode is reset */
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setResult("");
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (result) {
      navigation.navigate('ViewProduct', { barcode: result });
    }
  }, [result]);

  if (!permission) {
    // {Permissions still loading}
    return <View />;
  }

  if (!permission.granted) {
    // {Permission not granted}
    return (
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Nunito Sans",
            fontSize: 18,
          }}
        >
          Allow SwiftScan to access your camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.grantPermission}
        >
          <Text style={{ color: "#fff" }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handleBarcodeScanned = ({ data, type }) => {
    setResult(data);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "Gelasio-Bold", fontSize: 23 }}>
        Fresh Mart
      </Text>
      <Text
        style={{
          fontFamily: "Signika",
          color: "#65543b",
          fontSize: 20,
          textAlign: "center",
          marginTop: 50,
        }}
      >
        Place barcode in box {"\n"}below
      </Text>
      <Text style={{ marginTop: 20, marginBottom: 10 }}>{result}</Text>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={handleBarcodeScanned}
        zoom={0.5} // 50% zoom
        barcodeScannerSettings={{
          barcodeTypes: [
            "upc_a",
            "upc_e",
            "ean_8",
            "ean_13",
            "code39",
            "code93",
            "code128",
            "pdf417",
          ],
        }}
      ></CameraView>
      {/* {!result ? (
        
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setResult("")}>
          <Text style={styles.text}>Scan again</Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
};

export default ScanProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    marginTop: 40,
    marginHorizontal: 40,
    paddingTop: 20,
  },

  camera: {
    width: 300,
    height: 300,
    marginVertical: 50,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "transparent",
    marginHorizontal: 20,
    marginVertical: 60,
  },

  button: {
    // flex: 1,
    // alignSelf: "flex-end",
    // alignItems: "center",
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 4,
  },

  text: {
    fontSize: 18,
    // fontWeight: "bold",
    color: "#fff",
  },

  grantPermission: {
    backgroundColor: "#242424",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    paddingHorizontal: 20,
  },
});
