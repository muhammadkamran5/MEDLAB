import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {getUpComingAppointments} from '../../../../redux/reducers/appointmentReducer';
import {Divider, List} from 'react-native-paper';

const Upcoming = ({route}: any) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const appointments = useSelector((state: any) => state.appointments);

  return (
    <FlatList
      style={{marginHorizontal: 10}}
      data={appointments}
      renderItem={({item}) => (
        <>
          <List.Item title={item.note} description={item.date} />
          <Divider />
        </>
      )}
    />
  );
};

export default Upcoming;

const styles = StyleSheet.create({});
