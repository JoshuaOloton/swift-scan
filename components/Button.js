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
            backgroundColor: role === 'submit-form' || role === 'get-started' ? '#242424' : '#fff',
            paddingHorizontal: role === 'get-started' ? 25 : 'auto',
        }
    ]}>
      <Text center style={{color: role === 'submit-form' || role === 'get-started' ? '#fff' : '#242424'}}>{children}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  btnWrapper: {
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    marginVertical: 10,
  }
})