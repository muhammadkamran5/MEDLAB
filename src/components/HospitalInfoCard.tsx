import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';


interface cardProps {
  title: string;
  email ?: string;
  location: string;
  ratingCount?: number;
  rating ?: number
}

const HospitalInfoCard = ({
  title,
  email,
  location,
  ratingCount,
  rating
}: cardProps) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={require('../../assets/sampleDoctor.png')}
        style={styles.image}
      />
      <View>
        <Text variant="headlineSmall">{title} </Text>
        <Text variant="bodyMedium" style={styles.detailText}>
          {email}
        </Text>
        <Text variant="bodyMedium" style={styles.detailText}>
          {location}
        </Text>
        <View style={styles.starRating}>
          <StarRating rating={rating || 0} onChange={() => {}} starSize={20} />
          <Text>{rating}/5.0({ratingCount})</Text>
        </View>
      </View>
    </View>
  );
};

export default HospitalInfoCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 300,
    flexDirection: 'row',
    gap: 10,
  },
  detailText: {
    color: '#777777',
  },
  image: {
    height: '100%',
    width: '32%',
  },
  starRating: {
    flexDirection: 'row',
  },
});
