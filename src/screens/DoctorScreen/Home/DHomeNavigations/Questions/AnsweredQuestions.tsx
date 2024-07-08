import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {List} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';

const AnsweredQuestions = () => {
  const [questions, setQuestions]: any = useState([]);
  const [expandedItems, setExpandedItems]: any = useState({});

  useFocusEffect(
    React.useCallback(() => {
      const fetchQuestions = async () => {
        try {
          const res = await firestore()
            .collection('questions')
            .where('isAnswered', '==', true)
            .get();
          const questions = res.docs.map(doc => ({id: doc.id, ...doc.data()}));
          setQuestions(questions);
          console.log(questions);
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      };
      fetchQuestions();
    }, []),
  );

  const handlePress = (id: any) => {
    setExpandedItems((prev: any) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <List.Section>
            <List.Accordion
              title={item.question}
              onPress={() => handlePress(item.id)}
              expanded={expandedItems[item.id]}>
              <List.Item title={item.answer} />
            </List.Accordion>
          </List.Section>
        )}
      />
    </View>
  );
};

export default AnsweredQuestions;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});
