import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

const ButtonSecondary = (props: any) => {
  return (
    <Button
      buttonColor="#FFFFFF"
      rippleColor={'#fff'}
      {...props}
      style={{borderRadius: 10}}
      labelStyle={styles.button}
      textColor="#225B6E">
      {props.children}
    </Button>
  );
};

export default ButtonSecondary;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
