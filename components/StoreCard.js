import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Text from '@kaloraat/react-native-text'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


const StoreCard = ({ imageUrl, title, time, distance, rating }) => {
  const navigation = useNavigation();
  const image = require(`../assets/supermarket.png`);
  
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ScanProduct')}>
      <View style={styles.storeWrapper}>
        <View style={styles.storeImage}>
          <Image source={image} />
        </View>
        <View style={styles.storeText}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text bold style={{ fontFamily: 'Nunito Sans-Bold', fontSize: 16 }}>{title}</Text>
            <Text color="#31B9CC" style={{ fontFamily: 'Nanum Pen' }}>
              <Feather name="smile" size={16} color="#31B9CC" /> {rating}%
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text color="#6b6b6b">
              <Feather name="clock" size={16} color="#6b6b6b" /> {time}
            </Text>
            <Text color="#6b6b6b">
              <MaterialCommunityIcons name="truck-delivery-outline" size={16} color="#6b6b6b" /> {distance} miles
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StoreCard;

const styles = StyleSheet.create({
  storeWrapper: { 
    backgroundColor: "#f1f2f6",
    marginVertical: 10,
    borderRadius: 10,
    padding: 10
  },

  storeImage: {},

  storeText: {
    paddingVertical: 10,
    gap: 10
  },
});
