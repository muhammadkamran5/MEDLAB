import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Divider, List, Text, TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Spacer from '../../../../components/Spacer';
import ButtonSecondary from '../../../../components/ButtonSecondary';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { dateObjectToString, timeStampToTime } from '../../../../Utils/dateTime';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { updateUser } from '../../../../redux/reducers/userReducer';

const DAppointments = ({ navigation }: any) => {
  const user = useSelector((state: any) => state.user.currentUser);

  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] : any = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [times, setTimes]: any = useState([]);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    if (user && Array.isArray(user.clinic_id)) {
      const fetchClinics = async () => {
        const clinicPromises = user.clinic_id.map((id: any) =>
          firestore().collection('clinic').doc(id).get(),
        );
        const clinicsSnapShot = await Promise.all(clinicPromises);
        const clinicData: any = clinicsSnapShot.map(doc => ({
          label: doc.data().name,
          value: doc.id,
        }));
        setClinics(clinicData);
      };
      fetchClinics();
    }
  }, [user]);

  const submitAppointments = async () => {
    const userRef = firestore().collection('users').doc(user.id);
    const clinicRef = userRef.collection('clinics').doc(selectedClinic);
    const dateString = dateObjectToString(date);

    try {
      const clinicDoc = await clinicRef.get();
      if (clinicDoc.exists) {
        // Clinic document exists, update the relevant date and timeslots
        const availabilityRef = clinicRef.collection('availability').doc(dateString);
        const availabilityDoc = await availabilityRef.get();

        if (availabilityDoc.exists) {
          const existingTimeSlots = availabilityDoc?.data()?.time_slots || [];
          const newTimeSlots = times.map((time: any) => ({
            time: time,
            isAvailable: true,
          }));

          const updatedTimeSlots = [...existingTimeSlots, ...newTimeSlots];

          await availabilityRef.update({
            time_slots: updatedTimeSlots,
          });
        } else {
          await availabilityRef.set({
            date: dateString,
            time_slots: times.map((time: any) => ({
              time: time,
              isAvailable: true,
            })),
          });
        }
      } else {
        // Clinic document does not exist, create new documents
        await clinicRef.set({ clinic_id: selectedClinic });
        await clinicRef.collection('availability').doc(dateString).set({
          date: dateString,
          time_slots: times.map((time: any) => ({
            time: time,
            isAvailable: true,
          })),
        });
      }

      console.log('Appointment successfully updated!');
    } catch (error) {
      console.error('Error updating appointment: ', error);
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

  return (
    <View style={styles.container}>
      <TextInput
        left={<TextInput.Icon icon="calendar" onPress={pickDate} />}
        value={dateObjectToString(date)}
        style={{ backgroundColor: 'white' }}
        underlineStyle={{ borderBottomWidth: 0 }}
        editable={false}
      />
      <Spacer height={7} />
      <Button
        onPress={() => pickTime()}
        icon={'clock'}
        mode="contained"
        style={{ backgroundColor: '#008080', borderRadius: 5 }}
      >
        Pick Time
      </Button>

      <Spacer height={5} />

      <DropDownPicker
        items={clinics}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        value={selectedClinic}
        setValue={setSelectedClinic}
        open={isOpen}
        setOpen={setOpen}
      />

      <Spacer height={10} />
      <View>
        <FlatList
          data={times}
          ItemSeparatorComponent={() => <Divider bold />}
          renderItem={({ item }) => <List.Item title={timeStampToTime(item)} />}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
});
