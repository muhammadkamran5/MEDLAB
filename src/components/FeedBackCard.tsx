import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import StarRating from 'react-native-star-rating-widget';
import Spacer from '../components/Spacer';
const FeedBackCard = (props: any) => {
  return (
    <View style={{marginHorizontal: 45 , marginVertical : 10}}>
      <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
        {props.user.photo && (
          <Image
            source={{uri: props.user.photo, width: 30, height: 30}}
            style={{borderRadius: 50}}
          />
        )}

        <Text>{props.user.fullName}</Text>
      </View>
      <Spacer height={7} />
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
        <StarRating onChange={() => {}} rating={props.rating} starSize={15} />
        <Text>{props.feedbackDate}</Text>
      </View>
      <View>
        <Text>{props.feedbackText}</Text>
      </View>
    </View>
  );
};

export default FeedBackCard;

const styles = StyleSheet.create({});
