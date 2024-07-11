import {Alert, Modal, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Appbar, Text} from 'react-native-paper';
import BackIcon from '../../../../assets/Back.svg';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {
  deleteClinicById,
  fetchClinicById,
} from '../../../redux/reducers/clinicsReducer';
import {colors} from '../../../../themes/theme';
import Spacer from '../../../components/Spacer';
import {Menu} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';

const HospitalDetail = ({route, navigation}: any) => {
  const {id} = route.params;
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const clinic = useSelector((state: any) => state.clinic);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isModalVisble, setIsModalVisible] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchClinicById(id));
    }, []),
  );

  useEffect(() => {
    if (clinic && clinic?.location) {
      setLatitude(parseFloat(clinic.location.lat) || 0);
      setLongitude(parseFloat(clinic.location.lng) || 0);
    }
  }, [clinic]);

  const confirmDelete = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this hospital?', [
      {
        text: 'Cancel',
        onPress: () => setVisible(false),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(deleteClinicById(id));
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <>
      <Appbar.Header>
        <BackIcon
          onPress={() => navigation.goBack()}
          style={{marginLeft: 20}}
        />
        <Appbar.Content title="Hospital Details" style={{marginLeft: 10}} />
        <Menu
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={() => setVisible(true)}
            />
          }
          visible={visible}
          onDismiss={() => setVisible(false)}>
          <Menu.Item
            title="Edit"
            onPress={() => {
              navigation.navigate('EditHospital', {id});
              setVisible(false);
            }}
            leadingIcon={'pencil'}
          />
          <Menu.Item
            title="Delete"
            onPress={confirmDelete}
            leadingIcon={'trash-can'}
          />
        </Menu>
      </Appbar.Header>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={{marginTop: 23}}>
          {clinic?.name}
        </Text>
        <Text variant="bodyMedium">
          <Text variant="labelMedium">Email: </Text>
          {clinic?.email}
        </Text>
        <Text variant="bodyMedium">
          <Text variant="labelMedium">Phone: </Text> {clinic?.contactNumber}
        </Text>
        <Text variant="bodyMedium">
          <Text variant="labelMedium">Timings: </Text>
          {clinic?.open_time} - {clinic?.close_time}
        </Text>
        <Text variant="headlineSmall">Location:</Text>
        <Spacer height={10} />
        {latitude && longitude ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 0.5}}
            region={{
              latitude,
              longitude,
              latitudeDelta: 0.09,
              longitudeDelta: 0.02,
            }}
            initialRegion={{
              latitude: 0,
              longitude: 0,
              latitudeDelta: 0.09,
              longitudeDelta: 0.02,
            }}>
            <Marker
              coordinate={{
                latitude,
                longitude,
              }}
            />
          </MapView>
        ) : (
          <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisble}>
            <View
              style={{
                flex: 1,
                borderRadius : 5, 
                justifyContent: 'center',
                backgroundColor: 'gray',
              }}>
              <View
                style={{
                  paddingVertical: 20,
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  marginHorizontal: 20,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  gap: 20,
                }}>
                <ActivityIndicator color={colors.PRIMARY} size={'large'} />
                <Text>Loading... Please Wait</Text>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </>
  );
};

export default HospitalDetail;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
  },
});
