import {FlatList, StyleSheet, ToastAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Divider,
  IconButton,
  List,
  Text,
  TextInput,
} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Spacer from '../../../../components/Spacer';
import ButtonSecondary from '../../../../components/ButtonSecondary';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {dateObjectToString, timeStampToTime} from '../../../../Utils/dateTime';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {updateUser} from '../../../../redux/reducers/userReducer';

const DAppointments = ({route, navigation}: any) => {
  const {clinic_id} = route.params;
  const user = useSelector((state: any) => state.user.currentUser);

  const [date, setDate] = useState(new Date());
  const [clinic, setClinic]: any = useState([]);
  const [times, setTimes]: any = useState([]);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const getClinicName = async (clinic_id: any) => {};
  useEffect(() => {
    const fetchClinic = async () => {
      const clinic = (
        await firestore().collection('clinic').doc(clinic_id).get()
      ).data();
      setClinic(clinic?.name);
    };
    fetchClinic();
  });

  const submitAppointments = async () => {
    const appointmentData = {
      date: date,
      times: times,
      clinic_id: clinic_id,
    };
    try {
      const userRef = firestore().collection('users').doc(user?.uid);
      const existingAppointmentQuery = userRef
        .collection('available_slots')
        .where('clinic_id', '==', clinic_id)
        .where('date', '==', appointmentData.date);

      const existingAppointments = await existingAppointmentQuery.get();

      if (!existingAppointments.empty) {
        const existingDocId = existingAppointments.docs[0].id;
        await userRef
          .collection('available_slots')
          .doc(existingDocId)
          .update(appointmentData);
        ToastAndroid.show(
          'Time Slot updated successfully!',
          ToastAndroid.SHORT,
        );
      } else {
        // Add new appointment
        await userRef.collection('available_slots').add(appointmentData);
        ToastAndroid.show('Time Slot added successfully!', ToastAndroid.SHORT);
      }
      ToastAndroid.show('Time Slot added successfully!', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error adding/updating appointment:', error);
    }
  };

  const pickDate = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (event, selectedDate) => {
        const currentDate: any = selectedDate;
        setDate(currentDate);
      },
      mode: 'date',
    });
  };

  const pickTime = () => {
    DateTimePickerAndroid.open({
      value: selectedTime,
      onChange: (event, selectedDate) => {
        const currentDate: any = selectedDate?.getTime();
        setTimes([...times, currentDate]);
      },
      mode: 'time',
      is24Hour: false,
    });
  };

  const handleDeleteTime = (t: any) => {
    const tempTimes = times.filter((time: any) => time !== t);
    setTimes(tempTimes);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={{alignSelf: 'center'}}>
        {clinic}
      </Text>
      <Spacer height={20} />
      <TextInput
        left={<TextInput.Icon icon="calendar" onPress={pickDate} />}
        value={dateObjectToString(date)}
        style={{backgroundColor: 'white'}}
        underlineStyle={{borderBottomWidth: 0}}
        editable={false}
      />
      <Spacer height={7} />
      <Button
        onPress={() => pickTime()}
        icon={'clock'}
        mode="contained"
        style={{backgroundColor: '#008080', borderRadius: 5}}>
        Pick Time
      </Button>

      <Spacer height={10} />
      <View>
        <FlatList
          data={times}
          ItemSeparatorComponent={() => <Divider bold />}
          renderItem={({item}) => (
            <>
              <List.Item
                title={timeStampToTime(item)}
                right={() => (
                  <IconButton
                    icon={'delete'}
                    style={styles.delete_button}
                    iconColor="red"
                    onPress={() => handleDeleteTime(item.time)}
                  />
                )}
              />
              <Divider />
            </>
          )}
        />
      </View>
      <Spacer height={5} />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <ButtonPrimary onPress={submitAppointments}>Confirm</ButtonPrimary>
        <ButtonSecondary>Cancel</ButtonSecondary>
      </View>
    </View>
  );
};

export default DAppointments;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    justifyContent: 'center',
    flex: 1,
  },
  delete_button: {
    position: 'relative',
    right: -20,
  },
});
