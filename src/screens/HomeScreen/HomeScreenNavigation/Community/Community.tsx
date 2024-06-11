import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import BackIcon from '../../../../../assets/Back.svg';

const Community = ({navigation}: any) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action
          icon={() => <BackIcon />}
          onPress={() => navigation.goBack()}
        />
      </Appbar.Header>
      <View>
        <Text>Community</Text>
      </View>
    </>
  );
};

export default Community;

const styles = StyleSheet.create({});
