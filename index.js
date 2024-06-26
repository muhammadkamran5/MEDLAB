/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PaperProvider} from 'react-native-paper';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Provider} from 'react-redux';
import store from './src/redux/store';
const Main = () => {
  GoogleSignin.configure({
    webClientId:
      '610879164401-4jnns81ehqfcjelpg7m1jj0gtck1pfi9.apps.googleusercontent.com',
  });
  return (
    <Provider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => Main);
