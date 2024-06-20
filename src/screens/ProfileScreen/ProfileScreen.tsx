import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Appbar, Button, Text} from 'react-native-paper';
import Spacer from '../../components/Spacer';
import auth from '@react-native-firebase/auth';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecondary from '../../components/ButtonSecondary';
import KInput from '../../components/KInput';

const ProfileScreen = () => {
  const [currentUser, setCurrentUser]: any = useState(null);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;
      if (user) {
        setCurrentUser(user);
        setFirstName(user?.displayName?.split(' ')[0] || '');
        setLastName(user?.displayName?.split(' ')[1] || '');
        setEmail(user.email || '');
        setContactNumber(user.phoneNumber || '');
      }
    };

    fetchUserData();
  }, []);

  const updateProfile = async () => {
    const user = auth().currentUser;
    try {
      setUpdateLoading(true);
      await user?.updateProfile({
        displayName: `${firstName} ${lastName}`,
      });
      setIsEditingMode(false);
      
      setUpdateLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const renderTextFields = () => (
    <>
      <KInput
        label={'First Name'}
        value={firstName}
        onChangeText={(text: any) => setFirstName(text)}
      />
      <KInput
        label={'Last Name'}
        value={lastName}
        onChangeText={(text: any) => setLastName(text)}
      />
      <KInput label={'Email'} value={email} editable={false} />
      <KInput
        label={'Contact Number'}
        value={contactNumber}
        onChangeText={(text: any) => setContactNumber(text)}
      />
      <KInput label={'Location'} value="Lahore" editable={false} />
      <KInput
        label={'Bio'}
        multiline={true}
        value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero enim error similique quia numquam ullam corporis officia odio repellendus aperiam"
        editable={false}
      />
    </>
  );

  const renderTextViews = () => (
    <>
      <Text variant="titleMedium">First Name</Text>
      <Text variant="bodyLarge" style={styles.text}>
        {firstName}
      </Text>
      <Text variant="titleMedium">Last Name</Text>
      <Text variant="bodyLarge" style={styles.text}>
        {lastName}
      </Text>
      <Text variant="titleMedium">Email Address</Text>
      <Text variant="bodyLarge" style={styles.text}>
        {email}
      </Text>
      <Text variant="titleMedium">Contact Number</Text>
      <Text variant="bodyLarge" style={styles.text}>
        {contactNumber || '+923099632609'}
      </Text>
      <Text variant="titleMedium">Location</Text>
      <Text variant="bodyLarge" style={styles.text}>
        Lahore
      </Text>
      <Text variant="titleMedium">Bio</Text>
      <Text variant="bodyLarge" style={styles.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero
        enim error similique quia numquam ullam corporis officia odio
        repellendus aperiam
      </Text>
    </>
  );

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
                    source={{uri: currentUser?.photoURL}}
                    style={styles.profileImage}
                  />
                )}
                <View>
                  <Text variant="bodyLarge">{currentUser?.displayName}</Text>
                  <Button
                    mode="text"
                    style={{marginHorizontal: -10, alignItems: 'flex-start'}}
                    onPress={() => setIsEditingMode(true)}>
                    <Text style={{textDecorationLine: 'underline'}}>
                      edit profile
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
            <View style={styles.form}>
              {isEditingMode ? renderTextFields() : renderTextViews()}
              <Spacer height={10} />
              {isEditingMode && (
                <View style={styles.buttons}>
                  <ButtonPrimary
                    onPress={() => updateProfile()}
                    loading={updateLoading}>
                    Update
                  </ButtonPrimary>
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
    marginBottom: 10,
  },
  text: {
    color: '#225B6E',
    paddingVertical: 5,
  },
});
