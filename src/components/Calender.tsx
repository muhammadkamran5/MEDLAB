import CalendarPicker from 'react-native-calendar-picker';

import {StyleSheet, View} from 'react-native';
import React from 'react';

const Calender = (props: any) => {
  return (
    <CalendarPicker
      onDateChange={(date: any) =>
        props.setDate(date.toISOString().split('T')[0].replace(/-/g, '/'))
      }
    />
  );
};

export default Calender;

const styles = StyleSheet.create({});
