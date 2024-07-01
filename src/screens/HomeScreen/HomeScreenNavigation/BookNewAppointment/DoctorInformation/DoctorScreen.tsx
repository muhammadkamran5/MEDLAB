import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {List} from 'react-native-paper';
import Spacer from '../../../../../components/Spacer';
import Ellipse from '../../../../../../assets/Ellipse.svg';

const DoctorScreen = () => {
  const doctor = useSelector((state: any) => state.doctors);
  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">Education</Text>
      <Spacer height={4} />
      {doctor?.info?.Education &&
        doctor.info.Education.map((education: any, index: number) => {
          return (
            <>
              <View style={{flexDirection: 'row', gap: 5}} key={index + 10}>
                <Ellipse style={{marginTop: 5}} />
                <Text variant="bodyMedium">{education}</Text>
              </View>
              <Spacer height={3} />
            </>
          );
        })}
      <Text variant="headlineSmall">Publications</Text>
      <Spacer height={4} />
      {doctor?.info?.Publications &&
        doctor.info.Publications.map((education: any, index: number) => {
          return (
            <>
              <View style={{flexDirection: 'row', gap: 5}} key={index + 5}>
                <Ellipse style={{marginTop: 5}} />
                <Text variant="bodyMedium">{education}</Text>
              </View>
              <Spacer height={3} />
            </>
          );
        })}
      <Text variant="headlineSmall">Description</Text>
      <Spacer height={4} />
      {doctor?.info?.Description &&
        doctor.info.Description.map((education: any, index: number) => {
          return (
            <>
              <View
                style={{flexDirection: 'row', gap: 5, marginVertical: 5}}
                key={index}>
                <Ellipse style={{marginTop: 5}} />
                <Text variant="bodyMedium">{education}</Text>
              </View>

              <Spacer height={3} />
            </>
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
