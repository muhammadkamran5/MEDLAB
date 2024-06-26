import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface UserState {
  currentUser: any; // Define a proper type for user if possible
  error: any;
}
const initialState: UserState = {
  currentUser: {},
  error: '',
};
export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (userId: string): Promise<any> => {
    try {
      const userDoc = await firestore().collection('users').doc(userId).get();

      if (!userDoc.exists) {
        throw new Error('User not found in Firestore');
      }

      return userDoc.data();
    } catch (error) {
      console.error('Error fetching current user: ', error);
      return error;
    }
  },
);

export const SignInByGoogle = createAsyncThunk(
  'user/SignInByGoogle',
  async (): Promise<any> => {
    {
      try {
        // Ensure Google Play Services are available
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });

        // Sign in with Google
        const {idToken} = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        const userCredential = await auth().signInWithCredential(
          googleCredential,
        );
        const user = userCredential.user;

        // Add user details to Firestore
        const userDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();

        if (!userDoc.exists) {
          await firestore()
            .collection('users')
            .doc(user.uid)
            .set({
              firstName: user.displayName?.split(' ')[0],
              lastName: user.displayName?.split(' ')[1],
              fullName: user.displayName,
              photo: user.photoURL,
              email: user.email,
              role: 'patient',
              isFirstTime : 'yes'
            });
          return (
            await firestore().collection('users')?.doc(user.uid)?.get()
          ).data();
        }

        return userDoc.data();
      } catch (error) {
        console.error('Google Sign-In error: ', error);
        return error;
      }
    }
  },
);
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data : any): Promise<any> => {
    {
      const {userData , userID} = data;
      try {
        console.log(userData)
        console.log("id",userID)
        const userRef = firestore().collection('users').doc(userID);
        await userRef.update(userData);
        return (await firestore().collection('users').doc(userID).get()).data();
      } catch (error) {
        console.error('Error updating user: ', error);
        return error;
      }
    }
  },
);
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(SignInByGoogle.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(SignInByGoogle.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
