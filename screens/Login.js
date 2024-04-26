import { StyleSheet, View, ActivityIndicator } from "react-native";
import Text from "@kaloraat/react-native-text";
import React, { useState } from "react";
import LoginLogo from "../components/LoginLogo";
import UserInput from "../components/UserInput";
import Button from "../components/Button";
import { login } from "../services/auth";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [curentUser, setCurentUser] = useState();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const user = await login(email, password);
      console.log(user);
      if (user) {
        setCurentUser(user);
        alert("Login successful");

        setTimeout(() => {
          navigation.navigate("Home");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      if (
        error.code == "auth/user-not-found" ||
        error.code == "auth/wrong-password" ||
        error.code == "auth/invalid-credential"
      ) {
        setErrorMsg("Invalid email or password");
      } else {
        setErrorMsg(`Something went wrong. ${error.message}`);
      }
      setLoading(false);
      alert(errorMsg);
    }
  };

  return (
    <View style={styles.container}>
      <LoginLogo />
      <View style={styles.loginTitle}>
        <Text large color="#909090">
          Hello !
        </Text>
        <Text large bold>
          WELCOME BACK
        </Text>
      </View>
      <View>
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
      </View>
      <Button
        role="submit-form" 
        clickHandler={handleSubmit}
      >
        { !loading ? "Log in" :  <ActivityIndicator size="small" color="#fff" />}
      </Button>
      <Button
        role="switch-form"
        clickHandler={() => navigation.navigate("Signup")}
      >
        SIGN UP
      </Button>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 50,
  },

  loginTitle: {
    marginVertical: 30,
  },
});
