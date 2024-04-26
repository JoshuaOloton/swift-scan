import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';

const LoginLogo = () => {
  const logo = require('../assets/login-cart.png')
  return (
    <View style={styles.wrapper}>
      <View style={styles.line}></View>
      <View style={styles.logoWrapper}>
        {/* <Image source={logo} /> */}
        <Feather name="shopping-cart" size={24} color="#909090" />
      </View>
      <View style={styles.line}></View>
    </View>
  )
}

export default LoginLogo

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    height: 65,
    width: 65,
    alignSelf: 'center',
    borderRadius: 35,
    borderWidth: 1.5,
    borderColor: '#909090'
  },

  line: {
    height: 1,
    borderWidth: 0.5,
    borderColor: '#909090',
    flex: 1
  }
})