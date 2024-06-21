import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
interface SpacerProps {
  height: number;
}
const Spacer = ({height, ...props}: SpacerProps) => {
  return <View style={{marginVertical: height}}></View>;
};

export default Spacer;

const styles = StyleSheet.create({});
