import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Appbar , Text} from 'react-native-paper';

const ProfileScreen = () => {
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction />
      </Appbar.Header>

      <View style={styles.container}>
        <Text variant="displaySmall">Profile</Text>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});