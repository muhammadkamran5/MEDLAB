import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

const ButtonPrimary = ({children, style, ...props}: any) => {
  return (
    <Button
      buttonColor="#225B6E"
      {...props}
      style={[{borderRadius: 10}, style]} 
      textColor="#fff"
      labelStyle={styles.button}>
      {children}
    </Button>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    // width : '100%',
  },
});
