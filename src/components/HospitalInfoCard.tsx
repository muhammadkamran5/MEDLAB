import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';

interface cardProps {
  title: string;
  email?: string;
  location: string;
  ratingCount?: number;
  rating?: number;
  onPress?: () => void;
}

const HospitalInfoCard = ({
  title,
  email,
  location,
  ratingCount,
  rating,
  onPress,
}: cardProps) => {
  return (
    <Pressable style={styles.cardContainer} onPress={onPress}>
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
          <Text>
            {rating}/5.0({ratingCount})
          </Text>
        </View>
      </View>
    </Pressable>
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
