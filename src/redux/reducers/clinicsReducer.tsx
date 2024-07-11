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
export const fetchClinicById = createAsyncThunk(
  'user/fetchClinicById',
  async (id: string): Promise<any> => {
    try {
      const res = await firestore().collection('clinic').doc(id).get();
      return {id: res.id, ...res.data()};
    } catch (error) {
      console.log(error);
    }
  },
);

export const deleteClinicById = createAsyncThunk(
  'user/deleteClinicById',
  async (id: string): Promise<any> => {
    try {
      await firestore().collection('clinic').doc(id).delete();
      return id;
    } catch (error) {
      console.log(error);
    }
  },
);

export const updateClinicById = createAsyncThunk(
  'user/updateClinicById',
  async (data: any): Promise<any> => {
    try {
      const {id, ...rest} = data;
      const clinicRef = firestore().collection('clinic').doc(data.id);
      await clinicRef.update(data);
      const clinicDoc = await clinicRef.get();
      return {id: clinicDoc.id, ...clinicDoc.data()};
    } catch (error) {
      console.log(error);
    }
  },
);
const ClinicSlice = createSlice({
  name: 'clinic',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAllClinics.fulfilled, (state, action) => {
      return action.payload;
    });
    builder
      .addCase(fetchAllClinics.rejected, (state, action) => {
        return [];
      })
      .addCase(fetchClinicById.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchClinicById.rejected, (state, action) => {
        return {};
      })
      .addCase(deleteClinicById.fulfilled, (state, action) => {
        return state.filter((item: any) => item.id !== action.payload);
      })
      .addCase(deleteClinicById.rejected, (state, action) => {
        return state;
      })
      .addCase(updateClinicById.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateClinicById.rejected, (state, action) => {
        return state;
      });
  },
});

export default ClinicSlice.reducer;
