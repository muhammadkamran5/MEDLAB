import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Spacer = (props: any) => {
  return <View style={{marginVertical: props.height}}></View>;
};

export default Spacer;

const styles = StyleSheet.create({});
