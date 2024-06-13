import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Appbar, List, Text} from 'react-native-paper';
import data from '../../../assets/data.json';
import {FlatList} from 'react-native';
import SearchBar from '../../components/SearchBar';
import Spacer from '../../components/Spacer';

const MedLabCommunity = () => {
  const [searchText, setSearchText] = React.useState('');
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction />
      </Appbar.Header>

      <View style={styles.container}>
        <Text variant="headlineMedium">MedLab Community</Text>
      </View>
      <Spacer height={10} />
      <SearchBar
        value={searchText}
        placeholder="Search"
        onChangeText={setSearchText}
      />
      <Spacer height={10} />
      <View>
        <FlatList
          style={styles.list}
          data={data}
          renderItem={({item}: any) => {
            return (
              <List.Item
                title={item.message}
                right={() => <List.Icon icon={'message'} />}
              />
            );
          }}
        />
      </View>
    </>
  );
};

export default MedLabCommunity;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  list: {
    marginHorizontal: 10,
  },
});
