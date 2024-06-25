import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {SvgUri} from 'react-native-svg';
import auth from '@react-native-firebase/auth';
import {Text} from 'react-native-paper';
import Logo from '../../../assets/medlablogo/medlablogo.svg';
import {Button} from 'react-native-paper';
import Spacer from '../../components/Spacer';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

const MainSignin = ({navigation}: any) => {
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        console.log('User signed in: ', user);
        navigation.navigate('LocationInput');
      } else {
        console.log('No user is signed in.');
      }
    });
    return () => unsubscribe();
  }, []);

  async function onGoogleButtonPress() {
    try {
      // Ensure Google Play Services are available
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      // Sign in with Google
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      const user = userCredential.user;

      // Add user details to Firestore
      const userDoc = await firestore().collection('users').doc(user.uid).get();
      if (!userDoc.exists) {
        await firestore()
          .collection('users')
          .doc(user.uid)
          .set({
            firstName: user.displayName?.split(' ')[0],
            lastName: user.displayName?.split(' ')[1],
            fullName: user.displayName,
            photo: user.photoURL,
            email: user.email,
          });
      }

      console.log('Signed in with Google!');
    } catch (error) {
      // Improved error logging
      console.error('Google Sign-In error: ', error);
    }
  }
  async function onFacebookButtonPress() {
    try {
      // Attempt login with permissions
      console.log('hello')
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      console.log(result)

      if (result.isCancelled) {
        // throw 'User cancelled the login process';
        console.log('Cancel the login')
      }

      // Once signed in, get the users AccessToken
      const data :any= await AccessToken.getCurrentAccessToken();
      // if (!data) {
      //   throw 'Something went wrong obtaining access token';
      // }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data?.accessToken,
      );

      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    } catch (e) {
      console.log('how ');
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Logo />
        <View>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.siginText}>Sign in to continue</Text>
        </View>
      </View>
      <View>
        <Button
          mode="contained"
          buttonColor="#225B6E"
          style={styles.signInNumber}
          onPress={() => navigation.navigate('SignInPhone')}>
          Sign in with mobile number
        </Button>
        <Text style={styles.orText}>or</Text>
        <Button
          mode="contained"
          buttonColor="#3A559F"
          style={styles.signInNumber}
          icon={'facebook'}
          onPress={onFacebookButtonPress}>
          Sign in with Facebook
        </Button>
        <Spacer height={14} />
        <Button
          mode="contained"
          buttonColor="#D21F08"
          style={styles.signInNumber}
          icon={'google-plus'}
          onPress={onGoogleButtonPress}>
          Login with Google
        </Button>
      </View>
      <View style={styles.agreeTextContainer}>
        <Text style={styles.agreeText}>
          By signing in, you agree to our{' '}
          <Text style={{color: '#225B6E'}}>Terms and Conditions</Text>
        </Text>
      </View>
    </View>
  );
};

export default MainSignin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginHorizontal: 20,
  },
  mainContent: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 58,
  },
  welcomeText: {
    color: '#225B6E',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  siginText: {
    color: '#1C1C1C',
    fontSize: 14,
    textAlign: 'center',
  },
  signInNumber: {
    borderRadius: 5,
    width: '100%',
    height: 43,
    fontSize: 16,
    textAlign: 'center',
  },
  orText: {
    marginVertical: 14,
    fontSize: 14,
    textAlign: 'center',
  },
  agreeTextContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
  },
  agreeText: {
    marginBottom: 14,
    textAlign: 'center',
  },
});
