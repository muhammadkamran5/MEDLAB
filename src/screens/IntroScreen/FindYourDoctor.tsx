import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styles from './styles';
const FindyourDoctor = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../../assets/medlablogo/medlablogo.png')} />
        <Image source={require('../../../assets/Header/Header.png')} />
      </View>
      <Image
        source={require('../../../assets/undraw_medicine_b1ol/undraw_medicine_b1ol.png')}
      />
    </View>
  );
};

export default FindyourDoctor;


