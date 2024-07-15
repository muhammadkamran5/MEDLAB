import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import BackIcon from '../../../../assets/Back.svg';
import {Appbar, Button, Text} from 'react-native-paper';
import SearchBar from '../../../components/SearchBar';
import Spacer from '../../../components/Spacer';
import CustomTabBar from '../../../components/CustomTabBar';
import {SceneMap, TabView} from 'react-native-tab-view';
import Past from './AppointmentTabs/Past';
import Upcoming from './AppointmentTabs/Upcoming';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {getPastAppointments, getUpComingAppointments} from '../../../redux/reducers/appointmentReducer';

const renderScene = SceneMap({
  first: Past,
  second: Upcoming,
});

const AAppointments = ({navigation}: any) => {
  const [index, setIndex] = React.useState(0);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  useEffect(() => {
    if (index == 1) {
      dispatch(getUpComingAppointments());
    }else{
      dispatch(getPastAppointments())
    }
  }, [index]);
  const [routes] = React.useState([
    {key: 'first', title: 'Past', index},
    {key: 'second', title: 'Upcoming', index},
  ]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action
          icon={() => <BackIcon />}
          onPress={() => navigation.goBack()}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <Text variant="headlineMedium">All Appointments</Text>
      </View>
      <View style={{marginHorizontal: 20}}>
        <SearchBar placeholder="Search" value="" />
      </View>
      <Spacer height={10} />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => {
          return <CustomTabBar {...props} tabs={routes} />;
        }}
      />
    </>
  );
};

export default AAppointments;

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  newAppointmentButtonParent: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 5,
  },
  newAppointmentButton: {
    borderRadius: 5,
  },
});
