import {FlatList, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import React from 'react';
import BackIcon from '../.../../../../../../assets/Back.svg';
import DoctorInformationCard from '../../../../components/DoctorInformationCard';
import Spacer from '../../../../components/Spacer';
import ScheduleComponent from '../../../../components/ScheduleCard';
import slotsData from './slotsData.json';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import DoctorDetailTabBar from './DoctorDetailTabBar';

const ConfirmBookAppointment = ({navigation}: any) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action
          icon={() => <BackIcon />}
          onPress={() => navigation.goBack()}
        />
      </Appbar.Header>
      <View style={styles.doctorDetail}>
        <DoctorInformationCard
          title="Dr. Abeera Mansoor"
          occopation="Nephrologist"
          location="DHMC - 7 km"
          ratingCount={20}
        />
        <Spacer height={7} />
        <FlatList
          horizontal
          data={slotsData}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <ScheduleComponent date={item.date} times={item.times} />
          )}
        />

        <Spacer height={7} />
        <ButtonPrimary
          style={{alignSelf: 'center'}}
          onPress={() => navigation.navigate('ConfirmAppointment')}>
          Book Appointment
        </ButtonPrimary>

        <Spacer height={7} />
      </View>
      <DoctorDetailTabBar />
    </>
  );
};

export default ConfirmBookAppointment;

const styles = StyleSheet.create({
  doctorDetail: {
    margin: 20,
  },
});
