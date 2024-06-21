import {StyleSheet, View, FlatList, ScrollView, Pressable} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import React from 'react';
import {Appbar, IconButton, TextInput} from 'react-native-paper';
import MenuBarIcon from '../../../../../assets/menuBarIcon.svg';
import SearchBar from '../../../../components/SearchBar';
import KInput from '../../../../components/KInput';
import Spacer from '../../../../components/Spacer';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import data from './data.json';
import DoctorInformationCard from '../../../../components/DoctorInformationCard';

const ShowSpecilistDoctors = ({navigation}: any) => {
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
          <SearchBar placeholder="Doctor, Specialist" />

          <Spacer height={8} />

          <TextInput
            style={styles.locationInput}
            mode="flat"
            left={
              <TextInput.Icon
                icon={'map-marker'}
                color={'#225B6E'}
                onPress={() => navigation.navigate('SelectLocation')}
              />
            }
            placeholder={'Select Area'}
          />

          <Spacer height={8} />

          <TextInput
            style={styles.locationInput}
            mode="flat"
            left={<TextInput.Icon icon={'calendar'} color={'#225B6E'} />}
            placeholder={'Select Date'}
          />

          <Spacer height={8} />

          <View style={{width: '50%', alignSelf: 'center'}}>
            <ButtonPrimary>Search</ButtonPrimary>
          </View>

          <Spacer height={8} />

          <View style={styles.specialistHeading}>
            <Text variant="titleMedium">All Specialities</Text>
            <IconButton icon={'filter-variant'} />
          </View>

          <Spacer height={8} />
        </>
      }
      data={data}
      renderItem={({item}) => (
        <>
          <Pressable
            style={styles.doctorItem}
            onPress={() => navigation.navigate('DoctorDetail')}>
            <DoctorInformationCard
              title={item.title}
              location={item.location}
              occopation={item.occupation}
              ratingCount={item.ratingCount}
            />
            <IconButton icon={'dots-vertical'} onPress={() => {}} />
          </Pressable>
          <Divider bold horizontalInset />
        </>
      )}
      keyExtractor={(item: any) => item.id}
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
