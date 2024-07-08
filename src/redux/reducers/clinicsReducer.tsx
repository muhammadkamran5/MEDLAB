import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

const initialState: any = [];
export const fetchAllClinics = createAsyncThunk(
  'user/fetchClinics',
  async (): Promise<any> => {
    try {
      const res = await firestore().collection('clinic').get();
      return res.docs.map(doc => ({id: doc.id, ...doc.data()}));
    } catch (error) {
      console.log(error);
    }
  },
);
const ClinicSlice = createSlice({
  name: 'clinic', // Make sure to use the correct slice name
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAllClinics.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchAllClinics.rejected, (state, action) => {
      return [];
    });
  },
});

export default ClinicSlice.reducer;
