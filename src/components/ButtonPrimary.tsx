import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

const ButtonPrimary = ({children}: any, props: any) => {
  return (
    <Button
      buttonColor="#225B6E"
      {...props}
      style={styles.button}
      textColor="#fff">
      {children}
    </Button>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
