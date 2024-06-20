import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Appbar,
  Button,
  Text,
  TextInput,
} from 'react-native-paper';
import Spacer from '../../components/Spacer';
import auth from '@react-native-firebase/auth';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecondary from '../../components/ButtonSecondary';
import KInput from '../../components/KInput';

const ProfileScreen = () => {
  const [currentUser, setCurrentUser]: any = useState(null);
  const [isEditingMode, setIsEditingMode] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  const TextFields = () => {
    if (currentUser) {
      return (
        <>
          <KInput
            label={'First Name'}
            value={currentUser.displayName.split(' ')[0]}
          />
          <KInput
            label={'Last Name'}
            value={currentUser.displayName.split(' ')[1]}
          />
          <KInput label={'Email'} value={currentUser.email} />
          <KInput label={'Contact Number'} value={currentUser.phoneNumber} />
          <KInput label={'Location'} value="Lahore" />
          <KInput
            label={'Bio'}
            multiline={true}
            value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero enim error similique quia numquam ullam corporis officia odio repellendus aperiam"
          />
        </>
      );
    } else {
      return <ActivityIndicator animating={true} size={'large'} />;
    }
  };

  const TextViews = () => {
    return (
      <>
        <Text variant="titleMedium">First Name</Text>
        <Text variant="bodyLarge" style={styles.text}>
          {currentUser.displayName && currentUser.displayName.split(' ')[0]}
        </Text>
        <Text variant="titleMedium">Last Name</Text>
        <Text variant="bodyLarge" style={styles.text}>
          {currentUser.displayName && currentUser.displayName.split(' ')[1]}
        </Text>
        <Text variant="titleMedium">Email Address</Text>
        <Text variant="bodyLarge" style={styles.text}>
          {currentUser.email}
        </Text>
        <Text variant="titleMedium">Contact Number</Text>
        <Text variant="bodyLarge" style={styles.text}>
          {currentUser.phoneNumber || '+923099632609'}
        </Text>
        <Text variant="titleMedium">Lahore</Text>
        <Text variant="bodyLarge" style={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero
          enim error similique quia numquam ullam corporis officia odio
          repellendus aperiam
        </Text>
      </>
    );
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction />
      </Appbar.Header>
      <ScrollView style={{flex: 1}}>
        {currentUser ? (
          <>
            <View style={styles.container}>
              <Text variant="headlineMedium">Profile</Text>
              <Spacer height={10} />
              <View style={styles.profileMain}>
                {currentUser?.photoURL && (
                  <Image
                    source={{uri: currentUser.photoURL}}
                    style={styles.profileImage}
                  />
                )}
                <View>
                  <Text variant="bodyLarge">{currentUser.displayName}</Text>
                  <Button
                    mode="text"
                    style={{marginHorizontal: -10, alignItems: 'flex-start'}}
                    onPress={() => setIsEditingMode(true)}>
                    edit profile
                  </Button>
                </View>
              </View>
            </View>
            <View style={styles.form}>
              {isEditingMode ? <TextFields /> : <TextViews />}
              <Spacer height={10} />
              {isEditingMode && (
                <View style={styles.buttons}>
                  <ButtonPrimary>Update</ButtonPrimary>
                  <ButtonSecondary onPress={() => setIsEditingMode(false)}>
                    Cancel
                  </ButtonSecondary>
                </View>
              )}
            </View>
          </>
        ) : (
          <ActivityIndicator animating={true} size={'large'} />
        )}
      </ScrollView>
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
  buttons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: 10,
    marginBottom : 10
  },
  text: {
    color: '#225B6E',
    paddingVertical: 5,
  },
});
