import {StyleSheet, TextInput, View} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';

const KInput = ({label, value, multiline}: any, props: any) => {
  return (
    <View>
      <Text variant='bodyLarge'>{label}:</Text>
      <TextInput
        value={value}
        style={styles.inputField}
        multiline={multiline}
      />
    </View>
  );
};

export default KInput;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: '#fff',
    paddingHorizontal : 10, 
    borderRadius : 5, 
    marginVertical : 5
  },
});
