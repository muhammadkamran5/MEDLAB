import {StyleSheet, View, FlatList, ScrollView, Pressable} from 'react-native';
import {Divider, Text, Modal, Portal, Menu, Button} from 'react-native-paper';
import React, {useCallback, useEffect} from 'react';
import {Appbar, IconButton, TextInput} from 'react-native-paper';
import MenuBarIcon from '../../../../../assets/menuBarIcon.svg';
import SearchBar from '../../../../components/SearchBar';
import KInput from '../../../../components/KInput';
import Spacer from '../../../../components/Spacer';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import DoctorInformationCard from '../../../../components/DoctorInformationCard';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {Dimensions} from 'react-native';

import {
  fetchDoctors,
  fetchDoctorsBySearch,
  fetchDoctorsBySearchAndSort,
  sortByName,
} from '../../../../redux/reducers/doctorReducer';
import {useFocusEffect} from '@react-navigation/native';
import Calender from '../../../../components/Calender';

const ShowSpecilistDoctors = ({navigation}: any) => {
  const width = Dimensions.get('window').width;
  const doctors = useSelector((state: any) => state.doctors);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [search, setSearch] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [date, setDate]: any = React.useState(null);
  const [longitude, setLongitude] = React.useState(0);
  const [latitude, setLatitude] = React.useState(0);
  const [showTooltip, setShowTooltip] = React.useState(false);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchDoctors());
    }, []),
  );

  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(fetchDoctors());
    setIsRefreshing(false);
  };

  const handleSearch = async () => {
    dispatch(
      fetchDoctorsBySearch({search, address, date, latitude, longitude}),
    );
  };
  const getAverageRating = (feedbacks: any) => {
    const feedback = feedbacks.map((feedback: any) => feedback.rating);
    const averageRating =
      feedback.reduce((a: number, b: number) => a + b, 0) / feedback.length;
    return averageRating;
  };

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <Appbar.Header>
            <View style={styles.contentContainer}>
              <IconButton
                style={styles.iconButton}
                icon={() => <MenuBarIcon />}
                onPress={() => {}}
              />
              <Text style={styles.title}>Book an Appointment</Text>
            </View>
          </Appbar.Header>
          <SearchBar
            placeholder="Doctor, Specialist"
            value={search}
            onChangeText={setSearch}
          />

          <Spacer height={8} />

          <TextInput
            style={styles.locationInput}
            mode="flat"
            left={
              <TextInput.Icon
                icon={'map-marker'}
                color={'#225B6E'}
                onPress={() =>
                  navigation.navigate('SelectLocation', {
                    setAddress,
                    setLat: setLatitude,
                    setLng: setLongitude,
                  })
                }
              />
            }
            value={address}
            // onChangeText={setAddress}
            disabled
            placeholder={'Select Area'}
          />

          <Spacer height={8} />

          <TextInput
            style={styles.locationInput}
            mode="flat"
            value={date ? date : ''}
            left={
              <TextInput.Icon
                icon={'calendar'}
                color={'#225B6E'}
                onPress={() => setShowModal(true)}
              />
            }
            placeholder={'Select Date'}
          />

          <Spacer height={8} />

          <View style={{width: '50%', alignSelf: 'center'}}>
            <ButtonPrimary onPress={handleSearch}>Search</ButtonPrimary>
          </View>

          <Spacer height={8} />

          <View style={styles.specialistHeading}>
            <Text variant="titleMedium">All Specialities</Text>

            <Menu
              visible={showTooltip}
              onDismiss={() => setShowTooltip(false)}
              anchor={
                <IconButton
                  icon={'filter-variant'}
                  onPress={() => setShowTooltip(true)}
                />
              }
              contentStyle={{backgroundColor: 'white'}}>
              <View style={{alignSelf: 'flex-start'}}>
                <Button
                  onPress={() =>
                    dispatch(
                      fetchDoctorsBySearchAndSort({
                        search,
                        address,
                        date,
                        latitude,
                        longitude,
                      }),
                    )
                  }>
                  <Text style={{textAlign: 'left'}}>Sort By Location</Text>
                </Button>
                <Button contentStyle={{padding: 0}}>
                  <Text
                    style={{textAlign: 'left'}}
                    onPress={() => dispatch(sortByName())}>
                    Sort By Name
                  </Text>
                </Button>
                <Button>
                  <Text style={{textAlign: 'left'}}>Sort By Rating</Text>
                </Button>
              </View>
            </Menu>
          </View>

          <Spacer height={8} />
          <Portal>
            <Modal
              visible={showModal}
              onDismiss={() => setShowModal(false)}
              style={{backgroundColor: 'white'}}>
              <Calender setDate={setDate} />
            </Modal>
          </Portal>
        </>
      }
      data={doctors}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      keyExtractor={(item: any) => item.uid}
      renderItem={({item}) => (
        <>
          <Pressable
            style={styles.doctorItem}
            onPress={() => navigation.navigate('DoctorDetail', item.uid)}>
            <DoctorInformationCard
              title={item?.fullName}
              location={item?.address}
              occopation={item?.specialties}
              ratingCount={item?.feedbacks?.length}
              rating={getAverageRating(item?.feedbacks)}
            />
            <IconButton icon={'dots-vertical'} onPress={() => {}} />
          </Pressable>
          <Divider bold horizontalInset />
        </>
      )}
    />
  );
};

export default ShowSpecilistDoctors;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  iconButton: {
    height: 20,
    width: 22,
    marginLeft: 17,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 17,
    color: '#225B6E',
  },
  locationInput: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,

    elevation: 5,
  },
  specialistHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
  },
  doctorItem: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
  },
});
