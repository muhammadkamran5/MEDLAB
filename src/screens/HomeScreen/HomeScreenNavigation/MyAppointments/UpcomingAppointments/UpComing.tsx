import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, List} from 'react-native-paper';
import Pencil from '../../../../../../assets/Pencil.svg';

const Seperator = () => {
  return <View style={{height: 1, backgroundColor: '#cccccc', marginHorizontal : 15}}></View>;
};
const UpComing = () => {
  const data = [
    {
      date: '09/04/2023',
      title: 'Dentist - Dr Mujtaba Anwar',
    },
    {
      date: '09/05/2023',
      title: 'Nephrologist - Dr Abeera Mansoor',
    },
    {
      date: '18/05/2023',
      title: 'Dermatologist - Dr Tahir Chaudhary',
    },
  ];
  return (
    <FlatList
      data={data}
      renderItem={({item}: any) => {
        return (
          <List.Item
            title={item.title}
            description={item.date}
            right={() => (
              <Button mode="text" textColor="#225B6E" icon={() => <Pencil />}>
                Modify
              </Button>
            )}
          />
        );
      }}
      ItemSeparatorComponent={Seperator}
    />
  );
};

export default UpComing;

const styles = StyleSheet.create({});
