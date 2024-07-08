import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Appbar} from 'react-native-paper';
import BackIcon from '../../../../../../assets/Back.svg';
import SearchBar from '../../../../../components/SearchBar';
import Spacer from '../../../../../components/Spacer';
import HospitalCard from '../../../../../components/HospitalInfoCard';

const AllHospitals = ({navigation}: any) => {
  useEffect(() => {});
  return (
    <>
      <Appbar.Header>
        <BackIcon
          onPress={() => navigation.goBack()}
          style={{marginLeft: 20}}
        />

        <Appbar.Content title="All Hospitals" style={{marginLeft: 10}} />
      </Appbar.Header>
      <View style={styles.container}>
        <SearchBar placeholder="Search" style={styles.searchBar} />
        <Spacer height={10} />
      
      <HospitalCard
        title="Hospital"
        location="Lahore"
        rating={4.5}
        ratingCount={2}
      />
      </View>
      
    </>
  );
};

export default AllHospitals;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  searchBar: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
});
