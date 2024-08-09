import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { signout } from "../../services/auth";
import { useState, useEffect } from "react";
import { getData } from "../../services/storage";
import { useApp } from "../../context/AppContext";

const AdminProfile = () => {
  const { currentUser } = useApp();
  const [stateRole, setStateRole] = useState();
  const [storedRole, setStoredRole] = useState();

  const { userRole } = useApp();

  useEffect(() => {
    const fetchData = async () => {
      if (!stateRole) {
        const role = getData("role");
        setStateRole(role);
      }
      if (!storedRole) {
        const role2 = getData("role");
        setStoredRole(role2);
      }
    }
    fetchData();
  });
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
          Profile
        </Text>
      </View>
      <View style={styles.profileInfo}>
        <View style={styles.infoHeader}>
        <Feather name="user" size={24} color="black" />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{currentUser.email}</Text>
        </View>
      </View>
    </View>
  );
};

export default AdminProfile;

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
  },

  profileInfo: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#000",
  },

  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#000",
  }
});
