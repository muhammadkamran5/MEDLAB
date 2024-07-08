import {Alert, FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {List, Portal, Modal, TextInput, Text} from 'react-native-paper';
import ButtonPrimary from '../../../../../components/ButtonPrimary';
import Spacer from '../../../../../components/Spacer';
import {colors} from '../../../../../../themes/theme';
import ButtonSecondary from '../../../../../components/ButtonSecondary';
const UnAnsweredQuestions = () => {
  const [questions, setQuestions]: any = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion]: any = useState(null);
  const [answer, setAnswer]: any = useState('');
  const hideModal = () => setVisible(false);
  const fetchQuestions = async () => {
    const res = (
      await firestore()
        .collection('questions')
        .where('isAnswered', '==', false)
        .get()
    ).docs;
    const questions = res.map(doc => ({id: doc.id, ...doc.data()}));
    setQuestions(questions);
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  const submitAnswer = async () => {
    if (!answer) {
      Alert.alert('Please enter your answer');
      return;
    }
    await firestore().collection('questions').doc(currentQuestion.id).update({
      isAnswered: true,
      answer: answer,
    });
    fetchQuestions();
    setVisible(false);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        renderItem={({item}) => (
          <List.Item
            style={{backgroundColor: 'white', paddingVertical: 15}}
            title={item.question + '?'}
            onPress={() => {
              setVisible(true);
              setCurrentQuestion({id: item.id, question: item.question});
            }}
            right={() => <List.Icon icon={'arrow-right'} />}
          />
        )}
      />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
          <Text variant="headlineSmall">{currentQuestion?.question}?</Text>
          <Spacer height={7} />
          <TextInput
            value={answer}
            onChangeText={text => setAnswer(text)}
            mode="outlined"
            placeholder="Enter your answer here..."
            multiline
            numberOfLines={10}
            style={{backgroundColor: 'white', paddingTop: 10}}
            underlineStyle={{display: 'none'}}
            outlineColor={colors.PRIMARY}
            outlineStyle={{borderWidth: 0.5}}
          />
          <Spacer height={5} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <ButtonSecondary onPress={() => setVisible(false)}>
              Cancel
            </ButtonSecondary>
            <ButtonPrimary onPress={submitAnswer}>Submit</ButtonPrimary>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default UnAnsweredQuestions;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});
