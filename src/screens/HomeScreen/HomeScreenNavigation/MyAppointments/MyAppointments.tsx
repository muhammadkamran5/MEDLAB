import {StyleSheet, View} from 'react-native';
import React from 'react';
import BackIcon from '../../../../../assets/Back.svg';
import {Appbar, Button, Text} from 'react-native-paper';
import SearchBar from '../../../../components/SearchBar';
import AppointmentTabBar from './AppointmentTabBar';
import Spacer from '../../../../components/Spacer';

const MyAppointments = ({navigation}: any) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action
          icon={() => <BackIcon />}
          onPress={() => navigation.goBack()}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <Text variant="headlineMedium">My Appointments</Text>
      </View>
      <SearchBar placeholder="Search" value="" />
      <Spacer height={10} />
      <AppointmentTabBar />
      <View style={styles.newAppointmentButtonParent}>
        <Button
          mode="contained-tonal"
          buttonColor={'#225B6E'}
          textColor="#FFFFFF"
          style={styles.newAppointmentButton}>
          New Appointment
        </Button>
      </View>
    </>
  );
};

export default MyAppointments;

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  newAppointmentButtonParent: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 5,
  },
  newAppointmentButton: {
    borderRadius: 5,
  },
});
