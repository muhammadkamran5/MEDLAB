import { StyleSheet, Text, View , Image } from 'react-native'
import React from 'react'
import { styles } from './FindYourDoctor'
const DiscussInTheCommunity = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/medlablogo/medlablogo.png')}
        />
        <Image
          source={require('../../../assets/Header(2)/Header.png')}
        />
      </View>
      <Image
        source={require('../../../assets/Group14/Group14.png')}
      />
    </View>
  )
}

export default DiscussInTheCommunity
