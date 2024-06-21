import {StyleSheet, TextInput, View} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';
interface KInputProps {
  label?: string;
  value?: string;
  multiline?: boolean;
  onChangeText?: (text: string) => void;
  editable?: boolean;
}

const KInput = ({
  label,
  value,
  multiline,
  onChangeText,
  style,
  ...props
}: any) => {
  return (
    <View>
      {label && <Text variant="bodyLarge">{label}:</Text>}
      <TextInput
        value={value || ''}
        style={[styles.inputField, style || {}]}
        multiline={multiline}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};

export default KInput;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
});
