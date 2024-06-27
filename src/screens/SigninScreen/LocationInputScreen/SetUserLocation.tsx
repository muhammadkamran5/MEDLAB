import {PermissionsAndroid, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import ButtonPrimary from '../../../components/ButtonPrimary';
import auth from '@react-native-firebase/auth';
import SearchBar from '../../../components/SearchBar';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {updateUser} from '../../../redux/reducers/userReducer';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';

const SetUserLocation = ({route, navigation}: any) => {
  const setAddress = route.params;
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const key = 'AIzaSyBOzLbI1W6cUoolrMY6qiNtco2qisO3iKM';
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  const [isPermission, setIsPermission] = useState(false);
  const user = auth().currentUser;
  const updateUserProfile = async () => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`,
      );
      const locationObj = await res.json();
      const address = locationObj.results[0].formatted_address;
      setAddress(address);
      const userData = {
        isFirstTime: 'no',
        location: {
          longitude,
          latitude,
        },
      };
      const userID = user?.uid;
      dispatch(
        updateUser({
          userData,
          userID,
        }),
      );
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Allow location to continue',
          message: 'Cool Location App needs access to your Location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsPermission(true);
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (isPermission) {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then(location => {
          console.log(location);
          setLongitude(location.longitude);
          setLatitude(location.latitude);
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
    }
  }, [isPermission]);

  return (
    <>
      <SearchBar />
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          onPress={e => {
            console.log(e.nativeEvent.coordinate);
            setLongitude(e.nativeEvent.coordinate.longitude);
            setLatitude(e.nativeEvent.coordinate.latitude);
          }}
          style={styles.map}
          region={{
            latitude: latitude || 31.512471193893077,
            longitude: longitude || 74.32450906052415,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          <Marker
            draggable
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title="HazelSoft"
            description="HazelSoft Software House"
            onDragEnd={e => {
              const coord = e.nativeEvent.coordinate;
              setLongitude(coord.longitude);
              setLatitude(coord.latitude);
              console.log(coord);
            }}
          />
        </MapView>
        <View style={styles.buttonContainer}>
          <ButtonPrimary
            onPress={() => updateUserProfile()}
            style={{width: '100%'}}>
            Confirm
          </ButtonPrimary>
        </View>
      </View>
    </>
  );
};

export default SetUserLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
