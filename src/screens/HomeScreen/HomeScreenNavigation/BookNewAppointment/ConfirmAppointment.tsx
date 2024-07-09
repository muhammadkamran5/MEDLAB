import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
  Pressable,
  FlatList,
  Image,
} from 'react-native';
import BackIcon from '../../../../../assets/Back.svg';
import {
  Appbar,
  IconButton,
  Text,
  Button,
  Divider,
  ActivityIndicator,
} from 'react-native-paper';
import Spacer from '../../../../components/Spacer';
import KInput from '../../../../components/KInput';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {updateUser} from '../../../../redux/reducers/userReducer';
import {LogBox} from 'react-native';
import {colors} from '../../../../../themes/theme';

const updateAppointmentStatusData = (userData: any, date: any, time: any) => {
  const updatedAvailability = [...userData.availability];
  return updatedAvailability;
};

const getTimes = (date: any, dates: any) => {
  const times = dates.find((item: any) => item.date === date);
  return times?.times || [];
};

const ConfirmAppointment = ({route, navigation}: any) => {
  const {time, date, doctorID} = route.params;
  const doctor = useSelector((state: any) => state.doctors);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const currentUser = auth().currentUser;
  const [note, setNote] = useState('');
  const [appointments, setAppointments]: any = useState([]);
  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedTime, setSelectedTime] = useState(time);
  const [selectedDateOption, setSelectedDateOption] = useState(date);
  const [selectedTimeOption, setSelectedTimeOption] = useState(time);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [isOpenTime, setIsOpenTime] = useState(false);
  const [timeOptions, setTimeOptions]: any = useState([]);
  const [dateOptions, setDateOptions] = useState([{label: date, value: date}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    const fetchDates = async () => {
      try {
        const userRef = firestore().collection('users').doc(doctorID);
        const appointmentsQuery = userRef.collection('available_slots');
        const appointmentsSnapshot = await appointmentsQuery.get();
        const appointments = appointmentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(appointments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dates:', error);
        setLoading(false);
      }
    };
    fetchDates();
  }, [doctorID]);

  useEffect(() => {
    if (!loading) {
      const options = appointments.map((item: any) => ({
        label: item.date.toDate().toDateString(),
        value: item.date.toDate().toDateString(),
      }));
      setDateOptions(options);
      console.log(selectedDate);
      const ap = appointments.filter(
        (item: any) => item.date.toDate().toDateString() === selectedDate,
      )[0];
      ap &&
        setTimeOptions(
          ap.times.map((time: any) => ({
            label: new Date(time).toLocaleTimeString('us', {hour12: true}),
            value: new Date(time).toLocaleTimeString('us', {hour12: true}),
          })),
        );
    }
  }, [appointments, loading, selectedDate]);

  const handleApply = () => {
    setSelectedDate(selectedDateOption);
    setSelectedTime(selectedTimeOption);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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

      ToastAndroid.show('Appointment added successfully', ToastAndroid.SHORT);
      navigation.navigate('AppointmentConfirmAlert');
    } catch (error) {
      console.error('Error adding appointment: ', error);
    }
  };

  if (loading) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <ActivityIndicator color={colors.PRIMARY} />
      </View>
    );
  }

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
              value={selectedDateOption}
              setValue={(value: any) => {
                setSelectedDateOption(value);
                setSelectedDate(value);
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
              value={selectedTimeOption}
              setValue={(value: any) => {
                setSelectedTimeOption(value);
                setSelectedTime(value);
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
          renderItem={({item}: any) => (
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
});
