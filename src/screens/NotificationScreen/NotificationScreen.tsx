import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Appbar, Text} from 'react-native-paper';

const NotificationScreen = () => {
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction />
      </Appbar.Header>
      <View style={styles.container}>
        <Text variant="displaySmall">Notifications</Text>
      </View>
    </>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});
