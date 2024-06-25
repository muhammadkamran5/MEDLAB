import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Button, TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import Logo from '../../../../assets/medlablogo/medlablogo.svg';
import Spacer from '../../../components/Spacer';

const LocationInputScreen = ({route, navigation, ...props}: any) => {
  const [address, setAddress] = React.useState('');
  const [allowEditing, setAllowEditing] = React.useState(true);
  console.log(auth().currentUser)
  useEffect(() => {
    const data = route.params;
    if (data) {
      setAddress(data);
      setAllowEditing(false);
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Logo />
        <View>
          <Text style={styles.welcomeText}>Location</Text>
          <Text style={styles.siginText}>Please Enter your Location</Text>
        </View>
      </View>
      <View>
        <TextInput
          mode="outlined"
          label={'Enter your Location'}
          value={address}
          onChangeText={text => setAddress(text)}
          editable={allowEditing}
          left={
            <TextInput.Icon
              onPress={() => {
                navigation.navigate('SelectLocation');
              }}
              icon="map-marker"
            />
          }
        />
        <Spacer height={10} />
        <Button
          mode="contained"
          buttonColor="#225B6E"
          style={styles.signInNumber}
          onPress={async () => {
            await firestore()
              .collection('users')
              .doc(auth().currentUser?.uid)
              .update({
                address: address,
              });
            props.setLogin(true);
          }}>
          Continue
        </Button>
      </View>
      <View style={styles.agreeTextContainer}>
        <View style={styles.agreeText}>
          <Button mode="text">
            <Text style={{textDecorationLine: 'underline', color: '#225B6E'}}>
              Cancel
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default LocationInputScreen;

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
