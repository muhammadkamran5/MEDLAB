import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

const ButtonSecondary = (props: any) => {
  return (
    <Button
      buttonColor="#FFFFFF"
      rippleColor={'#fff'}
      {...props}
      style={styles.button}
      textColor="#225B6E">
      {props.children}
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
