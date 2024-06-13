import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Appbar, Button, Text} from 'react-native-paper';
import BackIcon from '../../../assets/Back.svg';
import styles from './styles';
import DoctorInformationCard from '../../components/DoctorInformationCard';
import Spacer from '../../components/Spacer';
const NotificationDetails = ({navigation}: any) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action
          icon={() => <BackIcon />}
          onPress={() => navigation.goBack()}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <Text variant="titleLarge">HearthBeat Anomoly</Text>
      </View>
      <View style={{paddingHorizontal: 25}}>
        <Text>
          Dear patient, There is a heartbeat anomaly that has been recorded, and
          you should book a visit with a specialist as soon as possible.
        </Text>
      </View>
      <Spacer height={20} />
      <View style={styles.doctorCardWrapper}>
        <DoctorInformationCard
          title={'Dr. Masood Qureshi'}
          occopation={'Cardiologist'}
          location={'Ittefaq Hospital - 3 km'}
        />
        <Spacer height={20} />
        <Button buttonColor='#225B6E' textColor='#FFFFFF' style={styles.button}>Book a Visit</Button>
      </View>

    </>
  );
};

export default NotificationDetails;
