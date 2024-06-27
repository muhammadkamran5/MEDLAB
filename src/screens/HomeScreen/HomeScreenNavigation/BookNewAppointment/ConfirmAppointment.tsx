import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import BackIcon from '../../../../../assets/Back.svg';
import {Appbar, Divider, IconButton, Text} from 'react-native-paper';
import Spacer from '../../../../components/Spacer';
import KInput from '../../../../components/KInput';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Calendar} from 'react-native-calendars';

const ConfirmAppointment = ({route, navigation}: any) => {
  const {time, date, doctorID} = route.params;
  const currentUser = auth().currentUser;
  const [note, setNote] = useState('');
  const [showCalendar, setShowCalendar] = useState(false); // State to toggle calendar visibility
  const [selectedDate, setSelectedDate] = useState(date); // State to store selected date
  console.log(selectedDate);
  useEffect(() => {
    // const date = new Date(selectedDate);
    // setSelectedDate(date.toISOString().split('T')[0])
    console.log(selectedDate);
  }, []);

  const data = [
    {
      image: require('./Card1.png'),
    },
    {
      image: require('./Card2.png'),
    },
  ];

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handlePayment = async () => {
    try {
      await firestore().collection('appointments').add({
        doctor_id: doctorID,
        note: note,
        patient_id: currentUser?.uid,
        status: 'Confirmed',
        time: time,
        date: date, // Assuming date is a variable containing the date value
      });
      ToastAndroid.show('Appointment added successfully', ToastAndroid.SHORT);
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
          Dr. Abeera Mansoor Confirmation
        </Text>

        <Spacer height={7} />

        <Pressable style={styles.dateCard} onPress={toggleCalendar}>
          <Text variant="displaySmall">
            {date} {time}
          </Text>
        </Pressable>
        {showCalendar && (
          <Calendar
            current={selectedDate}
            markedDates={{
              '2024-07-10': {
                selected: true,
                selectedColor: 'blue',
              }
            }}
          />
        )}

        <Spacer height={7} />

        <View style={styles.locationContainer}>
          <IconButton icon={'map-marker'} />
          <Text>DHMC, Lahore - 7 km</Text>
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
          data={data}
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
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  payButton: {
    alignSelf: 'center',
    width: '50%',
    marginBottom: 20,
  },
});
