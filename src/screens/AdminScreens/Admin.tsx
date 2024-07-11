import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeIcon from '../../../assets/HomeIcon.svg';
import UserIcon from '../../../assets/User.svg';
import {colors} from '../../../themes/theme';

import AProfile from './AProfile';
import AdminHomeNavigation from './Home/AdminHomeNavigation';
const Tab = createBottomTabNavigator();
const Admin = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="AdminHomeNavigation"
        component={AdminHomeNavigation}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}: any) => (
            <HomeIcon fill={focused ? colors.PRIMARY : colors.SECONDARY} />
          ),
        }}
      />
      <Tab.Screen
        name="AdminProfile"
        component={AProfile}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}: any) => (
            <UserIcon fill={focused ? colors.PRIMARY : colors.SECONDARY} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Admin;

const styles = StyleSheet.create({});
