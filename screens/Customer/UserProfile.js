import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { signout } from "../../services/auth";
import { useState, useEffect } from "react";
import { getData } from "../../services/storage";
import { useApp } from "../../context/AppContext";


const UserProfile = () => {
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
      console.log('Error =>', error);
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
          <Text style={{ fontSize: 20, fontFamily: 'Gelasio' }}>Welcome</Text>
          <Text>{currentUser.email}</Text>
        </View>
      </View>
    </View>
  )
}

export default UserProfile

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
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
})