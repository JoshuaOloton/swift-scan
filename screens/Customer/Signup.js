import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from "react-native-reanimated";
import Text from "@kaloraat/react-native-text";
import ActionButton from "../../components/Button";
import UserInput from "../../components/UserInput";
import LoginLogo from "../../components/LoginLogo";
import { signup } from "../../services/auth";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../services/config";
import  { storeData } from "../../services/storage";
import { useApp } from '../../context/AppContext';

const Signup = ({ navigation }) => {
  const OFFSET = 4;
  const TIME = 60;
  const REPS = 10;

  const offset = useSharedValue(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  }

  const { setUserRole } = useApp();

  useEffect(() => {
    offset.value = withRepeat(withTiming(offset.value === 0 ? OFFSET : 0, { duration: TIME }), REPS, true);
  }, [errorMsg]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }))

  // User Signup handler function
  const handleSignup = async () => {
    setErrorMsg("");
    // reject form input if any field is empty
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      setErrorMsg("All fields are required");
      return;
    }

    // reject form input if password and confirm password do not match
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const user = await signup(email, password);
      if (user) {
        await storeData('role', 'customer'); // store user role in async storage
        setUserRole('customer') // set user role in context
        await addUsertoFirestore(name, email, password);
        alert("Profile created successfully");
      }
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        setErrorMsg("Email already in use");
      } else if (error.code == "auth/weak-password") {
        setErrorMsg("Password is too weak");
      } else {
        setErrorMsg(`Something went wrong. ${error.message}`);
      }
      setLoading(false);
    }
  };

  // Add User document to Firestore
  const addUsertoFirestore = async (name, email, password) => {
   try {
    const docRef = await addDoc(collection(db, "users"), {
      "name": name,
      "email": email,
      "password": password,
      "date_created": Timestamp.fromDate(new Date()),
      "role": "customer"
    });
   } catch (error) {
    throw error;
   }
  }

  return (
    <View style={styles.container}>
      <LoginLogo />
      <View style={styles.loginTitle}>
        <Text large bold>
          WELCOME
        </Text>
        {errorMsg && <Animated.Text style={[styles.error, {fontFamily: 'Nunito Sans'}, style]}>{errorMsg}</Animated.Text>}
      </View>
      <View>
        <UserInput
          name="Name"
          value={name}
          setValue={setName}
          autoCapitalize="words"
        />
        <UserInput
          name="Email"
          value={email}
          setValue={setEmail}
          keyboardType="email-address"
        />
        <UserInput
          name="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
        />
        <UserInput
          name="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          secureTextEntry={true}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
        />
      </View>
      <ActionButton 
        role="dark"
        clickHandler={handleSignup}
      >
        { !loading ? 
          "SIGN UP" :
          <ActivityIndicator size="large" color="#fff" /> }
      </ActionButton>
      <Text center style={{ marginTop: 10, color: "#909090", borderWidth: 0 }}>
        Already have an account?
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={ styles.buttonText }>SIGN IN</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 50,
  },

  loginTitle: {
    marginVertical: 30,
  },

  button: {
    borderRadius: 4,
    width: 240,
  },
  buttonText: {
    alignSelf: "center",
    fontWeight: "bold",
  },

  error: {
    color: 'red',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 10,
    display: 'inline-block'
  }
});
