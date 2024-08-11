import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native'
import ActionButton from "../../components/Button";
import { AntDesign, Feather } from '@expo/vector-icons';
import React from 'react'

const ScanSuccess = ({ navigation }) => {
  const image = require('../../assets/shopping-cart.png')
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={{ fontSize: 30, fontFamily: "Merriweather" }}>SUCCESS !</Text>
        <Feather
          name="shopping-cart"
          size={120}
          color="black"
        />
        <AntDesign 
          name="checkcircle" 
          size={50} 
          color="#27ad62" 
        />
        <Text style={{ color: '#606060', textAlign: 'center' }}>Your product has been added to the inventory.</Text>
      </View>
      <ActionButton role="dark" clickHandler={() => navigation.navigate('Inventory')}>
        View Inventory
      </ActionButton>
      <ActionButton
        role="switch-form"
        clickHandler={() => navigation.navigate("AdminScan")}
      >
        SCAN ANOTHER PRODUCT
      </ActionButton>
    </View>
  )
}

export default ScanSuccess

const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent: 'center',
    marginTop: 40,
    paddingHorizontal: 40,
  },

  wrapper: {
    marginBottom: 30,
    alignItems: 'center',
    gap: 30,
  }
})