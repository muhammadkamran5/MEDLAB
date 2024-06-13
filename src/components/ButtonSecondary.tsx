import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

const ButtonSecondary = ({children}: any, props: any) => {
  return (
    <Button
      buttonColor="#FFFFFF"
      {...props}
      style={styles.button}
      textColor="#225B6E">
      {children}
    </Button>
  );
};

export default ButtonSecondary;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
