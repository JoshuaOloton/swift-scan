import { StyleSheet, Text, View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";

const SearchBox = ({ searchTerm, setSearchTerm, placeholder, overlap }) => {
  const searchWrapper = overlap
    ? {
        position: "absolute",
        bottom: -25,
        left: 0,
        right: 0,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
      }
      : {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
      };

  return (
    <View style={searchWrapper}>
      <View style={[styles.searchBox, styles.shadowProp]}>
        <Feather name="search" size={24} color="#8A8A8A" />
        {/* <Text style={{ fontFamily: 'Nunito Sans-Bold', fontSize: 13, color: '#8A8A8A', borderWidth: 1, borderColor: '#000' }}>Search for any supermarket..</Text> */}
        <TextInput
          style={{
            fontFamily: "Nunito Sans-Bold",
            fontSize: 13,
            color: "#8A8A8A",
            flex: 1,
          }}
          value={searchTerm}
          placeholder={placeholder}
          onChangeText={(text) => {
            setSearchTerm(text);
          }}
          autoCorrect={false}
        />
      </View>
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  searchBox: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
    width: "80%",
    // boxShadow: "0px 4px 4px red",
  },
  
  shadowProp: {
    shadowColor: '#e91e63',

    // IOS
    shadowOffset: {width: 3, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,

    // Android
    elevation:5  ,
  },
});
