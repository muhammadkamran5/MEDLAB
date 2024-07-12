import {StyleSheet, View} from 'react-native';
import {colors} from '../../themes/theme';
import {IconButton, Text} from 'react-native-paper';
import React from 'react';
const ServiceTag = ({service, isEditable , onCrossPress}: any) => {
  return (
    <View style={[styles.serviceTag, isEditable && {paddingVertical: 0}]}>
      <Text style={styles.serviceText}>{service.service_name}</Text>
      {isEditable && <IconButton icon={'close'} iconColor="white" onPress={()=> onCrossPress()}/>}
    </View>
  );
};

export default ServiceTag;

const styles = StyleSheet.create({
  serviceTag: {
    flexDirection: 'row',
    gap: 5,

    alignItems: 'center',
    backgroundColor: colors.PRIMARY,
    padding: 10,

    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  serviceText: {
    color: 'white',
    fontSize: 14,
  },
});
