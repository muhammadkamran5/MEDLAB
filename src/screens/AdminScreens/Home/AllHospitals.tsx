import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Appbar, Divider} from 'react-native-paper';
import BackIcon from '../../../../assets/Back.svg';
import SearchBar from '../../../components/SearchBar';
import Spacer from '../../../components/Spacer';
import HospitalCard from '../../../components/HospitalInfoCard';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllClinics} from '../../../redux/reducers/clinicsReducer';
import {useFocusEffect} from '@react-navigation/native';

const AAllHospitals = ({navigation}: any) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const clinic = useSelector((state: any) => state.clinic);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchAllClinics());
    }, []),
  );
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

        <FlatList
          data={clinic}
          renderItem={({item}) => (
            <>
              <HospitalCard
                onPress={() =>
                  navigation.navigate('AHospitalDetail', {id: item?.id})
                }
                title={item.name}
                location={item.address}
                ratingCount={item?.feedbacks?.length || 0}
                rating={
                  item?.feedbacks?.reduce((a: any, b: any) => a + b.rating, 0) /
                    item?.feedbacks?.length || 0
                }
                email={item.email}
              />

              <Spacer height={5} />
              <Divider />
              <Spacer height={5} />
            </>
          )}
        />
      </View>
    </>
  );
};

export default AAllHospitals;

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
