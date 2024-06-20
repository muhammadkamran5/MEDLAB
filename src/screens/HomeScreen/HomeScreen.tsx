import * as React from 'react';
import {
  Appbar,
  Button,
  Card,
  IconButton,
  Text,
} from 'react-native-paper';
import {View, StyleSheet, Dimensions} from 'react-native';
import MenuBarIcon from '../../../assets/menuBarIcon.svg';
import Spacer from '../../components/Spacer';
import Records from '../../../assets/Records.svg';
import Community from '../../../assets/community.svg';
import Appointments from '../../../assets/appointment.svg';
import Hospitals from '../../../assets/hospitals.svg';
import CheckTrue from '../../../assets/check_true.svg';
import UserIcon from '../../../assets/userIcon.svg';
import Lock from '../../../assets/Lock.svg';
import styles from './styles';
import SearchBar from '../../components/SearchBar';

import {FlatGrid} from 'react-native-super-grid';
import {useState} from 'react';

const {height} = Dimensions.get('window');

const HomeScreen = ({navigation}: any) => {
  const [searchText, setSearchText] = useState('');
  const data = [
    {
      title: 'Appointments',
      image: <Appointments />,
      navigationUrl: 'MyAppointments',
    },
    {
      title: 'Records',
      image: <Records />,
      navigationUrl: 'Records',
    },
    {
      title: 'Community',
      image: <Community />,
      navigationUrl: 'Community',
    },
    {
      title: 'Hospitals',
      image: <Hospitals />,
      navigationUrl: 'Hospitals',
    },
  ];

  return (
    <>
      <Appbar.Header>
        <View style={styles.contentContainer}>
          <IconButton
            style={styles.iconButton}
            icon={() => <MenuBarIcon />}
            onPress={() => {}}
          />
          <Text style={styles.title}>Home</Text>
        </View>
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>

      <SearchBar
        value={searchText}
        placeholder="Search"
        onChangeText={setSearchText}
        style={styles.searchBar}
      />

      <FlatGrid
        style={styles.grid}
        itemDimension={120}
        scrollEnabled={false}
        data={data}
        spacing={10}
        renderItem={({item}) => (
          <Card
            style={styles.card}
            onPress={() => navigation.navigate(item.navigationUrl)}>
            <Card.Title
              title={item.title}
              titleVariant="bodyLarge"
              titleStyle={styles.cardTitle}
            />
            <View style={styles.cardImage}>{item.image}</View>
          </Card>
        )}
      />
      <Spacer height={10} />
      <Card style={styles.askCard}>
        <Text>
          <CheckTrue /> Ask anonymously
        </Text>
        <Text>
          <CheckTrue /> Free and ask question any time
        </Text>
        <Text>
          <CheckTrue /> Get replies from PMC Verified Doctors
        </Text>
        <Card.Actions>
          <View style={styles.cardButtons}>
            <Button
              mode="contained"
              buttonColor="#ECF1FA"
              textColor="#225B6E"
              style={styles.button}>
              View All Questions
            </Button>
            <Button
              mode="contained-tonal"
              buttonColor="#3AA1A2"
              textColor="#fff"
              style={styles.button}>
              Ask a Question
            </Button>
          </View>
        </Card.Actions>
      </Card>

      <Spacer height={10} />
      <Card style={styles.buttons}>
        <View>
          <Button
            mode="text"
            textColor="#000"
            icon={() => <UserIcon />}
            style={{display: 'flex', flexDirection: 'row'}}>
            <Text variant="bodySmall">PMC Verified Doctors</Text>
          </Button>
          <Button
            mode="text"
            textColor="#000"
            icon={() => <Lock />}
            style={{display: 'flex', flexDirection: 'row'}}>
            <Text variant="bodySmall">Secure Online Payments</Text>
          </Button>
        </View>
      </Card>
      <Spacer height={10} />
    </>
  );
};

export default HomeScreen;
