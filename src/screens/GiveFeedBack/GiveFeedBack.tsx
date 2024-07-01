import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, ToastAndroid, View} from 'react-native';
import {Appbar, Divider, Text} from 'react-native-paper';
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
  new Date().toISOString().split('T')[0].replace(/-/g, '/');

const GiveFeedBack = ({navigation}: any) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);

  const doctor = useSelector((state: any) => state.doctors);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const currentUser = auth().currentUser;

  const addFeedback = () => {
    const userID = doctor.uid;
    const currentUserID = currentUser?.uid;

    const existingFeedbackIndex = doctor.feedbacks
      ? doctor.feedbacks.findIndex(
          (feedback: any) => feedback.patientID === currentUserID,
        )
      : -1;

    let updatedFeedbacks;
    if (existingFeedbackIndex !== -1) {
      updatedFeedbacks = doctor.feedbacks.map((feedback: any, index: any) =>
        index === existingFeedbackIndex
          ? {...feedback, feedbackText, rating, feedbackDate: getCurrentDate()}
          : feedback,
      );
    } else {
      updatedFeedbacks = [
        ...(doctor?.feedbacks || []),
        {
          feedbackText,
          rating,
          patientID: currentUserID,
          feedbackDate: getCurrentDate(),
        },
      ];
    }

    dispatch(updateUser({userID, userData: {feedbacks: updatedFeedbacks}}));
    ToastAndroid.show('Feedback added successfully', ToastAndroid.SHORT);
    navigation.goBack();
  };

  useEffect(() => {
    const getAverageRating = async () => {
      const feedbacks = doctor.feedbacks || [];
      const totalRating = feedbacks.reduce((acc: any, feedback: any) => {
        return acc + feedback.rating;
      }, 0);
      const averageRating = totalRating / feedbacks.length;
      setRating(averageRating);
    };
    getAverageRating();
  }, []);
  return (
    <ScrollView>
      <Appbar>
        <Appbar.Action
          icon={() => <BackIcon />}
          onPress={() => navigation.goBack()}
        />
      </Appbar>
      <View style={styles.container}>
        <Text variant="headlineSmall" style={styles.headline}>
          Leave your Feedback
        </Text>
        <Spacer height={20} />
        <DoctorInformationCard
          title={doctor.fullName}
          occopation={doctor.specialties}
          location={doctor.address}
          ratingCount={doctor?.feedbacks.length}
          rating={rating}
        />
        <Spacer height={7} />
        <Divider bold />
        <StarRating
          rating={rating}
          onChange={setRating}
          style={styles.starRating}
        />
        <KInput
          multiline
          placeholder="Write your feedback"
          style={styles.feedbackInput}
          numberOfLines={10}
          value={feedbackText}
          onChangeText={setFeedbackText}
        />
      </View>
      <View style={styles.submitContainer}>
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
  headline: {
    fontWeight: '600',
  },
  starRating: {
    alignSelf: 'center',
    marginTop: 20,
  },
  feedbackInput: {
    marginTop: 40,
    marginHorizontal: 5,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
  },
  submitContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
