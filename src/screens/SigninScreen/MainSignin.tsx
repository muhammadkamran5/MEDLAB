import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SvgUri} from 'react-native-svg';
import auth from '@react-native-firebase/auth';
import {Modal, Portal, Provider, Text} from 'react-native-paper';
import Logo from '../../../assets/medlablogo/medlablogo.svg';
import {Button} from 'react-native-paper';
import Spacer from '../../components/Spacer';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import {LoginManager, AccessToken, LoginButton} from 'react-native-fbsdk-next';
import {useDispatch} from 'react-redux';
import {SignInByGoogle, updateUser} from '../../redux/reducers/userReducer';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import ButtonPrimary from '../../components/ButtonPrimary';

const MainSignin = ({navigation}: any) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const u = useSelector((state: any) => state.user.currentUser);
  const [items, setItems] = useState([
    {label: 'Doctor', value: 'doctor'},
    {label: 'Patient', value: 'patient'},
  ]);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      console.log('I am user ', user);

      if (user) {
        if (u?.isFirstTime == 'yes') {
          setOpenModal(true);
        } else if (u?.role == 'patient') {
          navigation.navigate('BottomNavigation');
        } else if (u?.role == 'doctor') {
          navigation.navigate('doctor');
        } else {
          console.log('User is not login');
        }
      }
    });
    return () => unsubscribe();
  }, [u]);

  async function onGoogleButtonPress() {
    await dispatch(SignInByGoogle());
  }

  const createAccount = () => {
    console.log(value);
    const user = auth().currentUser?.uid;
    const userData = {role: value};
    dispatch(updateUser({userData, userID: user}));
    setOpenModal(false);
    navigation.navigate('LocationInput');
  };

  async function onFacebookButtonPress() {
    try {
      // Attempt login with permissions
      console.log('hello');
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      console.log(result);

      if (result.isCancelled) {
        // throw 'User cancelled the login process';
        console.log('Cancel the login');
      }

      // Once signed in, get the users AccessToken
      const data: any = await AccessToken.getCurrentAccessToken();
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
        {/* <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data?.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/> */}
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
      <Portal>
        <Modal
          visible={openModal}
          style={{backfaceVisibility: 'hidden'}}
          onDismiss={() => setOpenModal(false)}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 30,
              margin: 20,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Text variant="headlineSmall">Choose Method of Sign in</Text>
            <Spacer height={10} />
            <View style={{width: '80%', alignItems: 'center'}}>
              <DropDownPicker
                items={items}
                setItems={setItems}
                open={open}
                setOpen={setOpen}
                value={value}
                setValue={setValue}
              />
            </View>
            <Spacer height={10} />
            <ButtonPrimary onPress={createAccount}>Sign in</ButtonPrimary>
          </View>
        </Modal>
      </Portal>
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
