import * as React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import UpComing from './UpcomingAppointments/UpComing';
import Past from './PastAppointments/Past';
import {Text} from 'react-native-paper';

const renderScene = SceneMap({
  first: UpComing,
  second: Past,
});

const CustomTabBar = (props: any) => {
  return (
    <View style={styles.tabBarContainer}>
      <View>
        <Text
          style={props.navigationState.index == 0 && {color: '#225B6E'}}
          onPress={() => props.jumpTo('first')}>
          Up Comming
        </Text>
        {props.navigationState.index === 0 && (
          <View
            style={{
              height: 2,
              backgroundColor: '#225B6E',
              marginTop: 3,
              width: '80%',
            }}></View>
        )}
      </View>
      <View>
        <Text
          style={props.navigationState.index == 1 && {color: '#225B6E'}}
          onPress={() => props.jumpTo('second')}>
          Past
        </Text>
        {props.navigationState.index === 1 && (
          <View
            style={{
              height: 2,
              backgroundColor: '#225B6E',
              marginTop: 3,
              width: '80%',
            }}></View>
        )}
      </View>
    </View>
  );
};

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
      initialLayout={{width: layout.width}}
      renderTabBar={CustomTabBar}
    />
  );
}
const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
