import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import MainSignin from './src/screens/SigninScreen/MainSignin';
import IntroScreen from './src/screens/IntroScreen/Index';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PhoneNumberSignIn from './src/screens/SigninScreen/PhoneNumberSignIn/PhoneNumberSignIn';
import LocationInputScreen from './src/screens/SigninScreen/LocationInputScreen/LocationInputScreen';
import BottomNavigation from './src/components/BottomNavigation';
import SetUserLocation from './src/screens/SigninScreen/LocationInputScreen/SetUserLocation';
import ShowSpecilistDoctors from './src/screens/HomeScreen/HomeScreenNavigation/BookNewAppointment/ShowSpecilistDoctors';
import DoctorDetail from './src/screens/HomeScreen/HomeScreenNavigation/BookNewAppointment/DoctorDetail';
import ConfirmAppointment from './src/screens/HomeScreen/HomeScreenNavigation/BookNewAppointment/ConfirmAppointment';
import AppointmentConfirmAlert from './src/screens/HomeScreen/HomeScreenNavigation/BookNewAppointment/AppointmentConfirmAlert';

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  const [showIntro, setShowIntro] = React.useState(true);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {showIntro ? (
          <Stack.Screen name="Intro" options={{headerShown: false}}>
            {props => <IntroScreen {...props} setShow={setShowIntro} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen
            name="MainSignin"
            component={MainSignin}
            options={{headerShown: false}}
          />
        )}
        <Stack.Screen
          name="SignInPhone"
          options={{headerShown: false}}
          component={PhoneNumberSignIn}
        />
        <Stack.Screen
          name="LocationInput"
          options={{headerShown: false}}
          component={LocationInputScreen}
        />
        <Stack.Screen name='SelectLocation' component={SetUserLocation} options={{headerShown : false}} />
        <Stack.Screen name='BottomNavigation' component={BottomNavigation} options={{headerShown : false}} />
        <Stack.Screen name='DoctorDetail' component={DoctorDetail} options={{headerShown : false}} />
        <Stack.Screen name='ConfirmAppointment' component={ConfirmAppointment} options={{headerShown : false}} />
        <Stack.Screen name='AppointmentConfirmAlert' component={AppointmentConfirmAlert} options={{headerShown : false}} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
