import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {
  addComment,
  fetchCommunityById,
} from '../../redux/reducers/communityReducer';
import firestore from '@react-native-firebase/firestore';
import {Appbar, Text, TextInput} from 'react-native-paper';
import Spacer from '../../components/Spacer';
import SearchBar from '../../components/SearchBar';
import MessageIcon from '../../../assets/message.svg';

const MedLabCommunityDetail = ({route, navigation}: any) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const community = useSelector((state: any) => state.community);
  const user = useSelector((state: any) => state.user.currentUser);
  const [commentText, setCommentText] = useState('');
  const [usersData, setUsersData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchCommunityById(route.params.id));
  }, []);

  useEffect(() => {
    const fetchUsersData = async () => {
      const userIds = community.comments.map((comment: any) => comment.userId);
      const usersPromises = userIds.map(async (userId: any) => {
        const userSnapshot = await firestore()
          .collection('users')
          .doc(userId)
          .get();
        return {userId, data: userSnapshot.data()};
      });
      const usersData = await Promise.all(usersPromises);
      const usersDataMap: any = {};
      usersData.forEach((userData: any) => {
        usersDataMap[userData.userId] = {
          fullName: userData.data?.fullName,
          photo: userData.data?.photo,
        };
      });
      setUsersData(usersDataMap);
      setLoading(false);
    };

    if (community?.comments?.length > 0) {
      fetchUsersData();
    } else {
      setLoading(false);
    }
  }, [community.comments]);

  const handleCommentSend = () => {
    dispatch(
      addComment({
        communityId: community.id,
        comment: {
          content: commentText,
          userId: user.uid,
        },
      }),
    );
  };
  console.log("Data" , usersData)

  if (community?.comments?.length >= 0 && Object.keys(usersData).length == 0) {
    
    return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
  }

  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
      </Appbar.Header>
      <View style={styles.container}>
        <Text variant="headlineSmall">MedLab Community</Text>
        <Spacer height={7} />
        <SearchBar />
        <Spacer height={15} />
        <View>
          <View style={styles.communityheading}>
            <View>
              <Text variant="headlineSmall">{community.title}</Text>
              <Spacer height={5} />
              <Text>{community.createdAt}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <MessageIcon />
              <Text>{community?.comments?.length || 0}</Text>
            </View>
          </View>
          <Spacer height={15} />
          <Text>{community.content}</Text>
          <Spacer height={15} />
          <Text variant="headlineSmall">Comments</Text>
          <Spacer height={5} />
          {community.comments &&
            community.comments.map((comment: any) => {
              const userData = usersData[comment.userId] || {
                fullName: '',
                photo: '',
              };
              return (
                <View
                  key={comment.id}
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <Image
                    source={{uri: userData.photo}}
                    style={styles.imageStyle}
                  />
                  <View style={{gap: 3}}>
                    <Text>{comment.content}</Text>
                    <View style={{flexDirection: 'row', gap: 5}}>
                      <Pressable>
                        <Text style={{color: '#777777'}}>Like</Text>
                      </Pressable>
                      <Text>|</Text>
                      <Pressable>
                        <Text style={{color: '#777777'}}>Reply</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              );
            })}
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <Image source={{uri: user.photo}} style={styles.imageStyle} />
            <TextInput
              style={styles.writeComment}
              underlineStyle={{display: 'none'}}
              activeUnderlineColor="transparent"
              right={<TextInput.Icon icon="send" onPress={handleCommentSend} />}
              placeholder="write a comment...."
              value={commentText}
              onChangeText={setCommentText}
            />
          </View>
          <Spacer height={15} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MedLabCommunityDetail;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  communityheading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    borderRadius: 50,
    width: 35,
    height: 35,
  },
  writeComment: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 40,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
