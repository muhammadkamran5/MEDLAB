import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, HelperText, TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const DAddPost = ({navigation}: any) => {
  const user: any = useSelector((state: any) => state.user.currentUser);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const db = firestore();

  const handleSave = () => {
    // Implement logic to save the post
    if (title.trim() === '') {
      setError('Please enter a title for your post.');
      return;
    }

    db.collection('posts').add({
      user: user?.uid,
      title,
      content,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    navigation.goBack();
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Enter title..."
        underlineStyle={{display: 'none'}}
        value={title}
        onChangeText={setTitle}
        error={!!error}
        style={{backgroundColor: 'white'}}
      />
      {error && <HelperText type="error">{error}</HelperText>}
      <TextInput
        placeholder="Enter Post content..."
        value={content}
        onChangeText={setContent}
        underlineStyle={{display: 'none'}}
        multiline
        numberOfLines={10}
        style={{backgroundColor: 'white'}}
      />
      <Button mode="contained" onPress={handleSave}>
        Save Post
      </Button>
    </ScrollView>
  );
};

export default DAddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    gap: 20,
  },
});
