import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, Button, Text, TextInput} from 'react-native-paper';
import Spacer from '../../components/Spacer';
import auth from '@react-native-firebase/auth';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecondary from '../../components/ButtonSecondary';

const ProfileScreen = () => {
  const [currentUser, setCurrentUser]: any = useState({});
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        setCurrentUser(user);
      }
    });
  }, []);
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction />
      </Appbar.Header>

      <View style={styles.container}>
        <Text variant="headlineMedium">Profile</Text>
        <Spacer height={10} />
        <View style={styles.profileMain}>
          {currentUser.photoURL && (
            <Image
              source={{uri: currentUser.photoURL}}
              style={styles.profileImage}
            />
          )}
          <Text variant="bodyLarge">{currentUser.displayName}</Text>
        </View>
      </View>
      <View style={styles.form}>
        <TextInput
          label={'First Name'}
          value={currentUser.displayName && currentUser.displayName.split(' ')[0]}
          mode="outlined"
        />
        <TextInput
          label={'Last Name'}
          value={currentUser.displayName && currentUser.displayName.split(' ')[1]}
          mode="outlined"
        />
        <TextInput label={'Email'} value={currentUser.email} mode="outlined" />
        <TextInput
          label={'Contact Number'}
          value={currentUser.phoneNumber}
          mode="outlined"
        />
        <TextInput label={'Location'} mode="outlined" value="Lahore" />
        <TextInput
          label={'Bio'}
          mode="outlined"
          value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero enim error similique quia numquam ullam corporis officia odio repellendus aperiam"
          multiline
        />
        <Spacer height={10} />
        <View style={styles.buttons}>
          <ButtonPrimary>Update</ButtonPrimary>
          <ButtonSecondary>Cancel</ButtonSecondary>
        </View>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  profileImage: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  profileMain: {
    flexDirection: 'row',
    gap: 15,
  },
  form: {
    marginHorizontal: 20,
  },
  buttons:{
    flexDirection : 'row',
    width : '100%',
    justifyContent : 'center',
    gap: 10
  }
});
