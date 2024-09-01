import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

export default function ScanReceipt({ navigation }) {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [result, setResult] = useState("");

  const [isCameraVisible, setIsCameraVisible] = useState(true);

  const isFocused = useIsFocused();

  /* Reset barcode when screen is navigated back to
  useful for when a product fetch fails o barcode is reset */
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setResult("");
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    return () => {
      if (isCameraVisible) {
        // CameraView.relea
      }
    }
  });

  // useEffect(() => {
  //   if (result) {
  //     navigation.navigate('ViewProduct', { barcode: result });
  //   }
  // }, [result]);

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

  if (!isFocused) {
    return null;
  }

  const handleBarcodeScanned = ({ data, type }) => {
    setResult(data);

    try {
      const paymentDetails = JSON.parse(data);

      navigation.navigate('AdminPaymentReceipt', { paymentDetails: paymentDetails });
    } catch (error) {
      alert('Invalid QR data. Please scan a different QR code.');
      navigation.navigate('ScanReceipt');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "Gelasio-Bold", fontSize: 23 }}>
        Scan Receipt
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
        Place QR Code in box {"\n"}below
      </Text>
      <Text style={{ marginTop: 20, marginBottom: 10 }}>{result}</Text>
      { isFocused && 
        <CameraView
          style={styles.camera}
          facing={facing}
          onBarcodeScanned={handleBarcodeScanned}
          zoom={0.5} // 50% zoom
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        ></CameraView>
      }
    </View>
  );
}

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


});
