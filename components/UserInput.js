import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import Text from "@kaloraat/react-native-text";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

const UserInput = ({
  name,
  value,
  setValue,
  autoCapitalize = "none",
  keyboardType = "default",
  inputMode = "text",
  multiline=false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  }

  return (
    <View>
      <Text small color="#909090">
        {name}
      </Text>
      {name === "Password" ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 0.6,
            borderBottomColor: "#909090",
            marginBottom: 25
          }}
        >
          <TextInput
            style={[styles.textInput, { flex: 1 }]}
            value={value}
            onChangeText={(text) => {
              setValue(text);
            }}
            autoCorrect={false}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            secureTextEntry={!showPassword}
            inputMode={inputMode}
          />
          <TouchableOpacity onPress={toggleShowPassword}>
            {showPassword ? (
              <Feather name="eye" size={16} color="#4c4c4c" />
            ) : (
              <Feather name="eye-off" size={16} color="#4c4c4c" />
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <TextInput
          style={[
            styles.textInput,
            {
              borderBottomWidth: 0.6,
              borderBottomColor: "#909090",
              marginBottom: 25,
            },
          ]}
          value={value}
          onChangeText={(text) => {
            setValue(text);
          }}
          autoCorrect={false}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          inputMode={inputMode}
          multiline={multiline}
        />
      )}
    </View>
  );
};

export default UserInput;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
  },
});
