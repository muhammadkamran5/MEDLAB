import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useState} from 'react';
import {Appbar} from 'react-native-paper';
import BackIcon from '../../../../../assets/Back.svg';
import Spacer from '../../../../components/Spacer';
import SearchBar from '../../../../components/SearchBar';
import {SceneMap, TabView} from 'react-native-tab-view';
import MyReports from './MyReports';
import DoctorPrecription from './DoctorPrecription';
import CustomTabBar from '../../../../components/CustomTabBar';

const renderScene = SceneMap({
  first: MyReports,
  second: DoctorPrecription,
});
const Records = ({navigation}: any) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'My Reports'},
    {key: 'second', title: 'Doctor Precription'},
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
        <Text variant="headlineSmall">Medical Records</Text>
        <Spacer height={10} />
        <SearchBar placeholder="Search" />
      </View>
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

export default Records;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
