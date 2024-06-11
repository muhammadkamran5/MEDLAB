import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Searchbar} from 'react-native-paper';

const SearchBar = (props: any) => {
  return <Searchbar {...props} style={styles.searchBar} />;
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginHorizontal: 20,
  },
});
