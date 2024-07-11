import React, {useState} from 'react';
import {StyleSheet, View, Platform, ToastAndroid} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../../../themes/theme';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ButtonSecondary from '../../../components/ButtonSecondary';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import BackIcon from '../../../../assets/Back.svg';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {updateClinicById} from '../../../redux/reducers/clinicsReducer';
const EditHospital = ({route, navigation}: any) => {
  const {id} = route.params;
  const clinic = useSelector((state: any) => state.clinic);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [location, setLocation] = useState(clinic?.address);
  const [lng, setLng] = useState(clinic?.location?.lng);
  const [lat, setLat] = useState(clinic?.location?.lat);
  const [openTime, setOpenTime] = useState(clinic?.open_time);
  const [closeTime, setCloseTime] = useState(clinic?.close_time);
  const [name, setName] = useState(clinic?.name);
  const [contactNumber, setContactNumber] = useState(clinic?.contactNumber);
  const [email, setEmail] = useState(clinic?.email);
  const [isLoading, setLoading] = useState(false);

  const showTimePicker = (currentMode: any, setTime: any) => {
    DateTimePickerAndroid.open({
      value: new Date(),

      onChange: (event, selectedTime) => {
        if (event.type === 'set') {
          const currentTime = selectedTime || new Date();
          setTime(
            currentTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            }),
          );
        }
      },
      mode: currentMode,
      is24Hour: false,
    });
  };

  return (
    <>
      <Appbar.Header>
        <BackIcon
          onPress={() => navigation.goBack()}
          style={{marginLeft: 20}}
        />
        <Appbar.Content title="Edit Hospital" style={{marginLeft: 10}} />
      </Appbar.Header>
      <View style={styles.container}>
        <TextInput
          left={<TextInput.Icon icon={'account'} />}
          value={name}
          onChangeText={setName}
          label={'Name'}
          mode="outlined"
          theme={{colors: {primary: colors.PRIMARY}}}
        />
        <TextInput
          left={<TextInput.Icon icon={'phone'} />}
          value={contactNumber}
          onChangeText={setContactNumber}
          label={'Phone'}
          mode="outlined"
          theme={{colors: {primary: colors.PRIMARY}}}
        />
        <TextInput
          left={<TextInput.Icon icon={'email'} />}
          value={email}
          onChangeText={setEmail}
          label={'Email'}
          mode="outlined"
          theme={{colors: {primary: colors.PRIMARY}}}
        />
        <TextInput
          mode="outlined"
          label={'Location'}
          value={location}
          editable={false}
          left={
            <TextInput.Icon
              onPress={() => {
                navigation.navigate('SelectLocation', {
                  setAddress: setLocation,
                  setLng,
                  setLat,
                });
              }}
              icon="map-marker"
            />
          }
        />
        <TextInput
          left={
            <TextInput.Icon
              icon={'clock'}
              onPress={() => showTimePicker('time', setOpenTime)}
            />
          }
          value={openTime}
          label={'Opening Time'}
          editable={false}
          mode="outlined"
          theme={{colors: {primary: colors.PRIMARY}}}
        />
        <TextInput
          left={
            <TextInput.Icon
              icon={'clock'}
              onPress={() => showTimePicker('time', setCloseTime)}
            />
          }
          value={closeTime}
          label={'Closing Time'}
          editable={false}
          mode="outlined"
          theme={{colors: {primary: colors.PRIMARY}}}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <ButtonSecondary onPress={() => navigation.goBack()}>
            Cancel
          </ButtonSecondary>
          <ButtonPrimary
            onPress={async () => {
              setLoading(true);
              await dispatch(
                updateClinicById({
                  id: clinic?.id,
                  name,
                  email,
                  contactNumber,
                  location: {
                    lat,
                    lng,
                  },
                  open_time: openTime,
                  close_time: closeTime,
                }),
              );
              ToastAndroid.show(
                'Hospital updated successfully',
                ToastAndroid.SHORT,
              );
              navigation.goBack();
            }}
            loading={isLoading}>
            Update
          </ButtonPrimary>
        </View>
      </View>
    </>
  );
};

export default EditHospital;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    gap: 20,
    justifyContent: 'center',
  },
});
