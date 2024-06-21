import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {Appbar, List, Text} from 'react-native-paper';
import data from './data.json';
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
                description={item.community_name}
                descriptionStyle={{fontWeight : 'bold' , fontSize : 14}}
                title={item.date}
                right={() => (
                  <View style={{alignItems: 'flex-end'}}>
                    <List.Icon icon={'message'} />
                    <Pressable>
                      <Text style={{color: '#225B6E'}}>See More {">"}</Text>
                    </Pressable>
                  </View>
                )}
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
