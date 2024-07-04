import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import Spacer from '../../components/Spacer';
import { Text } from 'react-native-paper';
import ButtonPrimary from '../../components/ButtonPrimary';

const SigninMethod = () => {
  const [items, setItems] = useState([
    {label: 'Doctor', value: 'doctor'},
    {label: 'Patient', value: 'patient'},
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
   <></>
  );
};

export default SigninMethod;

const styles = StyleSheet.create({});
