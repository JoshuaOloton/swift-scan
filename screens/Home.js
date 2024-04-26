import { StyleSheet, View, FlatList } from "react-native";
import Text from "@kaloraat/react-native-text";
import { db } from "../services/config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import StoreCard from "../components/StoreCard";

const Home = () => {
  const [viewStores, setViewStores] = useState([]);
  const [filterStores, setFilterStores] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      const stores = await getDocs(collection(db, "supermarkets"));
      setViewStores(stores.docs);
      setFilterStores(stores.docs);
      stores.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
      });
    };
    fetchStores();
  }, []);

  // useEffect(() => {
  //   console.log('View Stores ==>', viewStores);
  // },[viewStores]);

  useEffect(() => {
    const filteredStores = viewStores.filter(store => store.data().name.includes(searchTerm.trim()))
    setFilterStores(filteredStores)
  }, [viewStores, searchTerm]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.nearMe}>
        <Text color="#fff" style={{ fontFamily: "Merriweather", fontSize: 38 }}>
          Near me
        </Text>
        <Text color="#fff">Choose From Nearby Supermarkets</Text>
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </View>
      <View style={styles.storesGallery}>
        {/* { viewStores ? (
          viewStores.filter(store => store.data().name.includes(searchTerm)).map((store) => (
            <StoreCard 
              key={store.id}
              imageUrl={store.data().image_url}
              title={store.data().name}
              time={store.data().time}
              distance={store.data().distance}
              rating={store.data().rating}
            />
          ))
        ) : (
          <Text>Loading...</Text>
        )} */}
        { filterStores.length === 0 && <Text style={{ fontFamily: "Nunito Sans", marginTop: 20 }}>No stores found</Text>}
        <FlatList
          data={filterStores}
          renderItem={({item}) => (
            <StoreCard 
              key={item.id}
              imageUrl={item.data().image_url}
              title={item.data().name}
              time={item.data().time}
              distance={item.data().distance}
              rating={item.data().rating}
            />
          )}
          keyExtractor={item => item.id} 
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  nearMe: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#8f9698",
    paddingHorizontal: 40,
    position: "relative",
    width: "100%",
  },

  storesGallery: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    zIndex: -1,
    marginTop: 40
  },
});
