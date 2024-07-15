import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Appbar,
  Button,
  IconButton,
  Menu,
  Text,
  TextInput,
} from 'react-native-paper';

import Spacer from '../../components/Spacer';
import auth from '@react-native-firebase/auth';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecondary from '../../components/ButtonSecondary';
import KInput from '../../components/KInput';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {
  fetchCurrentUser,
  logoutUser,
  updateUser,
} from '../../redux/reducers/userReducer';
import {setIsLogin} from '../../redux/reducers/isLoginReducer';

const AProfile = ({navigation}: any) => {
  auth().onAuthStateChanged(user => {
    console.log('hello');
    if (!user) {
      dispatch(setIsLogin(false));
    }
  });
  const user = useSelector((state: any) => state.user.currentUser);
  const isLogin = useSelector((state: any) => state.isLogin.isLogin);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [profileState, setProfileState] = useState({
    isEditingMode: false,
    updateLoading: false,
    latitude: '',
    longitude: '',
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    location: '',
    bio: '',
    fullName: '',
    specialties: '',
    isRefreshing: false,
    isMenuVisible: false,
  });

  const onRefresh = () => {
    setProfileState(prevState => ({...prevState, isRefreshing: true}));
    dispatch(fetchCurrentUser(auth().currentUser?.uid));
    setProfileState(prevState => ({...prevState, isRefreshing: false}));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        setProfileState({
          isEditingMode: false,
          updateLoading: false,
          latitude: '',
          longitude: '',
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          email: user?.email || '',
          contactNumber: user?.contactNumber || '',
          location: user?.address || '',
          bio: user?.bio || '',
          fullName: user?.fullName || '',
          specialties: user?.specialties || '',
          isRefreshing: false,
          isMenuVisible: false,
        });
      }
    };

    fetchUserData();
  }, []);

  const updateProfile = async () => {
    const u = auth().currentUser;
    try {
      setProfileState(prevState => ({...prevState, updateLoading: true}));
      await u?.updateProfile({
        displayName: `${profileState.firstName} ${profileState.lastName}`,
      });
      const API_KEY = 'AIzaSyBOzLbI1W6cUoolrMY6qiNtco2qisO3iKM';
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          profileState.location,
        )}&key=${API_KEY}`,
      );

      const data = await res.json();
      const userData = {
        firstName: profileState.firstName || '',
        lastName: profileState.lastName || '',
        contactNumber: profileState.contactNumber || '',
        bio: profileState.bio || '',
        fullName: `${profileState.firstName} ${profileState.lastName}`,
        location: {
          latitude: data?.results[0]?.geometry.location.lat,
          longitude: data?.results[0]?.geometry.location.lng,
        },
        address: profileState.location,
        specialties: profileState.specialties,
      };
      const userID = u?.uid;
      dispatch(updateUser({userData, userID}));
      setProfileState(prevState => ({
        ...prevState,
        isEditingMode: false,
        updateLoading: false,
      }));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const renderTextFields = () => (
    <>
      <KInput
        label={'First Name'}
        value={profileState.firstName}
        onChangeText={(text: any) =>
          setProfileState(prevState => ({...prevState, firstName: text}))
        }
      />
      <KInput
        label={'Last Name'}
        value={profileState.lastName}
        onChangeText={(text: any) =>
          setProfileState(prevState => ({...prevState, lastName: text}))
        }
      />
      <KInput label={'Email'} value={profileState.email} editable={false} />
      <KInput
        label={'Contact Number'}
        value={profileState.contactNumber}
        onChangeText={(text: any) =>
          setProfileState(prevState => ({...prevState, contactNumber: text}))
        }
      />
      <TextInput
        mode="outlined"
        label={'Enter your Location'}
        value={profileState.location}
        onChangeText={text =>
          setProfileState(prevState => ({...prevState, location: text}))
        }
        left={
          <TextInput.Icon
            onPress={() => {
              navigation.navigate('SelectLocation', {
                setAddress: (text: any) =>
                  setProfileState(prevState => ({
                    ...prevState,
                    location: text,
                  })),
                setLat: (lat: any) =>
                  setProfileState(prevState => ({...prevState, latitude: lat})),
                setLng: (lng: any) =>
                  setProfileState(prevState => ({
                    ...prevState,
                    longitude: lng,
                  })),
              });
            }}
            icon="map-marker"
          />
        }
      />
      <KInput
        label={'Bio'}
        multiline={true}
        value={profileState.bio}
        onChangeText={(text: any) =>
          setProfileState(prevState => ({...prevState, bio: text}))
        }
      />
      <KInput
        label={'Specialties'}
        value={profileState.specialties}
        onChangeText={(text: any) =>
          setProfileState(prevState => ({...prevState, specialties: text}))
        }
      />
    </>
  );

  const renderTextViews = () => (
    <>
      <Text variant="titleMedium">First Name</Text>
      <Text variant="bodyLarge" style={styles.text}>
        {profileState.firstName}
      </Text>
      <Text variant="titleMedium">Last Name</Text>
      <Text variant="bodyLarge" style={styles.text}>
        {profileState.lastName}
      </Text>
      <Text variant="titleMedium">Email Address</Text>
      <Text variant="bodyLarge" style={styles.text}>
        {profileState.email}
      </Text>
      <Text variant="titleMedium">Contact Number</Text>
      <Text variant="bodyLarge" style={styles.text}>
        {profileState.contactNumber}
      </Text>
      <Text variant="titleMedium">Location</Text>
      <Text variant="bodyLarge" style={styles.text}>
        {profileState.location}
      </Text>
      <Text variant="titleMedium">Bio</Text>
      <Text variant="bodyLarge" style={styles.text}>
        {profileState.bio}
      </Text>
      <Text variant="titleMedium">Specialties</Text>
      <Text variant="bodyLarge" style={styles.text}>
        {profileState.specialties}
      </Text>
    </>
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Profile" />
        <Menu
          visible={profileState.isMenuVisible}
          onDismiss={() =>
            setProfileState(prevState => ({
              ...prevState,
              isMenuVisible: false,
            }))
          }
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={() =>
                setProfileState(prevState => ({
                  ...prevState,
                  isMenuVisible: true,
                }))
              }
            />
          }>
          <Menu.Item
            title="Logout"
            onPress={() => {
              dispatch(logoutUser());
            }}
          />
        </Menu>
      </Appbar.Header>
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl
            refreshing={profileState.isRefreshing}
            onRefresh={onRefresh}
          />
        }>
        {user ? (
          <>
            <View style={styles.container}>
              <Text variant="headlineMedium">Profile</Text>
              <Spacer height={10} />
              <View style={styles.profileMain}>
                {user?.photo ? (
                  <Image
                    source={{uri: user?.photo}}
                    style={styles.profileImage}
                  />
                ) : (
                  <IconButton icon={'account-circle'} size={40}/>
                )}
                <View>
                  <Text variant="bodyLarge">
                    {profileState.firstName} {profileState.lastName}
                  </Text>
                  <Button
                    mode="text"
                    style={{marginHorizontal: -10, alignItems: 'flex-start'}}
                    onPress={() =>
                      setProfileState(prevState => ({
                        ...prevState,
                        isEditingMode: true,
                      }))
                    }>
                    <Text style={{textDecorationLine: 'underline'}}>
                      edit profile
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
            <View style={styles.form}>
              {profileState.isEditingMode
                ? renderTextFields()
                : renderTextViews()}
              <Spacer height={10} />
              {profileState.isEditingMode && (
                <View style={styles.buttons}>
                  <ButtonPrimary
                    onPress={() => updateProfile()}
                    loading={profileState.updateLoading}>
                    Update
                  </ButtonPrimary>
                  <ButtonSecondary
                    onPress={() =>
                      setProfileState(prevState => ({
                        ...prevState,
                        isEditingMode: false,
                      }))
                    }>
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

export default AProfile;

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
