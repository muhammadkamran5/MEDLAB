import {Pressable, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import {Appbar, List, Text} from 'react-native-paper';
import {FlatList} from 'react-native';
import SearchBar from '../../components/SearchBar';
import Spacer from '../../components/Spacer';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {fetchAllComunities} from '../../redux/reducers/communityReducer';
import {useFocusEffect} from '@react-navigation/native';

const MedLabCommunity = ({navigation}: any) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const community = useSelector((state: any) => state.community);
  const [searchText, setSearchText] = React.useState('');
  console.log(community);
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchAllComunities());
    }, []),
  );

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
          data={community}
          renderItem={({item}: any) => {
            return (
              <List.Item
                description={item.title}
                descriptionStyle={{fontWeight: 'bold', fontSize: 14}}
                title={item.createdAt}
                right={() => (
                  <View style={{alignItems: 'flex-end'}}>
                    <View style={{flexDirection: 'row', gap: 5}}>
                      <List.Icon icon={'message'} />
                      <Text>{item?.comments?.length || 0}</Text>
                    </View>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('CommunityDetail', {
                          id: item.id,
                        })
                      }>
                      <Text style={{color: '#225B6E'}}>See More {'>'}</Text>
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
