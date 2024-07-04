import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import Spacer from '../../../../components/Spacer';
import MedicalIcon from '../../../../../assets/medical_icon.svg';
import CheckIcon from '../../../../../assets/check.svg';
import PlusIcon from '../../../../../assets/plus.svg';

const MyReports = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MedicalIcon />
        <Text variant="headlineSmall" style={{fontSize: 20}}>
          Keep Your Medical Records Save!
        </Text>
        <Text style={{textAlign: 'center'}}>
          Start managing your medical health records!
        </Text>
        <View>
          <Text>
            <CheckIcon /> Upload and save records
          </Text>
          <Text>
            <CheckIcon /> Share records with doctors
          </Text>
        </View>
        <ButtonPrimary
          style={{alignSelf: 'center', justifyContent: 'center' , gap: 5}}
          icon={'plus'}>
          <PlusIcon /> Consult Online
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

export default MyReports;
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
