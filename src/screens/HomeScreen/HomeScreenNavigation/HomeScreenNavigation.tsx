import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyAppointments from './MyAppointments/MyAppointments';
import Records from './Records/Records';
import Community from './Community/Community';
import Hospitals from './Hospitals/Hospitals';
import HomeScreen from '../HomeScreen';
import ShowSpecilistDoctors from './BookNewAppointment/ShowSpecilistDoctors';
import MedLabCommunity from '../../MedLabCommunity/MedLabCommunity';
import GiveFeedBack from '../../GiveFeedBack/GiveFeedBack';
import MedLabCommunityDetail from '../../MedLabCommunity/MedLabCommunityDetail';
import DoctorDetail from './BookNewAppointment/DoctorDetail';
import ConfirmAppointment from './BookNewAppointment/ConfirmAppointment';


const Stack = createNativeStackNavigator();
const HomeScreenNavigation = () => {
  
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MyAppointments" component={MyAppointments} />
      <Stack.Screen name="Records" component={Records} />
      <Stack.Screen name="Community" component={MedLabCommunity} />
      <Stack.Screen name="CommunityDetail" component={MedLabCommunityDetail} />
      <Stack.Screen name="ConfirmAppointment" component={ConfirmAppointment} />
      <Stack.Screen name="Hospitals" component={Hospitals} />
      <Stack.Screen name='ShowSpecilistDoctors' component={ShowSpecilistDoctors} options={{headerShown : false}} />
        <Stack.Screen name='DoctorDetail' component={DoctorDetail} options={{headerShown : false}} />
    </Stack.Navigator>
  );
};

export default HomeScreenNavigation;

const styles = StyleSheet.create({});
