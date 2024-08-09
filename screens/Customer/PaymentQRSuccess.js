import { AntDesign, Entypo } from "@expo/vector-icons";
import { 
  StyleSheet, 
  Text, View, 
  ToastAndroid, 
  PermissionsAndroid, 
  Platform } from "react-native";
import Button from "../../components/Button";
import { useState, useEffect, useRef, Alert } from "react";
import QRCode from "react-native-qrcode-svg";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import ViewShot from "react-native-view-shot";


const PaymentQRSuccess = ({ route, navigation }) => {
  const { paymentDetails } = route.params;
  console.log(paymentDetails);
  const paymentDetailsJson = JSON.stringify(paymentDetails);
  // const paymentDetailsJson = "Hello World.";
  const [ productQRRef, setProductQRRef ]= useState();
  const qrRef = useRef();

  const viewShotRef = useRef();


  const shareQRCode = async () => {
    if (viewShotRef.current) {
      console.log(2);
      try {
        // Capture the QR code as an image
        const uri = await viewShotRef.current.capture();

        // Generate a filename
        const fileName = `qr-payreceipt-${Date.now()}.png`;

        // Get the new file path
        const newFilePath = `${FileSystem.cacheDirectory}${fileName}`;

        // Move the captured image to the new file path
        await FileSystem.moveAsync({
          from: uri,
          to: newFilePath
        });

        // Share the file
        await Sharing.shareAsync(newFilePath);
      } catch (error) {
        alert('Error', 'Failed to generate or share QR code');
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}> 
        <AntDesign 
          name="close" 
          size={26} 
          color="black" 
          style={{ position: 'absolute', left: 0, top: 20 }} 
        />
        <AntDesign 
          name="checkcircle" 
          size={50} 
          color="#27ad62" 
        />
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Payment Success!</Text>
        <Text style={{ color: '#474747', fontSize: 15 }}>Your payment has been successfully done</Text>
      </View>
      <View style={styles.paymentQR}>
        <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <QRCode
              value={paymentDetailsJson}
              size={240}
              backgroundColor='transparent'
            />
          </View>
        </ViewShot>
      </View>
      <Button role="light" clickHandler={shareQRCode}>
        {/* <Feather 
          name="download" 
          size={20} 
          color="black" 
        />   */}
        <Entypo 
          name="share" 
          size={20} 
          color="black" 
        />
        {'  '}
        <Text>Share QR Code</Text>
      </Button>
      <Button role="dark" clickHandler={() => navigation.navigate('PaymentReceipt', { paymentDetails: paymentDetails })}>
        Generate Receipt
      </Button>
    </View>
  );
};

export default PaymentQRSuccess;

const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent: 'center',
    marginTop: 40,
    paddingHorizontal: 40,
  },

  title: {
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    position: "relative",
    flex: 1
  },

  paymentQR: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});
