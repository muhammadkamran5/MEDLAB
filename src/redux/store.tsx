import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import doctorReducer from './reducers/doctorReducer';
import communityReducer from './reducers/communityReducer';
const store = configureStore({
  reducer: {
    user: userReducer,
    doctors : doctorReducer, 
    community : communityReducer
  },
});
export default store;
