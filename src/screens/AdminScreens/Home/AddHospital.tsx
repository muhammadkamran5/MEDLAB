import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  ToastAndroid,
  ScrollView,
  LogBox,
} from 'react-native';
import {Appbar, IconButton, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../../../themes/theme';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ButtonSecondary from '../../../components/ButtonSecondary';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import BackIcon from '../../../../assets/Back.svg';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {
  addClinic,
  updateClinicById,
} from '../../../redux/reducers/clinicsReducer';
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import {fetchAllServices} from '../../../redux/reducers/servicesReducer';
import {useFocusEffect} from '@react-navigation/native';
import ServiceTag from '../../../components/ServiceTag';

const AddHospital = ({route, navigation}: any) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const services = useSelector((state: any) => state.services);
  const [location, setLocation] = useState('');
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [clinicServices, setClinicServices]: any = useState([]);
  const [allServices, setAllServices] = useState([
    {label: 'Select Services', value: ''},
  ]);
  const [selectedService, setSelectedService]: any = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();

  useEffect(() => {
    dispatch(fetchAllServices());
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  useEffect(() => {
    setAllServices(
      services.map((service: any) => ({
        label: service.service_name,
        value: service.id,
      })),
    );
  }, [services]);

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
    <ScrollView contentContainerStyle={{flex: 1}}>
      <Appbar.Header>
        <BackIcon
          onPress={() => navigation.goBack()}
          style={{marginLeft: 20}}
        />
        <Appbar.Content title="Edit Hospital" style={{marginLeft: 10}} />
        <Appbar.Action
          icon={'content-save'}
          style={{paddingRight: 10}}
          onPress={() => {
            // Ensure not any field is empty
            if (
              name &&
              location &&
              email &&
              contactNumber &&
              openTime &&
              closeTime
            ) {
              dispatch(
                addClinic({
                  name,
                  address: location,
                  contactNumber,
                  email,
                  location: {
                    lng,
                    lat,
                  },
                  open_time: openTime,
                  close_time: closeTime,
                  services: clinicServices.map((service: any) => service.id),
                }),
              );
              ToastAndroid.show('Added Successfully', ToastAndroid.SHORT);
              navigation.goBack();
            } else {
              ToastAndroid.show(
                'Please fill all the fields',
                ToastAndroid.SHORT,
              );
            }
          }}
        />
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
        <DropDownPicker
          open={open}
          value={selectedService}
          items={allServices}
          setOpen={setOpen}
          setValue={setSelectedService}
          setItems={setAllServices}
          onChangeValue={text => {
            if (text) {
              const clinic = clinicServices.find(
                (item: any) => item.id === text,
              );
              if (!clinic) {
                setClinicServices([
                  ...clinicServices,
                  {
                    id: text,
                    service_name: allServices.find(
                      (item: any) => item.value === text,
                    )?.label,
                  },
                ]);
              }
            }
          }}
        />
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {clinicServices &&
            clinicServices?.map((service: any) => (
              <>
                <ServiceTag
                  key={service.id}
                  service={service}
                  isEditable={true}
                  onCrossPress={() => {
                    setClinicServices(
                      clinicServices.filter(
                        (item: any) => item.id !== service.id,
                      ),
                    );
                  }}
                />
              </>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default AddHospital;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    gap: 20,
    justifyContent: 'center',
  },
});
