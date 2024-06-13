import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';

const DoctorInformationCard = ({
  title,
  occopation,
  location,
  ratingCount,
}: any) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={require('../../assets/sampleDoctor.png')}
        style={styles.image}
      />
      <View>
        <Text variant="headlineSmall">{title} </Text>
        <Text variant="bodyMedium" style={styles.detailText}>
          {occopation}
        </Text>
        <Text variant="bodyMedium" style={styles.detailText}>
          {location}
        </Text>
        <View style={styles.starRating}>
          <StarRating rating={3.5} onChange={() => {}} starSize={20} />
          <Text>(200)</Text>
        </View>
      </View>
    </View>
  );
};

export default DoctorInformationCard;

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
    width: 80,
  },
  starRating: {
    flexDirection: 'row',
  },
});
