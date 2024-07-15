import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

const initialState: any = [];
export const fetchServicesByClinicID = createAsyncThunk(
  'fetchServicesByClinicID',
  async (clinicID: number) => {
    console.log(clinicID);
    const services = await firestore()
      .collection('services')
      .where('clinic_id', '==', clinicID)
      .get();
    return services.docs.map(doc => ({...doc.data(), id: doc.id}));
  },
);

export const fetchAllServices = createAsyncThunk(
  'fetchAllServices',
  async () => {
    const services = await firestore().collection('services').get();
    return services.docs.map(doc => ({...doc.data(), id: doc.id}));
  },
);

export const fetchServicesByIds = createAsyncThunk(
  'fetchServicesByIds',
  async (servicesIds: string[]) => {
    if (!servicesIds) {
      return [];
    }
    const servicesQuery = await firestore()
      .collection('services')
      .where(firestore.FieldPath.documentId(), 'in', servicesIds)
      .get();

    const services = servicesQuery.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

    return services;
  },
);
const serviceSlice = createSlice({
  name: 'ServicesReducer',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchServicesByClinicID.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchAllServices.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchServicesByIds.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export default serviceSlice.reducer;
