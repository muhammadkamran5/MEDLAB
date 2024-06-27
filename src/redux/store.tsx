import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import doctorReducer from './reducers/doctorReducer';
const store = configureStore({
  reducer: {
    user: userReducer,
    doctors : doctorReducer
  },
});
export default store;
