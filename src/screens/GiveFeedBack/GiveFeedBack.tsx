import {ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Divider, Text, TextInput} from 'react-native-paper';
import React, {useState} from 'react';
import StarRating from 'react-native-star-rating-widget';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';

import DoctorInformationCard from '../../components/DoctorInformationCard';
import Spacer from '../../components/Spacer';
import KInput from '../../components/KInput';
import ButtonPrimary from '../../components/ButtonPrimary';
import {updateUser} from '../../redux/reducers/userReducer';
import BackIcon from '../../../assets/Back.svg';

const getCurrentDate = () =>
  new Date().toJSON().slice(0, 10).replace(/-/g, '/');

const GiveFeedBack = ({navigation}: any) => {
  const [feedbackText, setFeedbackText] = React.useState('');
  const doctor = useSelector((state: any) => state.doctors);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const currentUser = auth().currentUser;
  const [rating, setRating] = React.useState(0);

  const addFeedback = () => {
    const userID = doctor.uid;
    const userData = {
      feedbacks: [
        ...(doctor?.feedbacks ? doctor.feedbacks : []),
        {
          feedbackText,
          rating,
          patientID: currentUser?.uid,
          feedbackDate: getCurrentDate(),
        },
      ],
    };
    dispatch(updateUser({userID, userData}));
  };

  return (
    <ScrollView>
      <Appbar>
        <Appbar.Action
          icon={() => <BackIcon />}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </Appbar>
      <View style={styles.container}>
        <Text variant="headlineSmall" style={{fontWeight: 600}}>
          Leave your FeedBack{' '}
        </Text>

        <Spacer height={20} />
        <DoctorInformationCard
          title={doctor.fullName}
          occopation={doctor.specialties}
          location={doctor.address}
          ratingCount={10}
        />
        <Spacer height={7} />
        <Divider bold />

        <StarRating
          rating={rating}
          onChange={(rating: any) => {
            setRating(rating);
          }}
          style={{alignSelf: 'center', marginTop: 20}}
        />

        <KInput
          multiline
          placeholder="Write your feedback"
          style={{
            marginTop: 40,
            marginHorizontal: 5,
            borderRadius: 5,
            padding: 10,
            textAlignVertical: 'top',
          }}
          numberOfLines={10}
          value={feedbackText}
          onChangeText={(text: any) => setFeedbackText(text)}
        />
      </View>
      <View style={{marginTop: 20, alignItems: 'center'}}>
        <ButtonPrimary onPress={addFeedback}>Add feedback</ButtonPrimary>
      </View>
    </ScrollView>
  );
};

export default GiveFeedBack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
