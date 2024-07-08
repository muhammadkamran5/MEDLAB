import {
  asyncThunkCreator,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import firestore from '@react-native-firebase/firestore';

const initialState: any = [];
const getCurrentDate = () =>
  new Date().toISOString().split('T')[0].replace(/-/g, '/');

const firebaseDateToString = (date: any) => {
  return date.toDate().toLocaleDateString();
};

const fetchAllComunities = createAsyncThunk(
  'community/fetchAllComunities',
  async () => {
    const snapShot = await firestore().collection('posts').get();

    const communities: any = snapShot.docs.map(documentSnapshot => {
      return {
        ...documentSnapshot.data(),
        createdAt: firebaseDateToString(documentSnapshot.data().createdAt),
        id: documentSnapshot.id,
      };
    });
    return communities;
  },
);

const fetchCommunityById = createAsyncThunk(
  'community/fetchCommunityById',
  async (id: string) => {
    const snapShot = await firestore().collection('posts').doc(id).get();

    const community: any = {
      ...snapShot.data(),
      createdAt: firebaseDateToString(snapShot?.data()?.createdAt),
      id: snapShot.id,
    };
    return community;
  },
);

const addComment = createAsyncThunk(
  'community/addComment',
  async (payload: any, {rejectWithValue, getState}) => {
    try {
      const {communityId, comment} = payload;
      const state: any = getState();
      const updatedComments = [
        ...(state?.community?.comments || []),
        {...comment, date: getCurrentDate()},
      ];
      const communityRef = firestore().collection('posts').doc(communityId);

      await communityRef.update({comments: updatedComments});

      const updatedCommunityDoc = await communityRef.get();

      return {
        ...updatedCommunityDoc.data(),
        createdAt: firebaseDateToString(updatedCommunityDoc?.data()?.createdAt),
        id: updatedCommunityDoc.id,
      };
    } catch (error: any) {
      console.error('Error updating community comments:', error);
      return rejectWithValue(error?.message);
    }
  },
);

const communitySlice = createSlice({
  initialState: initialState,
  name: 'community',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAllComunities.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchAllComunities.rejected, (state, action) => {
      return [];
    });
    builder.addCase(fetchCommunityById.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchCommunityById.rejected, (state, action) => {
      return [];
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addComment.rejected, (state, action) => {
      return [];
    });
  },
});

export default communitySlice.reducer;
export {fetchAllComunities, fetchCommunityById, addComment};
