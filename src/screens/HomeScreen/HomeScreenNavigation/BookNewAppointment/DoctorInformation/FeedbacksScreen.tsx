import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FeedBackCard from '../../../../../components/FeedBackCard';
import {useSelector} from 'react-redux';
import fireStore from '@react-native-firebase/firestore';

const FeedbacksScreen = () => {
  const doctor = useSelector((state: any) => state.doctors);
  const [feedbacks, setFeedbacks]: any = useState([]);
  const [users, setUsers] = useState<{[key: string]: any}>({});

  useEffect(() => {
    setFeedbacks(doctor?.feedbacks || []);
  }, [doctor]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userPromises = feedbacks.map((feedback: any) =>
        getUser(feedback.patientID),
      );
      const usersArray = await Promise.all(userPromises);
      const usersObject = usersArray.reduce((acc, user, index) => {
        const patientID = feedbacks[index].patientID;
        return {...acc, [patientID]: user};
      }, {});
      setUsers(usersObject);
    };

    if (feedbacks.length > 0) {
      fetchUsers();
    }
  }, [feedbacks]);

  const getUser = async (patientID: string) => {
    const user = await fireStore().collection('users').doc(patientID).get();
    if (user.exists) {
      return {fullName: user?.data()?.fullName, photo: user?.data()?.photo};
    }
    return {};
  };

  return (
    <View>
      {feedbacks &&
        feedbacks.map((feedback: any, index: number) => {
          const user = users[feedback.patientID] || {};
          return (
            <FeedBackCard
              key={feedback.patientID}
              rating={feedback.rating}
              feedbackText={feedback.feedbackText}
              feedbackDate={feedback.feedbackDate}
              user={user}
            />
          );
        })}
    </View>
  );
};

export default FeedbacksScreen;

const styles = StyleSheet.create({});
