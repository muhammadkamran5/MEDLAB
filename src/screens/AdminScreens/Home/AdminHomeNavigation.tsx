import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AdminHome from './AdminHome'
import Records from '../../HomeScreen/HomeScreenNavigation/Records/Records'
import MedLabCommunity from '../../MedLabCommunity/MedLabCommunity'
import MedLabCommunityDetail from '../../MedLabCommunity/MedLabCommunityDetail'
import AAllHospitals from './AllHospitals'

const Stack = createNativeStackNavigator()
const AdminHomeNavigation = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='AdminHome' component={AdminHome} options={{headerShown:false}}/>
        <Stack.Screen name='Records' component={Records} options={{headerShown:false}}/>
        <Stack.Screen name='Community' component={MedLabCommunity} options={{headerShown:false}}/>
        <Stack.Screen name='CommunityDetail' component={MedLabCommunityDetail} options={{headerShown:false}}/>
        <Stack.Screen name='AAllHospitals' component={AAllHospitals} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default AdminHomeNavigation

const styles = StyleSheet.create({})