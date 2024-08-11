import { AntDesign } from "@expo/vector-icons";
import { 
  Alert,
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  FlatList,
  Modal,
  TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../../services/config";
import { collection, getDocs, query, doc, deleteDoc, where } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useApp } from "../../context/AppContext";
import InventoryCard from "../../components/InventoryCard";
import SearchBox from "../../components/SearchBox";
import ActionButton from "../../components/Button";

export default function Inventory({ navigation }) {
  const { currentUser } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [viewInventories, setViewInventories] = useState([]);
  const [filteredInventories, setFilteredInventories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [productDetails, setProductDetails] = useState({
    productName: '',
    barcode: '',
  });
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const storage = getStorage();

  useEffect(() => {
    const fetchInventories = async () => {
      const inventories = await getDocs(collection(db, "products"));

        setViewInventories(inventories.docs);
        setFilteredInventories(inventories.docs);
    };

    fetchInventories();
  }, []);

  useEffect(() => {
    const filterInventories = viewInventories.filter((inventory) =>
      inventory.data().name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
    setFilteredInventories(filterInventories);
  }, [viewInventories, searchTerm]);

  const showDeleteModal = (barcode, productName) => {
    setModalVisible(prevState => !prevState);
    setProductDetails({
      productName: productName,
      barcode: barcode,
    });
  }

  const deleteProduct = async () => {
    console.log('Deleting product', productDetails.barcode);

    // Delete product document from Firebase Firestore
    const productRef = collection(db, "products");
    await deleteDoc(doc(db, "products", "DC"));

    const q = query(
      collection(db, "products"),
      where("barcode", '==', productDetails.barcode)
    );

    try {
      // Execute the query
      const querySnapshot = await getDocs(q);
      const docSnapshot = querySnapshot.docs[0];
      await deleteDoc(docSnapshot.ref);
    } catch (error) { // Product not found, scan again
      alert("Error fetching user details.");
    }

    // Create a reference to the file to delete
    const deleteRef = ref(storage, `products/${productDetails.barcode}.png`);
    // Delete the file
    deleteObject(deleteRef).then(() => {
      // File deleted successfully
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false);
        setModalVisible(prevState => !prevState);
      }, 1000);
    }).catch((error) => {
      // Uh-oh, an error occurred!
      alert('Error deleting product image');
      console.error('Error deleting product image:', error);
    });
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
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Merriweather-Bold",
            fontSize: 20,
            color: "#67404d",
          }}
        >
          Inventory
        </Text>
      </View>
      <View style={styles.inventories}>
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search by Product.."
          overlap={false}
        />
        <View style={styles.invContent}>
          {viewInventories.length === 0 && (
            <Text style={{ fontFamily: "Nunito Sans", marginTop: 20 }}>
              Please wait...
            </Text>
          )}
          {filteredInventories.length === 0 ? (
            <Text style={{ fontFamily: "Nunito Sans", marginTop: 20 }}>
              No product found
            </Text>
          )
          : (
            <FlatList
              data={filteredInventories}
              renderItem={({ item }) => (
                <InventoryCard
                  key={item.id}
                  barcode={item.data()['barcode']}
                  name={item.data().name}
                  amount={item.data()['price']}
                  stock={item.data()['stock']}
                  modalVisible={modalVisible}
                  showDeleteModal={showDeleteModal}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(prevState => !prevState);
        }}>
        <View style={styles.modalWrapper}>
          <View style={styles.modalTitle}>
            <Text style={{ color: '#fff' }}>Delete Product: {productDetails.productName}</Text>
            <AntDesign 
              name="close" 
              size={18} 
              color="#fff" 
              onPress={() => setModalVisible(prevState => !prevState)}
            />
          </View>
          {deleteSuccess ? (
            <View style={styles.uploadComplete}>
              <AntDesign 
                name="checkcircle" 
                size={30} 
                color="#27ad62" 
              />
              <Text style={{ fontSize: 12, fontFamily: 'Signika' }}>Upload Completed.</Text>
            </View>
          ) : (
            <View style={styles.modalContent}>
              <ActionButton role="dark" clickHandler={deleteProduct}>
                DELETE
              </ActionButton>
              <ActionButton role="dark" clickHandler={() => setModalVisible(prevState => !prevState)}>
                CANCEL
              </ActionButton>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

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
    position: "relative",
  },
  
  inventories: {
    flex: 1,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 30,
  },
  
  invContent: {
    flex: 1,
    paddingVertical: 15,
  },

  modalWrapper: {
    backgroundColor: '#b57287', 
    height: '35%',
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
});
