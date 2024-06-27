import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
const initialState: any = [];

const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async () => {
  const snapshot = await firestore()
    .collection('users')
    .where('role', '==', 'doctor')
    .get();
  const data = snapshot.docs.map(doc => ({uid: doc.id, ...doc.data()}));
  console.log('inside reducter', data);
  return data;
});

const fetchDoctorByID = createAsyncThunk(
  'doctors/fetchDoctorByID',
  async (id: string) => {
    const snapshot = await firestore().collection('users').doc(id).get();
    const data = snapshot.data();
    return {...data,uid:id}
  },
);

const doctorSlice = createSlice({
  name: 'doctors',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchDoctors.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchDoctors.rejected, (state, action) => {
      return [];
    });
    builder.addCase(fetchDoctorByID.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchDoctorByID.rejected, (state, action) => {
      return [];
    });
  },
});

export default doctorSlice.reducer;
export {fetchDoctors , fetchDoctorByID};
