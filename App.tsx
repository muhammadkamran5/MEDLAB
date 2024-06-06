/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import StorageyourMedicalRecords from './src/screens/IntroScreen/StorageYourMedicalRecords';
import DiscussInTheCommunity from './src/screens/IntroScreen/DiscussInTheCommunity';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <DiscussInTheCommunity />;
}

export default App;
