import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import Text from "@kaloraat/react-native-text";
import Button from "../components/Button";
import UserInput from "../components/UserInput";
import LoginLogo from "../components/LoginLogo";
import { signup } from "../services/auth";

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [curentUser, setCurentUser] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    console.log("Handle submit");
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      setErrorMsg("All fields are required");
      alert(errorMsg);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      alert(errorMsg);
      return;
    }

    setLoading(true);
    try {
      const user = await signup(email, password);
      if (user) {
        setCurentUser(user);
        alert("Profile created successfully");

        setTimeout(() => {
          navigation.navigate("Login");
        }, 1000);
      }
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        setErrorMsg("Email already in use");
      } else if (error.code == "auth/weak-password") {
        setErrorMsg("Password is too weak");
      } else {
        setErrorMsg(`Something went wrong. ${error.message}`);
      }
      alert(errorMsg);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LoginLogo />
      <View style={styles.loginTitle}>
        <Text large bold>
          WELCOME
        </Text>
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
        />
        <UserInput
          name="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          secureTextEntry={true}
        />
      </View>
      <Button 
        role="submit-form"
        clickHandler={handleSubmit}
      >
        { !loading ? 
          "SIGN UP" :
          <ActivityIndicator size="large" color="#fff" /> }
      </Button>
      <Text center style={{ marginTop: 10, color: "#909090", borderWidth: 0 }}>
        Aleady have an account?
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>SIGN IN</Text>
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
    // height: 100,
    // backgroundColor: "#FFF",
    // marginBottom: 12,
  },
  buttonText: {
    alignSelf: "center",
    // fontSize: 24,
    // color: "#fff",
    fontWeight: "bold",
  },
});
