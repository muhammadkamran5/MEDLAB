import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import BackIcon from '../../../../../assets/Back.svg';
import {Appbar, IconButton, Text, Button, Divider} from 'react-native-paper';
import Spacer from '../../../../components/Spacer';
import KInput from '../../../../components/KInput';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {updateUser} from '../../../../redux/reducers/userReducer';
import { LogBox } from 'react-native';

const updateAppointmentStatusData = (userData: any, date: any, time: any) => {
  // Make a copy of the availability array to avoid mutating the original userData
  const updatedAvailability = [...userData.availability];

  // Update the first item in the availability array
  if (updatedAvailability.length > 0) {
    updatedAvailability[0].dates = updatedAvailability[0].dates.map(
      (item: any) => {
        if (item && item.date === date && item.time_slots) {
          return {
            ...item,
            time_slots: item.time_slots.map((slot: any) => {
              if (slot.time === time) {
                return {...slot, status: 'Confirmed'};
              }
              return slot;
            }),
          };
        }
        return item;
      },
    );
  }

  // Return the updated availability array
  return updatedAvailability;
};

const getTimes = (date: any, dates: any) => {
  console.log(dates);
  const times = dates.find((item: any) => item.date === date);
  // return times
  return times?.time_slots?.map((item: any) => item?.time);
};

const ConfirmAppointment = ({route, navigation}: any) => {
  const {time, date, doctorID} = route.params;
  const doctor = useSelector((state: any) => state.doctors);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const currentUser = auth().currentUser;
  const [note, setNote] = useState('');
  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedTime, setSelectedTime] = useState(time);
  const [selectedDateOption, setSelectedDateOption] = useState(null);
  const [selectedTimeOption, setSelectedTimeOption] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [isOpenTime, setIsOpenTime] = useState(false);
  const times = getTimes(date, doctor.availability[0].dates);

  const [timeOptions, setTimeOptions] = useState(
    times ? times.map((item: any) => ({label: item, value: item})) : [],
  );
  const [dateOptions, setDateOptions] = useState(
    doctor.availability[0].dates.map((item: any) => ({
      label: item.date,
      value: item.date,
    })),
  );
useEffect(()=>{
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])
  useEffect(() => {
    console.log(dateOptions);
    const times = getTimes(selectedDateOption, doctor.availability[0].dates);
    times &&
      setTimeOptions(times.map((item: any) => ({label: item, value: item})));
    console.log(timeOptions);
  }, [selectedDateOption]);

  const handleApply = () => {
    // Handle applying the selected date and time
    setSelectedDate(selectedDateOption);
    setSelectedTime(selectedTimeOption);
    // Handle selectedTimeOption as needed
    setIsModalVisible(false); // Close the modal after applying
  };

  const handleCancel = () => {
    // Handle canceling selection
    setIsModalVisible(false); // Close the modal
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handlePayment = async () => {
    try {
      await firestore().collection('appointments').add({
        doctor_id: doctorID,
        note: note,
        patient_id: currentUser?.uid,
        status: 'Confirmed',
        time: selectedTime,
        date: selectedDate,
      });
      const userData = (
        await firestore().collection('users').doc(doctor.uid).get()
      ).data();
      console.log(userData);
      console.log(
        updateAppointmentStatusData(userData, selectedDate, selectedTime),
      );
      const updateData = {
        availability: updateAppointmentStatusData(
          userData,
          selectedDate,
          selectedTime,
        ),
      };
      dispatch(updateUser({userData: updateData, userID: doctor.uid}));
      ToastAndroid.show('Appointment added successfully', ToastAndroid.SHORT);
      navigation.navigate('AppointmentConfirmAlert');
    } catch (error) {
      console.error('Error adding appointment: ', error);
    }
  };

  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.Action
          icon={() => <BackIcon />}
          onPress={() => navigation.goBack()}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <Text variant="bodyLarge" style={styles.headingText}>
          {doctor?.fullName}
        </Text>

        <Spacer height={7} />

        <Pressable style={styles.dateCard} onPress={toggleModal}>
          <Text variant="displaySmall">
            {selectedDate} {selectedTime}
          </Text>
        </Pressable>

        <Spacer height={7} />
        <View style={{flex: 0.5, flexDirection: 'row', gap: 10}}>
          <View style={{width: '50%'}}>
            <DropDownPicker
              items={dateOptions}
              containerStyle={{height: 40}}
              style={{backgroundColor: '#fafafa'}}
              setItems={setDateOptions}
              value={selectedDateOption}
              setValue={(value : any)=> {
                setSelectedDateOption(value)
                setSelectedDate(value)
              }}
              open={isOpenDate}
              setOpen={setIsOpenDate}
            />
          </View>

          <View style={{width: '50%'}}>
            <DropDownPicker
              items={timeOptions}
              containerStyle={{height: 40}}
              style={{backgroundColor: '#fafafa'}}
              setItems={setTimeOptions}
              value={selectedTimeOption}
              setValue={(value : any)=> {
                setSelectedTimeOption(value)
                setSelectedTime(value)
              }}
              open={isOpenTime}
              setOpen={setIsOpenTime}
            />
          </View>
        </View>
        <Spacer height={10} />
        <View style={styles.locationContainer}>
          <IconButton icon={'map-marker'} />
          <Text>{doctor?.address}</Text>
        </View>

        <Spacer height={5} />
        <Divider />

        <Spacer height={10} />
        <KInput placeholder="Message" value={note} onChangeText={setNote} />
        <Spacer height={7} />
        <KInput placeholder="Reason of the Visit" />
        <Spacer height={7} />
        <Text variant="headlineMedium">Consultation {'\n'}PKR 3000</Text>
        <Spacer height={7} />
        <Text variant="headlineSmall" style={{color: '#225B6E'}}>
          Select the card
        </Text>
        <Spacer height={7} />
        <FlatList
          horizontal
          data={[
            {image: require('./Card1.png')},
            {image: require('./Card2.png')},
          ]}
          renderItem={({item}) => (
            <View>
              <Image
                source={item.image}
                style={{
                  borderRadius: 10,
                  marginRight: 10,
                }}
              />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />

        <Pressable>
          <Text variant="bodyLarge">Manage Cards {'>'}</Text>
        </Pressable>
        <Spacer height={7} />

        <ButtonPrimary style={styles.payButton} onPress={handlePayment}>
          Pay now
        </ButtonPrimary>
       
      </View>
    </ScrollView>
  );
};

export default ConfirmAppointment;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  headingText: {
    fontSize: 18,
    marginTop: 10,
  },
  dateCard: {
    padding: 10,
    backgroundColor: '#fff',
    alignSelf: 'baseline',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  payButton: {
    alignSelf: 'center',
    width: '50%',
    marginBottom: 20,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
