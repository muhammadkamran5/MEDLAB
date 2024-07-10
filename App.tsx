import 'react-native-gesture-handler';
import React, {useEffect, useState, useMemo} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {fetchCurrentUser} from './src/redux/reducers/userReducer';
import {setIsLogin} from './src/redux/reducers/isLoginReducer';
import auth from '@react-native-firebase/auth';

import MainSignin from './src/screens/SigninScreen/MainSignin';
import IntroScreen from './src/screens/IntroScreen/Index';
import EmailSignin from './src/screens/SigninScreen/EmailSignin/EmailSignin';
import LocationInputScreen from './src/screens/SigninScreen/LocationInputScreen/LocationInputScreen';
import BottomNavigation from './src/components/BottomNavigation';
import SetUserLocation from './src/screens/SigninScreen/LocationInputScreen/SetUserLocation';
import DoctorDetail from './src/screens/HomeScreen/HomeScreenNavigation/BookNewAppointment/DoctorDetail';
import ConfirmAppointment from './src/screens/HomeScreen/HomeScreenNavigation/BookNewAppointment/ConfirmAppointment';
import AppointmentConfirmAlert from './src/screens/HomeScreen/HomeScreenNavigation/BookNewAppointment/AppointmentConfirmAlert';
import GiveFeedBack from './src/screens/GiveFeedBack/GiveFeedBack';
import SigninMethod from './src/screens/SigninScreen/SigninMethod';
import DoctorScreen from './src/screens/DoctorScreen/DoctorScreen';
import Admin from './src/screens/AdminScreens/Admin';
import Loading from './src/screens/Loading';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const user = useSelector((state: any) => state.user.currentUser);
  const isLogin = useSelector((state: any) => state.isLogin.isLogin);

  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    SplashScreen.hide();
    const user = auth().currentUser;
    if (user) {
      setShowIntro(false);
      dispatch(fetchCurrentUser(user.uid));
      dispatch(setIsLogin(true));
    }
  }, []);

  const renderScreen = useMemo(() => {
    if (showIntro) {
      return (
        <Stack.Screen name="Intro">
          {props => <IntroScreen {...props} setShow={setShowIntro} />}
        </Stack.Screen>
      );
    }

    if (!isLogin) {
      return (
        <>
          <Stack.Screen name="MainSignin" component={MainSignin} />
          <Stack.Screen name="SignInMethod" component={SigninMethod} />
          <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
          <Stack.Screen name="LocationInput">
            {props => <LocationInputScreen {...props} setLogin={setIsLogin} />}
          </Stack.Screen>
          <Stack.Screen name="SignInEmail" component={EmailSignin} />
        </>
      );
    }

    if (user.role === 'admin') {
      return <Stack.Screen name="Admin" component={Admin} />;
    }

    if (user.role === 'doctor') {
      return (
        <Stack.Screen name="DoctorScreen">
          {props => <DoctorScreen {...props} setLogin={setIsLogin} />}
        </Stack.Screen>
      );
    }
    if (user.role === 'patient') {
      return (
        <>
          <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
          <Stack.Screen name="DoctorDetail" component={DoctorDetail} />
          <Stack.Screen
            name="ConfirmAppointment"
            component={ConfirmAppointment}
          />
          <Stack.Screen
            name="AppointmentConfirmAlert"
            component={AppointmentConfirmAlert}
          />
          <Stack.Screen name="GiveFeedBack" component={GiveFeedBack} />
        </>
      );
    }
    return <Stack.Screen name="Loading" component={Loading} />;
  }, [showIntro, isLogin, user]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {renderScreen}
        <Stack.Screen name="SelectLocation" component={SetUserLocation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
