import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import Spacer from '../../../../components/Spacer';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import MedicalIcon from '../../../../../assets/medical_icon.svg';
import CheckIcon from '../../../../../assets/check.svg';

const DoctorPrecription = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MedicalIcon />
        <Text variant="headlineSmall">No Precription Found</Text>
        <Text style={{textAlign: 'center'}}>
          Start consulting with PMC verified doctors to have your own E-Medical
          Record
        </Text>
        <View>
          <Text>
            <CheckIcon /> PMC Verified Docotrs
          </Text>
          <Text>
            <CheckIcon /> 16,000 Doctors
          </Text>
        </View>
        <ButtonPrimary style={{alignSelf: 'center'}}>
          Consult Online
        </ButtonPrimary>
      </View>
      <Spacer height={10} />
      <View style={styles.footer}>
        <Text style={{textAlign: 'center'}}>
          All your added records/MEDLAB Doctor's Precriptions will appear here!
        </Text>
      </View>
    </View>
  );
};

export default DoctorPrecription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  footer: {
    marginBottom: 10,
  },
});
