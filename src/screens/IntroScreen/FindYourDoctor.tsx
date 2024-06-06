import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 114,
  },
  header: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
  },
});
export {styles};
