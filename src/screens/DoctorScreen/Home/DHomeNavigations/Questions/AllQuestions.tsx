import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import BackIcon from '../../../../../../assets/Back.svg';
import SearchBar from '../../../../../components/SearchBar';
import Spacer from '../../../../../components/Spacer';
import {SceneMap, TabView} from 'react-native-tab-view';
import AnsweredQuestions from './AnsweredQuestions';
import UnAnsweredQuestions from './UnAnsweredQuestions';
import CustomTabBar from '../../../../../components/CustomTabBar';

const renderScene = SceneMap({
  first: UnAnsweredQuestions,
  second: AnsweredQuestions,
});

const AllQuestions = ({navigation}: any) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Un Answered Questions'},
    {key: 'second', title: 'Answered Questions'},
  ]);
  return (
    <>
      <Appbar.Header>
        <BackIcon
          onPress={() => navigation.goBack()}
          style={{marginLeft: 20}}
        />

        <Appbar.Content title="View All Questions" style={{marginLeft: 10}} />
      </Appbar.Header>
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

export default AllQuestions;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});
