import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
let initialState: any = [];

function haversineDistance(lat1: any, lon1: any, lat2: any, lon2: any) {
  if (lat2 == 0 && lat2 == 0) return 0;
  const toRadians = (degrees: any) => degrees * (Math.PI / 180);
  const R = 6371;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (R * c).toFixed(2);
}

const isDateAvailable = (user: any, date: any) => {
  if (!date) return true;
  return user.availability[0].dates.some((d: any) => {
    return d.date === date;
  });
};

const filterUserByAddressAndSearch = (
  users: any,
  search: any,
  address: any,
  date: any,
  latitude: any,
  longitude: any,
) => {
  return users.filter((user: any) => {
    const distance: any = haversineDistance(
      user.location.lat,
      user.location.lng,
      latitude,
      longitude,
    );

    return (
      user.fullName.toLowerCase().includes(search.toLowerCase()) &&
      distance < 6 &&
      isDateAvailable(user, date)
    );
  });
};

const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async () => {
  const snapshot = await firestore()
    .collection('users')
    .where('role', '==', 'doctor')
    .get();
  const data = snapshot.docs.map(doc => ({uid: doc.id, ...doc.data()}));
  return data;
});

const fetchDoctorsBySearch = createAsyncThunk(
  'doctors/fetchDoctorsBySearch',
  async ({search, address, date, latitude, longitude}: any) => {
    const firestoreRef = firestore().collection('users');

    try {
      const snapShot = await firestoreRef.where('role', '==', 'doctor').get();

      const data = snapShot.docs.map((doc: any) => ({
        uid: doc.id,
        ...doc.data(),
      }));

      return filterUserByAddressAndSearch(
        data,
        search,
        address,
        date,
        latitude,
        longitude,
      );
    } catch (error) {
      console.error('Error fetching doctors by search:', error);
    }
  },
);
const fetchDoctorsBySearchAndSort = createAsyncThunk(
  'doctors/fetchDoctorsBySearchAndSort',
  async ({search, address, date, latitude, longitude}: any) => {
    const firestoreRef = firestore().collection('users');

    try {
      const snapShot = await firestoreRef.where('role', '==', 'doctor').get();

      const data = snapShot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data(),
      }));

      const filteredAndSortedDoctors = data
        .filter((doctor: any) => {
          const distance: any = haversineDistance(
            doctor.location.lat,
            doctor.location.lng,
            latitude,
            longitude,
          );

          return (
            doctor.fullName.toLowerCase().includes(search.toLowerCase()) &&
            distance < 6 &&
            isDateAvailable(doctor, date)
          );
        })
        .sort((a: any, b: any) => {
          const distanceA: any = haversineDistance(
            a.location.lat,
            a.location.lng,
            latitude,
            longitude,
          );
          const distanceB: any = haversineDistance(
            b.location.lat,
            b.location.lng,
            latitude,
            longitude,
          );
          return distanceA - distanceB;
        });

      return filteredAndSortedDoctors;
    } catch (error) {
      console.error('Error fetching doctors by search and sort:', error);
    }
  },
);
const fetchDoctorByID = createAsyncThunk(
  'doctors/fetchDoctorByID',
  async (id: string) => {
    const snapshot = await firestore().collection('users').doc(id).get();
    const data = snapshot.data();
    return {...data, uid: id};
  },
);

const doctorSlice = createSlice({
  name: 'doctors',
  initialState: initialState,
  reducers: {
    sortByName(state) {
      return [...state].sort((a, b) => a.fullName.localeCompare(b.fullName));
    },
    sortByRating(state) {
      return [...state].sort((a, b) => {
        const sumA = a.feedbacks.reduce(
          (acc: any, feedback: any) => acc + feedback.rating,
          0,
        );
        const averageA = sumA / a.feedbacks.length;
        const sumB = b.feedbacks.reduce(
          (acc: any, feedback: any) => acc + feedback.rating,
          0,
        );
        const averageB = sumB / b.feedbacks.length;
        return averageB - averageA;
      });
    },
  },
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
    builder.addCase(fetchDoctorsBySearch.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchDoctorsBySearch.rejected, (state, action) => {
      return [];
    });
    builder.addCase(fetchDoctorsBySearchAndSort.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchDoctorsBySearchAndSort.rejected, (state, action) => {
      return [];
    });
  },
});
export const {sortByName, sortByRating} = doctorSlice.actions;
export default doctorSlice.reducer;
export {
  fetchDoctors,
  fetchDoctorByID,
  fetchDoctorsBySearch,
  fetchDoctorsBySearchAndSort,
};
