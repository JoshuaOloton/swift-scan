import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PersonalInfoCard = ({ title, value }) => {
  return (
    <View style={styles.infoWrapper}>
      <Text style={{ color: '#808080', fontSize: 12, fontFamily: 'Nunito Sans' }}>{title}</Text>
      <Text style={{ fontFamily: 'Nunito Sans-Bold' }}>{value}</Text>
    </View>
  )
}

export default PersonalInfoCard

const styles = StyleSheet.create({
  infoWrapper: {
    marginVertical: 10,
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#fefefe',
    backgroundColor: '#fff',
    gap: 10,
  }
})