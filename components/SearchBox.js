import { StyleSheet, Text, View, TextInput } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

const SearchBox = ({ searchTerm, setSearchTerm }) => {
  return (

    <View style={styles.searchWrapper}>
      <View style={styles.searchBox}>
        <Feather name="search" size={24} color="#8A8A8A" />
        {/* <Text style={{ fontFamily: 'Nunito Sans-Bold', fontSize: 13, color: '#8A8A8A', borderWidth: 1, borderColor: '#000' }}>Search for any supermarket..</Text> */}
        <TextInput 
          style={{ fontFamily: 'Nunito Sans-Bold', fontSize: 13, color: '#8A8A8A', flex: 1 }}
          value={searchTerm}
          placeholder="Search for any supermarket..."
          onChangeText={text => {
            setSearchTerm(text)
          }}
          autoCorrect={false}
        />
      </View>
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  searchWrapper: {
    position: 'absolute',
    bottom: -25,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  searchBox: {
    // left: '50%',
    // transform: 'translateX(-50%)',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    width: '80%',
    // borderWidth: 1,
    // borderColor: '#000'
  },
});
