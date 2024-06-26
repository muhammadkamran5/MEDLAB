import {ScrollView, StyleSheet, View} from 'react-native';
import {Appbar, Divider, Text, TextInput} from 'react-native-paper';
import React, {useState} from 'react';
import BackIcon from '../../../assets/Back.svg';
import DoctorInformationCard from '../../components/DoctorInformationCard';
import Spacer from '../../components/Spacer';
import KInput from '../../components/KInput';
import ButtonPrimary from '../../components/ButtonPrimary';
import StarRating from 'react-native-star-rating-widget';

const GiveFeedBack = ({navigation}: any) => {
  const [feedbackText, setFeedbackText] = React.useState('');
  const [rating, setRating] = React.useState(0);
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
          title="Dr. Abeera Mansoor"
          occopation="Nephrologist"
          location="DHMC - 7 km"
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
        <ButtonPrimary>Add feedback</ButtonPrimary>
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
