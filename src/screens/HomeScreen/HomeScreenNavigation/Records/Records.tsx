import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import BackIcon from '../../../../../assets/Back.svg';

const Records = ({navigation}: any) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action
          icon={() => <BackIcon />}
          onPress={() => navigation.goBack()}
        />
      </Appbar.Header>
      <View>
        <Text>Records</Text>
      </View>
    </>
  );
};

export default Records;

const styles = StyleSheet.create({});
