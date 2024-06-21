import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import React from 'react';
import Spacer from '../../../../components/Spacer';
import {Appbar, Divider} from 'react-native-paper';
import KInput from '../../../../components/KInput';
import BackIcon from '../../../../../assets/Back.svg';
import ConfirmAlterSVG from '../../../../../assets/confirm_alert.svg';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import Done from '../../../../../assets/true.svg';

const AppointmentConfirmAlert = ({navigation}: any) => {
  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.Action
          icon={() => <BackIcon />}
          onPress={() => navigation.goBack()}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <Done />
          <Text variant="bodyLarge" style={styles.headingText}>
            Appointment Confirmed!
          </Text>
        </View>

        <Spacer height={7} />

        <View style={styles.dateCard}>
          <Text variant="displaySmall">Thu, 09 Apr</Text>
        </View>
        <Spacer height={7} />

        <View style={styles.locationContainer}>
          <IconButton icon={'map-marker'} />
          <Text>DHMC, Lahore - 7 km</Text>
        </View>

        <Spacer height={5} />
        <Divider />
        <Spacer height={10} />
        <View style={{alignSelf: 'center'}}>
          <ConfirmAlterSVG />
        </View>
        <Spacer height={5} />
        <ButtonPrimary style={{alignSelf: 'center', marginTop: 30}}>
          Reminder Alert
        </ButtonPrimary>
      </View>
      <Text style={{alignSelf: 'center'}}>
        2 days 3 hours before the appointment
      </Text>
    </ScrollView>
  );
};

export default AppointmentConfirmAlert;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    height: Dimensions.get('window').height * 0.75,
  },
  headingText: {
    fontSize: 18,
  },
  dateCard: {
    padding: 10,
    backgroundColor: '#fff',
    alignSelf: 'baseline',
  },
  locationContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  payButton: {
    alignSelf: 'center',
    width: '50%',
    marginBottom: 20,
  },
});
