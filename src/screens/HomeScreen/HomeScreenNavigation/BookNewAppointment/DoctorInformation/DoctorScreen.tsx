import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {List} from 'react-native-paper';

const DoctorScreen = () => {
  const doctor = useSelector((state: any) => state.doctors);
  console.log(doctor.info);
  return (
    <View style={styles.container}>
      {doctor?.info &&
        doctor?.info.map((item: any, index: number) => {
          return (
            <List.Item
              title={item}
              left={() => <List.Icon icon="circle-outline" />}
            />
          );
        })}
    </View>
  );
};

export default DoctorScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
  },
});
