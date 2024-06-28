import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import ButtonPrimary from './ButtonPrimary';
import {Dimensions} from 'react-native';
import {NavigationAction} from '@react-navigation/native';
interface ScheduleProps {
  date: string;
  times: any[];
  slots: number;
  navigation: NavigationAction;
}

const ScheduleComponent = ({date, times, slots, navigation , ...props}: any) => {
  const [selectedTime, setSelectedTime] = React.useState(null);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.dateContainer}>
        <View>
          <Text style={styles.dateText} variant="bodyLarge">
            {date}
          </Text>
          <Text style={styles.dateText}>
            {slots} slot{slots >= 2 && 's'} Available
          </Text>
        </View>

        <ButtonPrimary style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>SEE ALL</Text>
        </ButtonPrimary>
      </View>
      <View style={styles.slotContainer}>
        {times.map(
          (item : any) =>
            item && (
              <TouchableOpacity
                style={[
                  styles.slotButton,
                  selectedTime == item && {backgroundColor: '#225B6E'},
                ]}
                onPress={() => {
                  navigation.navigate('ConfirmAppointment' , {time: item.time, date: date , doctorID : props.extra});
                }}>
                <Text
                  style={[
                    styles.slotText,
                    selectedTime == item && {color: '#fff'},
                  ]}>
                  {item.time} {selectedTime == item}
                </Text>
              </TouchableOpacity>
            ),
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,

    padding: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 10,
    width: Dimensions.get('screen').width * 0.8,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    marginBottom: 8,
  },
  seeAllButton: {
    alignSelf: 'flex-end',
    borderRadius: 12,
  },
  seeAllText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  slotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  slotButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderColor: '#1C1C1C1A',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
  },
  slotText: {
    color: '#1C1C1C',
  },
});

export default ScheduleComponent;
