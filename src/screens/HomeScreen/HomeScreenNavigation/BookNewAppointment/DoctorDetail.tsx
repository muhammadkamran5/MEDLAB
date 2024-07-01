import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import {Appbar, Button, Text} from 'react-native-paper';
import React, {useEffect} from 'react';
import BackIcon from '../.../../../../../../assets/Back.svg';
import DoctorInformationCard from '../../../../components/DoctorInformationCard';
import Spacer from '../../../../components/Spacer';
import ScheduleComponent from '../../../../components/ScheduleCard';
import slotsData from './slotsData.json';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import DoctorDetailTabBar from './DoctorDetailTabBar';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDoctorByID} from '../../../../redux/reducers/doctorReducer';

const ConfirmBookAppointment = ({route, navigation}: any) => {
  const id = route.params;
  const doctor = useSelector((state: any) => state.doctors);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  console.log(doctor?.availability && doctor?.availability[0]);

  useEffect(() => {
    dispatch(fetchDoctorByID(id));
  }, []);

  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.Action
          icon={() => <BackIcon />}
          onPress={() => navigation.goBack()}
        />
      </Appbar.Header>
      <View style={styles.doctorDetail}>
        <DoctorInformationCard
          title={doctor?.fullName}
          occopation={doctor?.specialties}
          location={doctor?.address}
          ratingCount={20}
        />
        <Spacer height={7} />
        <Button onPress={() => navigation.navigate('GiveFeedBack')} style={{alignSelf: 'flex-start'}} textColor='#225B6E'>
          Give FeedBack
        </Button>
        <Spacer height={7} />
        <FlatList
          horizontal
          data={doctor?.availability && doctor?.availability[0]?.dates}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <ScheduleComponent
              date={item.date}
              times={item.time_slots}
              slots={item.time_slots.length}
              navigation={navigation}
              extra={doctor.uid}
            />
          )}
        />

        <Spacer height={7} />
        <ButtonPrimary
          style={{alignSelf: 'center'}}
          onPress={() =>
            navigation.navigate('ConfirmAppointment', {
              time: '',
              date: '',
              doctorID: doctor.uid,
            })
          }>
          Book Appointment
        </ButtonPrimary>

        <Spacer height={7} />
      </View>
      <DoctorDetailTabBar />
    </ScrollView>
  );
};

export default ConfirmBookAppointment;

const styles = StyleSheet.create({
  doctorDetail: {
    margin: 20,
  },
});
