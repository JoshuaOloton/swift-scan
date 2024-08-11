import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button, Image, Modal, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const AdminTest = () => {
  const storage = getStorage();
  const storageRef = ref(storage, 'products');

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

  // useEffect(() => {
  //   setUploading(progress);
  // }, [progress]);

  const uploadtoFirebase = async (uri, barcode, onProgress) => {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const imageRef = ref(storageRef, barcode);

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
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        const { uri } = result.assets[0];
        const filename = uri.split('/').pop();
        setImage(uri);
        
        await uploadtoFirebase(uri, filename, (progress) => {
          console.log(`Uploading: ${progress}%`);
          setUploading(progress);
          if (progress === 100) {
            setUploadComplete(true);
          }
        });

      }
    };

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={[styles.progressStatus, {width: `${uploading}%`}]}></View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* <Text>{uploading.toFixed(2)}% Completed</Text> */}
      { uploadComplete && 
        <View style={styles.uploadComplete}>
          <AntDesign 
            name="checkcircle" 
            size={50} 
            color="#27ad62" 
          />
          <Text style={{ fontSize: 12, fontFamily: 'Signika' }}>Upload Completed.</Text>
        </View>
      }
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} resizeMode='contain' />}
    </View>
  )
}

export default AdminTest

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 40
  },
  image: {
    width: 300,
    height: 225,
  },
  progressBar: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  progressStatus: {
    height: '100%',
    backgroundColor: '#47b1e8',
    borderRadius: 5,
  },
  uploadComplete: {
    marginVertical: 10,
    alignItems: 'center',
  },

  
})