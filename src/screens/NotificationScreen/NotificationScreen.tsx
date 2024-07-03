import {FlatList, StyleSheet, View} from 'react-native';
import React, { useEffect } from 'react';
import {Appbar, List, Text} from 'react-native-paper';
import data from '../../../assets/data.json';
import Spacer from '../../components/Spacer';
import BackIcon from '../../../assets/Back.svg';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NotificationDetails from './NotificationDetails';
import notifee from '@notifee/react-native';

const Stack = createNativeStackNavigator();

const NotificationList = ({navigation}: any) => {
  const imageUrl = '../../assets/sampleDoctor.png'

  useEffect(() => {
    async function onDisplayNotification() {
      // Request permissions (required for iOS)
      await notifee.requestPermission()
  
      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
  
      // Display a notification
      await notifee.displayNotification({
        title: 'Notification Title',
        body: 'Main body content of the notification',
        android: {
          channelId,
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
        },
      });
    }
    onDisplayNotification()
  }, [])
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon={() => <BackIcon />} onPress={() => navigation.goBack()}/>
      </Appbar.Header>
      <View style={styles.container}>
        <Text variant="displaySmall">Notifications</Text>
      </View>
      <Spacer height={10} />
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <List.Item
              onPress={() => navigation.navigate('NotificationDetail')}
              title={item.message}
              titleNumberOfLines={2}
              right={() => <List.Icon icon={'close'} color="#3AA1A2" />}
              left={() => (
                <List.Icon
                  icon={'circle'}
                  color="#3AA1A2"
                  style={{paddingHorizontal: 20}}
                />
              )}
            />
          );
        }}
      />
    </>
  );
};

const NotificationScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="NotificationList" component={NotificationList} />
      <Stack.Screen name="NotificationDetail" component={NotificationDetails} />
    </Stack.Navigator>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});
