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
import DoctorDetail from './src/screens/HomeScreen/HomeScreenNavigation/BookNewAppointment/DoctorDetail';
import ConfirmAppointment from './src/screens/HomeScreen/HomeScreenNavigation/BookNewAppointment/ConfirmAppointment';
import AppointmentConfirmAlert from './src/screens/HomeScreen/HomeScreenNavigation/BookNewAppointment/AppointmentConfirmAlert';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {fetchCurrentUser} from './src/redux/reducers/userReducer';
import GiveFeedBack from './src/screens/GiveFeedBack/GiveFeedBack';
import notifee, {TriggerType, TimeUnit} from '@notifee/react-native';
import firestore from '@react-native-firebase/firestore';
import SigninMethod from './src/screens/SigninScreen/SigninMethod';
import {Text} from 'react-native';
import DoctorScreen from './src/screens/DoctorScreen/DoctorScreen';
import {setIsLogin} from './src/redux/reducers/isLoginReducer';

const Stack = createNativeStackNavigator();
async function scheduleNotification(time: any) {
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  const {seconds, nanoseconds} = time;
  const milliseconds = seconds * 1000 + nanoseconds / 1000000;
  const t = new Date(milliseconds);
  console.log(t);
  const triggerTimestamp = t.getTime() - 3600000;
  // console.log(time)
  // Create a time-based trigger
  const trigger: any = {
    type: TriggerType.TIMESTAMP,
    timestamp: triggerTimestamp, // Schedule notification to appear in 5 seconds
    repeat: true,
  };

  // Create the notification
  await notifee.createTriggerNotification(
    {
      title: 'Scheduled Appointment',
      body: 'You have scheduled appointment in 1 hour',
      android: {
        channelId,
      },
    },
    trigger,
  );
}

function App(): React.JSX.Element {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const user = useSelector((state: any) => state.user.currentUser);
  const isLogin = useSelector((state: any) => state.isLogin.isLogin);

  const [showIntro, setShowIntro] = React.useState(true);

  useEffect(() => {
    SplashScreen.hide();
    const user = auth().currentUser;
    if (user) {
      setShowIntro(false);
      dispatch(fetchCurrentUser(user.uid));
      dispatch(setIsLogin(true));
    }
  }, []);
  useEffect(() => {
    const user = auth().currentUser;
    const fetchScheduleNotification = async () => {
      const res = firestore()
        .collection('appointments')
        .where('patient_id', '==', user?.uid)
        .get();
      const data = (await res).docs.map(doc => doc.data());
      data.forEach((item: any) => {
        console.log('Time', item);
        scheduleNotification(item.time);
      });
    };

    // fetchScheduleNotification();
  });

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {showIntro ? (
          <Stack.Screen name="Intro" options={{headerShown: false}}>
            {props => <IntroScreen {...props} setShow={setShowIntro} />}
          </Stack.Screen>
        ) : isLogin ? (
          user.role == 'doctor' ? (
            <>
              <Stack.Screen name="doctor">
                {props => <DoctorScreen {...props} setLogin={setIsLogin} />}
              </Stack.Screen>
              <Stack.Screen
                name="MainSignin"
                component={MainSignin}
                options={{headerShown: false}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="BottomNavigation"
                component={BottomNavigation}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="DoctorDetail"
                component={DoctorDetail}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ConfirmAppointment"
                component={ConfirmAppointment}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AppointmentConfirmAlert"
                component={AppointmentConfirmAlert}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="GiveFeedBack"
                component={GiveFeedBack}
                options={{headerShown: false}}
              />
                  <Stack.Screen
                name="MainSignin"
                component={MainSignin}
                options={{headerShown: false}}
              />
            </>
          )
        ) : (
          <>
            <Stack.Screen
              name="MainSignin"
              component={MainSignin}
              options={{headerShown: false}}
            />
            <Stack.Screen name="doctor" component={DoctorScreen} />
            <Stack.Screen
              name="SignInMethod"
              component={SigninMethod}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="BottomNavigation"
              component={BottomNavigation}
              options={{headerShown: false}}
            />
            <Stack.Screen name="LocationInput" options={{headerShown: false}}>
              {props => (
                <LocationInputScreen {...props} setLogin={setIsLogin} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="SignInPhone"
              options={{headerShown: false}}
              component={PhoneNumberSignIn}
            />
          </>
        )}
        <Stack.Screen
          name="SelectLocation"
          component={SetUserLocation}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
