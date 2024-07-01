import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {colors} from '../../themes/theme';

const ButtonSecondary = (props: any) => {
  return (
    <Button
      buttonColor="#FFFFFF"
      rippleColor={'#fff'}
      {...props}
      style={{borderRadius: 10}}
      labelStyle={styles.button}
      textColor={colors.PRIMARY}>
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
