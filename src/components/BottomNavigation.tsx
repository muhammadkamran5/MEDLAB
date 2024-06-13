import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import HomeIcon from '../../assets/HomeIcon.svg';
import NotificationIcon from '../../assets/notificationIcon.svg';
import UserIcon from '../../assets/User.svg';

import NotificationScreen from '../screens/NotificationScreen/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import HomeScreenNavigation from '../screens/HomeScreen/HomeScreenNavigation/HomeScreenNavigation';

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreenNavigation}
        options={{
          tabBarIcon: ({focused}) =>  <HomeIcon fill={focused ? '#225B6E' : 'gray'} />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({focused}) => <NotificationIcon fill={focused ? '#225B6E' : 'gray'} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => <UserIcon fill={focused ? '#225B6E' : 'gray'} />,
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomNavigation;
