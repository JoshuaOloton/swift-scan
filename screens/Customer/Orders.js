import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import SearchBox from "../../components/SearchBox";

const Orders = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");

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
          Orders
        </Text>
      </View>
      <View style={styles.orders}>
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search by Order No.."
          overlap={false}
        />
        { searchTerm && (
          <View style={styles.orderContent}>
            <Text style={{ fontSize: 15, fontFamily: 'Gelasio' }}>Searched for: </Text>
            <Text style={{ fontSize: 15, fontStyle: 'italic' }}>#{searchTerm}</Text>
          </View>
        ) }
      </View>
    </View>
  );
};

export default Orders;

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
  
  orders: {
      flex: 1,
      // justifyContent: "center",
      paddingVertical: 15,
  },
  
  orderContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  }
});
