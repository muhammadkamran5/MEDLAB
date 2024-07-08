import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DProfile from './Profile/DProfile';
import DHome from './Home/DHome';
import {IconButton} from 'react-native-paper';
import {colors} from '../../../themes/theme';
import DHomeNavigations from './Home/DHomeNavigations';

const Tab = createBottomTabNavigator();
const DoctorScreen = (props: any) => {
  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor: colors.PRIMARY}}>
      <Tab.Screen
        name="DHome"
        component={DHomeNavigations}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => (
            <IconButton icon={'home'} iconColor={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="DProfile"
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => (
            <IconButton icon={'account'} iconColor={color} />
          ),
          tabBarLabel: 'Profile',
        }}>
        {(props: any) => <DProfile {...props} setLogin={props.setLogin} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default DoctorScreen;

const styles = StyleSheet.create({});
