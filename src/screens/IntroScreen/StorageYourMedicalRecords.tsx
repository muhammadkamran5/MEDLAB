import { StyleSheet, Text, View , Image } from 'react-native'
import React from 'react'
import { styles } from './FindYourDoctor'
const StorageyourMedicalRecords = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/medlablogo/medlablogo.png')}
        />
        <Image
          source={require('../../../assets/Header(1)/Header.png')}
        />
      </View>
      <Image
        source={require('../../../assets/Group20/Group20.png')}
      />
    </View>
  )
}

export default StorageyourMedicalRecords

