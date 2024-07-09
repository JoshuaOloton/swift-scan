import { StyleSheet, View, ActivityIndicator, TouchableOpacity } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from "react-native-reanimated";
import Text from "@kaloraat/react-native-text";
import { useState, useEffect } from "react";
import LoginLogo from "../../components/LoginLogo";
import UserInput from "../../components/UserInput";
import Button from "../../components/Button";
import { login } from "../../services/auth";
import { useApp } from '../../context/AppContext';
import  { storeData } from "../../services/storage";

const Login = ({ navigation }) => {
  const OFFSET = 4;
  const TIME = 60;
  const REPS = 10;

  const offset = useSharedValue(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { userRole, setUserRole } = useApp();

  useEffect(() => {
    offset.value = withRepeat(withTiming(offset.value === 0 ? OFFSET : 0, { duration: TIME }), REPS, true);
  }, [errorMsg]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const handleSubmit = async () => {
    try {
      setErrorMsg("");
      setLoading(true);
      const user = await login(email, password.trim(), "customer");
      console.log(user);
      if (user) {
        alert("Login successful");
        await storeData('role', 'customer'); // store user role in async storage
        setUserRole('customer') // set user role in context
      }
    } catch (error) {
      console.log("error");
      console.log(error);
      console.log(error.code);
      console.log(error.message);
      if (error.code == "auth/user-not-found") {
        setErrorMsg("User not found. Please sign up");
      } else if (error.code == "auth/wrong-password") {
        setErrorMsg("Please check your password");
      } else if (error.code == "auth/invalid-credential") {
        setErrorMsg("Invalid email or password");
      } else {
        setErrorMsg(`Something went wrong. ${error.message}`);
      }
      setLoading(false);
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
        {errorMsg && <Animated.Text style={[styles.error, {fontFamily: 'Nunito Sans'}, style]}>{errorMsg}</Animated.Text>}
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
          />
      </View>
      <Button role="submit-form" clickHandler={handleSubmit}>
        {!loading ? "Log in" : <ActivityIndicator size="small" color="#fff" />}
      </Button>
      <Button
        role="switch-form"
        clickHandler={() => navigation.navigate("Signup")}
      >
        SIGN UP
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate("AdminLogin")}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Admin? Click here to login</Text>
      </TouchableOpacity>
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
    marginVertical: 20,
  },

  error: {
    color: 'red',
    fontSize: 13,
    // fontStyle: 'italic',
    marginTop: 10
  }
});
