import {StyleSheet, View} from 'react-native';
import React from 'react';
import BackIcon from '../../../../../assets/Back.svg';
import {Appbar , Text } from 'react-native-paper';
import SearchBar from '../../../../components/SearchBar';

const MyAppointments = ({navigation}: any) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action
          icon={() => <BackIcon />}
          onPress={() => navigation.goBack()}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <Text variant="headlineMedium">My Appointments</Text>
      </View>
      <SearchBar placeholder='Search' value='' style={styles.searchBar}/>
    </>
  );
};

export default MyAppointments;

const styles = StyleSheet.create({
  container:{
    margin: 15
  }, 
  searchBar:{

  }
});
