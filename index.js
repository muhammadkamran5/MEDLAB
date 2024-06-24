/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { PaperProvider } from 'react-native-paper';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const Main = ()=>{
    GoogleSignin.configure({
        webClientId:
          '610879164401-4jnns81ehqfcjelpg7m1jj0gtck1pfi9.apps.googleusercontent.com',
      });
    return (
        <PaperProvider>
            <App />
        </PaperProvider>
    )
}
AppRegistry.registerComponent(appName, () => Main);
