import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DAppointments from './DHomeNavigations/DAppointments';
import DoctorScreen from '../DoctorScreen';
import DHome from './DHome';
import DAddPost from './DHomeNavigations/DCommunity/DAddPost';
import MedLabCommunity from '../../MedLabCommunity/MedLabCommunity';
import MedLabCommunityDetail from '../../MedLabCommunity/MedLabCommunityDetail';
import Records from '../../HomeScreen/HomeScreenNavigation/Records/Records';
import AllHospitals from './DHomeNavigations/Hospitals/AllHospitals';
import AllQuestions from './DHomeNavigations/Questions/AllQuestions';

const Stack = createNativeStackNavigator();
const DHomeNavigations = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DHomeScreen"
        component={DHome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DAppointments"
        component={DAppointments}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DRecords"
        component={Records}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Community"
        component={MedLabCommunity}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DAddPost"
        component={DAddPost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CommunityDetail"
        component={MedLabCommunityDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Hospitals"
        component={AllHospitals}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllQuestions"
        component={AllQuestions}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default DHomeNavigations;

const styles = StyleSheet.create({});
