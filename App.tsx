import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import PhoneNumberSignIn from './src/screens/SigninScreen/PhoneNumberSignIn/PhoneNumberSignIn';
import VerifyPhone from './src/screens/SigninScreen/VerifyPhone/VerifyPhone';
import LocationInputScreen from './src/screens/SigninScreen/LocationInputScreen/LocationInputScreen';


function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <LocationInputScreen />;
}

export default App;
