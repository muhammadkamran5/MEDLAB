import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, TextInput} from 'react-native-paper';
import Logo from '../../../../assets/medlablogo/medlablogo.svg';
import Spacer from '../../../components/Spacer';

const PhoneNumberSignIn = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Logo />
        <View>
          <Text style={styles.welcomeText}>Mobile Number</Text>
          <Text style={styles.siginText}>
            The code will be sent to your mobile number
          </Text>
        </View>
      </View>
      <View>
        <TextInput mode="outlined" label={'Phone Number'} />
        <Spacer height={10} />
        <Button
          mode="contained"
          buttonColor="#225B6E"
          style={styles.signInNumber}>
          Continue
        </Button>
      </View>
      <View style={styles.agreeTextContainer}>
        <View style={styles.agreeText}>
          <Button mode="text">
            <Text style={{textDecorationLine: 'underline' , color: '#225B6E'}}>Cancel</Text>
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
});
