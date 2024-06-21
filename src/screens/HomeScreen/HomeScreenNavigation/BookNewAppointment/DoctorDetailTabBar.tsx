import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import {SceneMap, TabView} from 'react-native-tab-view';

import CustomTabBar from '../../../../components/CustomTabBar';
import ClinicinfoScreen from './DoctorInformation/ClinicinfoScreen';
import DoctorScreen from './DoctorInformation/DoctorScreen';
import FeedbacksScreen from './DoctorInformation/FeedbacksScreen';

const renderScene = SceneMap({
  first: DoctorScreen,
  second: ClinicinfoScreen,
  third: FeedbacksScreen,
});

const DoctorDetailTabBar = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Doctor'},
    {key: 'second', title: 'Clinic'},
    {key: 'third', title: 'Feedbacks'},
  ]);
  return (
    <>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props => {
          return <CustomTabBar {...props} tabs={routes} />;
        }}
      />
    </>
  );
};

export default DoctorDetailTabBar;

const styles = StyleSheet.create({});
