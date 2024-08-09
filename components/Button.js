import { StyleSheet, TouchableOpacity } from 'react-native'
import Text from '@kaloraat/react-native-text'
import React from 'react'

const Button = ({ children, role, clickHandler }) => {
  return (
    <TouchableOpacity 
      onPress={clickHandler}
      style={[
        styles.btnWrapper,
        {
            backgroundColor: role === 'dark' || role === 'dark' ? '#242424' : '#fff',
            paddingHorizontal: role === 'dark' ? 25 : 'auto',
        }
    ]}>
      <Text center style={{color: role === 'dark' || role === 'dark' ? '#fff' : '#242424' }}>{children}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  btnWrapper: {
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#000'
  }
})