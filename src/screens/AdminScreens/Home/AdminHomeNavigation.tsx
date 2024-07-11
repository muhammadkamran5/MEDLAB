import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AdminHome from './AdminHome'
import Records from '../../HomeScreen/HomeScreenNavigation/Records/Records'
import MedLabCommunity from '../../MedLabCommunity/MedLabCommunity'
import MedLabCommunityDetail from '../../MedLabCommunity/MedLabCommunityDetail'
import AAllHospitals from './AllHospitals'
import AllQuestions from '../../DoctorScreen/Home/DHomeNavigations/Questions/AllQuestions'
import HospitalDetail from './HospitalDetail'
import EditHospital from './EditHospital'

const Stack = createNativeStackNavigator()
const AdminHomeNavigation = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='AdminHome' component={AdminHome} options={{headerShown:false}}/>
        <Stack.Screen name='Records' component={Records} options={{headerShown:false}}/>
        <Stack.Screen name='Community' component={MedLabCommunity} options={{headerShown:false}}/>
        <Stack.Screen name='CommunityDetail' component={MedLabCommunityDetail} options={{headerShown:false}}/>
        <Stack.Screen name='AAllHospitals' component={AAllHospitals} options={{headerShown:false}}/>
        <Stack.Screen name='AHospitalDetail' component={HospitalDetail} options={{headerShown:false}}/>
        <Stack.Screen name='EditHospital' component={EditHospital} options={{headerShown:false}}/>
        <Stack.Screen name='AllQuestions' component={AllQuestions} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default AdminHomeNavigation

const styles = StyleSheet.create({})