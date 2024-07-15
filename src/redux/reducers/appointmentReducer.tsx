import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

const initialState: any = [];

export const getPastAppointments = createAsyncThunk(
  'getPastAppointments',
  async () => {
    const currentDate = new Date();
    const res = await firestore()
      .collection('appointments')
      .where('date', '<', currentDate)
      .get();
    return res.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
      time: doc.data().time.toDate().toTimeString(),
      date: doc.data().time.toDate().toDateString(),
    }));
  },
);
export const getUpComingAppointments = createAsyncThunk(
  'getUpComingAppointments',
  async () => {
    const currentDate = new Date();
    const res = await firestore()
      .collection('appointments')
      .where('date', '>=', currentDate)
      .get();
    return res.docs.map((doc: any) => ({
      id: doc.id,

      ...doc.data(),
      time: doc.data().time.toDate().toTimeString(),
      date: doc.data().time.toDate().toDateString(),
    }));
  },
);
const appointmentsSlice = createSlice({
  name: 'ServicesReducer',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPastAppointments.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getPastAppointments.rejected, (state, action) => {
        return [];
      });
    builder
      .addCase(getUpComingAppointments.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getUpComingAppointments.rejected, (state, action) => {
        return [];
      });
  },
});

export default appointmentsSlice.reducer;
