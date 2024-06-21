import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import BackIcon from '../../../../../assets/Back.svg';
import {Appbar, Divider, Icon, IconButton, Text} from 'react-native-paper';
import Spacer from '../../../../components/Spacer';
import KInput from '../../../../components/KInput';
import ButtonPrimary from '../../../../components/ButtonPrimary';

const ConfirmAppointment = ({navigation}: any) => {
  const data = [
    {
      image: require('./Card1.png'),
    },
    {
      image: require('./Card2.png'),
    },
  ];
  return (
    <ScrollView>
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
        <Spacer height={7} />
        <FlatList
          horizontal
          data={data}
          renderItem={({item}) => (
            <View>
              <Image
                source={item.image}
                style={{
                  borderRadius: 10,
                  marginRight: 10,
                }}
              />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
        <Pressable>
          <Text variant="bodyLarge">Manage Cards {'>'}</Text>
        </Pressable>
        <Spacer height={7} />

        <ButtonPrimary
          style={styles.payButton}
          onPress={() => navigation.navigate('AppointmentConfirmAlert')}>
          Pay now
        </ButtonPrimary>
      </View>
    </ScrollView>
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
  payButton: {
    alignSelf: 'center',
    width: '50%',
    marginBottom: 20,
  },
});
