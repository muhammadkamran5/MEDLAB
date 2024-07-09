import * as React from 'react';
import {
  Appbar,
  Button,
  Card,
  Icon,
  IconButton,
  Modal,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';
import {View, ScrollView, BackHandler} from 'react-native';
import MenuBarIcon from '../../../../assets/menuBarIcon.svg';
import Spacer from '../../../components/Spacer';
import Records from '../../../../assets/Records.svg';
import Community from '../../../../assets/community.svg';
import Appointments from '../../../../assets/appointment.svg';
import Hospitals from '../../../../assets/hospitals.svg';
import CheckTrue from '../../../../assets/check_true.svg';
import UserIcon from '../../../../assets/userIcon.svg';
import Lock from '../../../../assets/Lock.svg';
import styles from './styles';
import SearchBar from '../../../components/SearchBar';

import {FlatGrid} from 'react-native-super-grid';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

import DropDownPicker from 'react-native-dropdown-picker';
import ButtonSecondary from '../../../components/ButtonSecondary';
import ButtonPrimary from '../../../components/ButtonPrimary';
import {colors} from '../../../../themes/theme';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {setIsLogin} from '../../../redux/reducers/isLoginReducer';

// BackHandler.addEventListener('hardwareBackPress', () => {
//   BackHandler.exitApp();
//   return true;
// });

const DHome = ({navigation}: any) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const user = useSelector((state: any) => state.user.currentUser);
  const [searchText, setSearchText] = useState('');
  const [clinics, setClinics]: any = useState([]);
  const [selectedClinic, setSelectedClinic]: any = useState(null);
  const [isVisible, setVisible]: any = useState(false);
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    if (user && Array.isArray(user.clinic_id)) {
      const fetchClinics = async () => {
        const clinicPromises = user.clinic_id.map((id: any) =>
          firestore().collection('clinic').doc(id).get(),
        );
        const clinicsSnapShot = await Promise.all(clinicPromises);
        const clinicData: any = clinicsSnapShot.map(doc => ({
          label: doc.data().name,
          value: doc.id,
        }));
        setClinics(clinicData);
      };
      fetchClinics();
    }
  }, [user]);

  const getClinicName = () => {
    const clinic = clinics.find((c: any) => c.value === selectedClinic);
    return clinic ? clinic.label : '';
  };
  const isLogin = useSelector((state: any) => state.isLogin.isLogin);
  console.log(isLogin);

  const data = [
    {
      title: 'Appointments',
      image: <Appointments />,
      navigationUrl: 'DAppointments',
    },
    {
      title: 'Records',
      image: <Records />,
      navigationUrl: 'DRecords',
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
    <ScrollView>
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
      <View style={styles.container}>
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
              onPress={() => {
                if (item.navigationUrl == 'DAppointments') {
                  setVisible(true);
                } else {
                  navigation.navigate(item.navigationUrl);
                }
              }}>
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
                buttonColor={colors.PRIMARY}
                textColor="white"
                style={styles.button}
                onPress={() => navigation.navigate('AllQuestions')}>
                View All Questions
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
      </View>
      <Portal>
        <Modal visible={isVisible} onDismiss={() => setVisible(false)}>
          <View
            style={{
              backgroundColor: 'white',
              margin: 10,
              paddingTop: 40,
              paddingBottom: 20,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}>
            <DropDownPicker
              items={clinics}
              containerStyle={{height: 40}}
              style={{backgroundColor: '#fafafa'}}
              value={selectedClinic}
              setValue={setSelectedClinic}
              open={isOpen}
              setOpen={setOpen}
            />
            <Spacer height={10} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <ButtonSecondary onPress={() => setVisible(false)}>
                Cancel
              </ButtonSecondary>
              <ButtonPrimary
                onPress={() => {
                  navigation.navigate('DAppointments', {
                    clinic_id: selectedClinic,
                  });
                  setVisible(false);
                }}>
                Select
              </ButtonPrimary>
            </View>
          </View>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

export default DHome;
