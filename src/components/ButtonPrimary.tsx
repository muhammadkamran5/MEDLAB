import {StyleSheet, Text, View} from 'react-native';
import React, { ReactNode } from 'react';
import {Button} from 'react-native-paper';
import { colors } from '../../themes/theme';

interface ButtonPrimaryProps {
  children: ReactNode;
  buttonColor?: string;
  textColor?: string;

}

const ButtonPrimary = ({
  children,
  style,
  buttonColor,
  textColor,
  ...props
}: any) => {
  return (
    <Button
      buttonColor={buttonColor || colors.PRIMARY}
      {...props}
      style={[{borderRadius: 5}, style]}
      textColor={textColor || '#fff'}
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
  },
});
