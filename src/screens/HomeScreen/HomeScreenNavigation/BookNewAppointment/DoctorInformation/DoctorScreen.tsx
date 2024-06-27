import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const DoctorScreen = () => {
  const doctor = useSelector((state: any) => state.doctors);

  return (
    <View style={styles.container}>
      <Text>{doctor?.Bio}</Text>
    </View>
  );
};

export default DoctorScreen;

const styles = StyleSheet.create({
  container:{
    marginHorizontal : 40
  }
});
