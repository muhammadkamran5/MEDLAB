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
import firestore from '@react-native-firebase/firestore';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecondary from '../../components/ButtonSecondary';
import KInput from '../../components/KInput';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {updateUser} from '../../redux/reducers/userReducer';

const ProfileScreen = ({navigation}: any) => {
  const user = useSelector((state: any) => state.user.currentUser);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setFirstName(user?.firstName);
        setLastName(user?.lastName);
        setEmail(user?.email);
        setContactNumber(user?.contactNumber);
        setBio(user?.bio);
        setLocation(user?.address);
        setFullName(user?.fullName);
      }
    };

    fetchUserData();
  }, [user]);

  const updateProfile = async () => {
    const u = auth().currentUser;
    try {
      setUpdateLoading(true);
      await u?.updateProfile({
        displayName: `${firstName} ${lastName}`,
      });
      const API_KEY = 'AIzaSyBOzLbI1W6cUoolrMY6qiNtco2qisO3iKM';
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          location,
        )}&key=AIzaSyBOzLbI1W6cUoolrMY6qiNtco2qisO3iKM`,
      );

      const data = await res.json();
      console.log();
      const userData = {
        firstName: firstName || '',
        lastName: lastName || '',
        contactNumber: contactNumber || '',
        bio: bio || '',
        fullName: `${firstName} ${lastName}`,
        location: {
          latitude: data?.results[0]?.geometry.location.lat,
          longitude: data?.results[0]?.geometry.location.lng,
        },
        address: location,
      };
      const userID = u?.uid;
      dispatch(updateUser({userData, userID}));
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
      <TextInput
        mode="outlined"
        label={'Enter your Location'}
        value={location}
        onChangeText={text => setLocation(text)}
        left={
          <TextInput.Icon
            onPress={() => {
              navigation.navigate('SelectLocation' , setLocation);
            }}
            icon="map-marker"
          />
        }
      />
      <KInput
        label={'Bio'}
        multiline={true}
        value={bio}
        onChangeText={(text: any) => setBio(text)}
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
        {contactNumber}
      </Text>
      <Text variant="titleMedium">Location</Text>
      <Text variant="bodyLarge" style={styles.text}>
        {location}
      </Text>
      <Text variant="titleMedium">Bio</Text>
      <Text variant="bodyLarge" style={styles.text}>
        {bio}
      </Text>
    </>
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>
      <ScrollView style={{flex: 1}}>
        {user ? (
          <>
            <View style={styles.container}>
              <Text variant="headlineMedium">Profile</Text>
              <Spacer height={10} />
              <View style={styles.profileMain}>
                {user?.photo && (
                  <Image
                    source={{uri: user?.photo}}
                    style={styles.profileImage}
                  />
                )}
                <View>
                  <Text variant="bodyLarge">
                    {firstName} {lastName}
                  </Text>
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
