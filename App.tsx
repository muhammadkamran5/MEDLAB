import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import IntroScreen from './src/screens/IntroScreen/Index';
import FindyourDoctor from './src/screens/IntroScreen/FindYourDoctor';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <IntroScreen />;
}

export default App;
