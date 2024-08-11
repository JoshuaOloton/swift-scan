import { AntDesign } from "@expo/vector-icons";
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  Modal 
} from 'react-native'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from 'react';


const InventoryCard = ({ 
  barcode, 
  name, 
  amount, 
  stock, 
  modalVisible, 
  showDeleteModal 
}) => {
  const storage = getStorage();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const storageRef = ref(storage, `products/${barcode}.png`);
    getDownloadURL(storageRef)
      .then((url) => {
        console.log(url);
        setImageUrl(url);
      })
      .catch((error) => {
        console.error('Error fetching image URL:', error);
      });
  }, [barcode]); // Include dependencies array

  const deleteProduct = () => {
    showDeleteModal(barcode, name);
  }

  return (
    <View style={styles.inventoryWrapper}>
      <Image 
        source={{ uri: imageUrl }} 
        style={{ width: 100, height: 100, flex: 3 }} 
      />
      <View style={{ flex: 5 }}>
        <Text style={{ color: '#999999', fontSize: 16, marginBottom: 10, fontFamily: 'Nunito Sans' }}>
          {name}
        </Text>
        <Text style={{ fontFamily: 'Nunito Sans-Bold' }}>
          Stock: {stock}
        </Text>
        <Text style={{ fontFamily: 'Nunito Sans-Bold' }}>
          Value: ₦{amount}
        </Text>
      </View>
      <View style={styles.deleteBtn}>
        <TouchableOpacity onPress={deleteProduct}>
          <AntDesign 
            name="delete" 
            size={16} 
            color="#7e161e" 
            style={{ 
              fontWeight: 'bold'
            }} 
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default InventoryCard

const styles = StyleSheet.create({
  inventoryWrapper: {
    padding: 10, 
    flexDirection: 'row', 
    marginVertical: 10,
    gap: 10,
    borderRadius: 10,
    backgroundColor: '#eee',
    paddingVertical: 20,
  },

  deleteBtn: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1, 
  }
})