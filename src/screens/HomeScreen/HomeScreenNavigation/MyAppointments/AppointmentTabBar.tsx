import * as React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import UpComing from './UpcomingAppointments/UpComing';
import Past from './PastAppointments/Past';
import {Text} from 'react-native-paper';
import CustomTabBar from '../../../../components/CustomTabBar';

const renderScene = SceneMap({
  first: UpComing,
  second: Past,
});

export default function AppointmentTabBar() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Upcoming'},
    {key: 'second', title: 'Past'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width }}
      renderTabBar={(props) => {
        return <CustomTabBar {...props} tabs={routes} />;
      }}
    />
  );
}
const styles = StyleSheet.create({

});
