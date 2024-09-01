import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Button,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";

import * as ImagePicker from 'expo-image-picker';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from "react-native-reanimated";
import Text from "@kaloraat/react-native-text";
import UserInput from "../../components/UserInput";
import ActionButton from "../../components/Button";
import { db } from "../../services/config";
import { useState, useEffect } from "react";
import { doc, collection, getDoc, addDoc, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function RegisterProduct({ route, navigation }) {
  const OFFSET = 4;
  const TIME = 60;
  const REPS = 10;

  const offset = useSharedValue(0);

  const image = require("../../assets/barcode.png");
  const { barcode } = route.params;

  const storage = getStorage();
  const storageRef = ref(storage, 'products');

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploading, setUploading] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

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

  

  const addProductToInventory = async (name, stock, price, description) => {
    try {
      const docRef = await addDoc(collection(db, "products"), {
        name,
        stock,
        price,
        description,
        date_added: Timestamp.fromDate(new Date()),
        barcode
      });
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      setErrorMsg("");
      setLoading(true);
      await addProductToInventory(name, stock, price, description);

      navigation.navigate("ScanSuccess");
    } catch (error) {
      setErrorMsg(`Something went wrong. ${error.message}`);
      setLoading(false);
    }
  };

  const displayImageModal = () => {
    if (!name || !stock || !price || !description) {
      setErrorMsg("Please fill in all fields");
      return;
    }
    setModalVisible(prevState => !prevState);
  }

  const uploadtoFirebase = async (uri, barcode, onProgress) => {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const imageRef = ref(storageRef, `${barcode}.png`);

    const uploadTask = uploadBytesResumable(imageRef, theBlob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress && onProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          reject(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            downloadUrl,
            metadata: uploadTask.snapshot.metadata,
          });
        }
      );
    });
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const { uri } = result.assets[0];
      // const filename = uri.split('/').pop();

      await uploadtoFirebase(uri, barcode, (progress) => {
        console.log(`Uploading: ${progress}%`);
        setUploading(progress);
        if (progress === 100) {
          setUploadComplete(true);
        }
      });
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
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
            color: "#67404d",
          }}
        >
          Register Product
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
              name="stock"
              value={stock}
              setValue={setStock}
              inputMode="numeric"
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
              // Image Picker - Product Image
            />
            
          </View>
          <ActionButton role="dark" clickHandler={displayImageModal}>
            {!loading ? "ADD" : <ActivityIndicator size="large" color="#fff" />}
          </ActionButton>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
              setModalVisible(prevState => !prevState);
            }}>
            <View style={styles.modalWrapper}>
              <View style={styles.modalTitle}>
                <Text style={{ color: '#fff' }}>Choose product image</Text>
                <AntDesign 
                  name="close" 
                  size={18} 
                  color="#fff" 
                  onPress={() => setModalVisible(prevState => !prevState)}
                />
              </View>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={pickImage} style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                    backgroundColor: '#ffd5d0',
                    marginBottom: 10,
                  }}>
                  <AntDesign
                    name="picture"
                    size={24}
                    color="#3E3136"
                  />
                  <Text style={{ color: '#3E3136', fontWeight: 'bold' }}>Pick an image from camera roll</Text>
                </TouchableOpacity>
                {/* { uploading > 0 &&
                  <View style={styles.progressBar}>
                    <View style={[styles.progressStatus, {width: `${uploading}%`}]}></View>
                  </View>
                } */}
                { uploadComplete && 
                  <View style={styles.uploadComplete}>
                    <AntDesign 
                      name="checkcircle" 
                      size={30} 
                      color="#27ad62" 
                    />
                    <Text style={{ fontSize: 12, fontFamily: 'Signika' }}>Upload Completed.</Text>
                  </View>
                }
                <ActionButton role="purple" clickHandler={handleSubmit}>
                  {!loading ? "ADD PRODUCT" : <ActivityIndicator size="large" color="#fff" />}
                </ActionButton>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 40,
  },

  modalWrapper: {
    backgroundColor: '#FFE4E1', 
    height: '40%',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalTitle: {
    width: '100%',
    backgroundColor: '#67404d',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 5,
    alignItems: 'center',
    marginBottom: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalContent: {
    paddingHorizontal: 30,
  },  

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
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
    marginBottom: 20,
  },

  error: {
    color: 'red',
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 5
  },

  progressBar: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  progressStatus: {
    height: '100%',
    backgroundColor: '#4A2F38',
    borderRadius: 5,
  },

  uploadComplete: {
    marginVertical: 5,
    alignItems: 'center',
  },
});
