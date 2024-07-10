import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import { colors } from '../../themes/theme';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.PRIMARY}/>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
