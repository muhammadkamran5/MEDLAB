import {StyleSheet, View} from 'react-native';
import React from 'react';
import BackIcon from '../../../../../assets/Back.svg';
import {Appbar, Divider, Icon, IconButton, Text} from 'react-native-paper';
import Spacer from '../../../../components/Spacer';
import KInput from '../../../../components/KInput';

const ConfirmAppointment = ({navigation}: any) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action
          icon={() => <BackIcon />}
          onPress={() => navigation.goBack()}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <Text variant="bodyLarge" style={styles.headingText}>
          Dr. Abeera Mansoor Confirmation
        </Text>

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
        <KInput placeholder="Message" />
        <Spacer height={7} />
        <KInput placeholder="Reason of the Visit" />
        <Spacer height={7} />
        <Text variant="headlineMedium">Consultation {'\n'}PKR 3000</Text>
        <Spacer height={7} />
        <Text variant="headlineSmall" style={{color: '#225B6E'}}>
          Select the card
        </Text>
      </View>
    </>
  );
};

export default ConfirmAppointment;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  headingText: {
    fontSize: 18,
    marginTop: 10,
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
});
