import { StyleSheet, View, TextInput } from 'react-native'
import Text from '@kaloraat/react-native-text'
import React from 'react'

const UserInput = ({ 
  name, 
  value, 
  setValue, 
  autoCapitalize='none', 
  keyboardType='default', 
  secureTextEntry=false
}) => {
  return (
    <View>
      <Text small color='#909090'>{name}</Text>
      <TextInput 
        style={styles.textInput}
        value={value}
        onChangeText={text => {
          setValue(text)
        }}
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

export default UserInput

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 0.6,
    borderBottomColor: '#909090',
    height: 40,
    marginBottom: 30
  },
})