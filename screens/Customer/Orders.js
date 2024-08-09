import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import SearchBox from "../../components/SearchBox";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/config";
import OrderCard from "../../components/OrderCard";
import { useApp } from "../../context/AppContext";

const Orders = ({ navigation }) => {
  const { currentUser } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [viewOrders, setViewOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await getDocs(collection(db, "orders"));
      const orderRef = collection(db, "orders");
      const q = query(orderRef, where("email", "==", currentUser.email));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.docs.forEach(doc => {
        });
        // const q1 = querySnapshot.docs[0].data();
        // setProduct(q1);
        // setTotalPrice(q1.price);

        setViewOrders(querySnapshot.docs);
        setFilteredOrders(querySnapshot.docs);

        querySnapshot.forEach((doc) => {
          // console.log(doc.id, "=>", doc.data());
        });

      } catch (error) { // Product not found, scan again
        alert("Error fetching orders");
        console.error(error);
        setTimeout(() => {
          navigation.navigate("Stores");
        }, 1000);
      }
    };

    fetchOrders();
  }, []);

  // useEffect(() => {
  //   console.log('viewOrders', viewOrders);

  //   const filterOrders = viewOrders.filter((order) =>
  //     order.data().name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  //   );
  //   setFilteredOrders(filterOrders);
  // }, [viewOrders, searchTerm]);

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
        <View style={styles.orderContent}>
          {viewOrders.length === 0 && (
            <Text style={{ fontFamily: "Nunito Sans", marginTop: 20 }}>
              Please wait...
            </Text>
          )}
          <FlatList
            data={viewOrders}
            renderItem={({ item }) => (
              <OrderCard
                key={item.id}
                orderNo={item.data()['transaction ID']}
                date={item.data().date_ordered}
                amount={item.data()['total_cost']}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
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
    paddingHorizontal: 40,
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
      borderWidth: 1,
      borderColor: "#fff",
  },
  
  orderContent: {
    flex: 1,
    paddingVertical: 15,
    // borderWidth: 1,
    // borderColor: "#000",
  }
});
