import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import PersonalInfoCard from "../../components/PersonalInfoCard";
import { signout } from "../../services/auth";
import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { db } from "../../services/config";
import { collection, getDocs, query, where } from "firebase/firestore";

const AdminProfile = () => {
  const { currentUser } = useApp();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      const userRef = collection(db, "users");
      const q = query(userRef, where("email", "==", currentUser.email));

      try {
        const querySnapshot = await getDocs(q);
        const q1 = querySnapshot.docs[0].data();
        setUser(q1);
        console.log('user', q1);
      } catch (error) { // Product not found, scan again
        alert("Error fetching user details.");
        setTimeout(() => {
          navigation.navigate("Home");
        }, 1000);
      }
    }
    fetchData();
  }, []);
  
  const logUserOut = async () => {
    try {
      alert('User successfully logged out');
      await signout();
    } catch (error) {
      alert("Error logging out", error.message);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <MaterialIcons
          name="logout" 
          size={24} 
          color="black" 
          style={{ position: "absolute", right: 30 }}
          onPress={logUserOut}
        />
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Merriweather-Bold",
            fontSize: 20,
          }}
        >
          Admin Profile
        </Text>
      </View>
      { user === null ? (
        <View style={{ flex: 1, padding: 30 }}>
          <Text style={{ fontFamily: 'Signika' }}>Loading user details ...</Text>
        </View>
      ) : (
        <View style={styles.profileInfo}>
          <View style={styles.infoHeader}>
            <View style={{ 
              height: 50,
              width: 50, 
              borderRadius: 25,
            }}>
              <Feather
                name="user"
                size={50}
                color="black"
              />
            </View>
            <View>
              <Text style={{ fontSize: 18, fontFamily: 'Nunito Sans-Bold' }}>
                {user.name}
              </Text>
              <Text style={{  color: "#808080", fontFamily: 'Nunito Sans' }}>
                {currentUser.email}
              </Text>
            </View>
          </View>
          <ScrollView style={styles.personalInfo}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18, color: '#808080', fontFamily: 'Nunito Sans' }}>
                Personal Information
              </Text>
              <Entypo 
                name="pencil" 
                size={18} 
                color="#808080" 
              />
            </View>
            <PersonalInfoCard 
              title="Name"
              value={user.name}
            />
            <PersonalInfoCard 
              title="Email"
              value={currentUser.email}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
              <Text style={{ fontSize: 18, color: '#808080', fontFamily: 'Nunito Sans' }}>
                Security Details
              </Text>
              <Entypo 
                name="pencil" 
                size={18} 
                color="#808080" 
              />
            </View>
            <PersonalInfoCard 
              title="Password"
              value="**********"
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default AdminProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 40,
  },

  title: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },

  profileInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },

  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },

  personalInfo: {
    paddingVertical: 20,
    marginTop: 30,
  }
})
