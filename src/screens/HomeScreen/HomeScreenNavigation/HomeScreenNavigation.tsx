import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyAppointments from './MyAppointments/MyAppointments';
import Records from './Records/Records';
import Community from './Community/Community';
import Hospitals from './Hospitals/Hospitals';
import HomeScreen from '../HomeScreen';

const Stack = createNativeStackNavigator();
const HomeScreenNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MyAppointments" component={MyAppointments} />
      <Stack.Screen name="Records" component={Records} />
      <Stack.Screen name="Community" component={Community} />
      <Stack.Screen name="Hospitals" component={Hospitals} />
    </Stack.Navigator>
  );
};

export default HomeScreenNavigation;

const styles = StyleSheet.create({});
