import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React from 'react';
import {Button, TextInput} from 'react-native-paper';
import Logo from '../../../../assets/medlablogo/medlablogo.svg';
import Spacer from '../../../components/Spacer';
import {colors} from '../../../../themes/theme';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {setIsLogin} from '../../../redux/reducers/isLoginReducer';
import {fetchCurrentUser} from '../../../redux/reducers/userReducer';

const PhoneNumberSignIn = ({navigation}: any) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(true);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  auth().onAuthStateChanged(async user => {
    if (user) {
      await dispatch(fetchCurrentUser(user?.uid));
      dispatch(setIsLogin(true));
      setLoading(false);
    }
  });
  const handleEmailLogin = async () => {
    setLoading(true);
    try {
      const userCredientail = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      ToastAndroid.show('Login Successfully', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Invalid email or password', ToastAndroid.SHORT);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Logo />
        <View>
          <Text style={styles.welcomeText}>Email</Text>
          <Text style={styles.siginText}>
            Enter email and password to login
          </Text>
        </View>
      </View>
      <View>
        <TextInput
          mode="outlined"
          label={'Email'}
          theme={{
            colors: {
              primary: colors.PRIMARY,
            },
          }}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          mode="outlined"
          label={'Password'}
          secureTextEntry={hidePassword}
          right={
            <TextInput.Icon
              icon={hidePassword ? 'eye' : 'eye-off'}
              onPress={togglePasswordVisibility}
            />
          }
          theme={{
            colors: {
              primary: colors.PRIMARY,
            },
          }}
          value={password}
          onChangeText={setPassword}
        />
        <Spacer height={10} />
        <Button
          mode="contained"
          buttonColor="#225B6E"
          style={styles.signInNumber}
          onPress={handleEmailLogin}
          loading={loading}>
          Continue
        </Button>
      </View>
      <View style={styles.agreeTextContainer}>
        <View style={styles.agreeText}>
          <Button mode="text" onPress={() => navigation.goBack()}>
            <Text style={{textDecorationLine: 'underline', color: '#225B6E'}}>
              Cancel
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default PhoneNumberSignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginHorizontal: 20,
  },
  mainContent: {
    flex: 0.6,
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
  borderStyling: {
    borderColor: colors.PRIMARY,
  },
});
