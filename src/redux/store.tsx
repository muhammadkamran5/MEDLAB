import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import doctorReducer from './reducers/doctorReducer';
import communityReducer from './reducers/communityReducer';
import clinicsReducer from './reducers/clinicsReducer';
import isLoginReducer from './reducers/isLoginReducer';
const store = configureStore({
  reducer: {
    user: userReducer,
    doctors : doctorReducer, 
    community : communityReducer , 
    clinic : clinicsReducer , 
    isLogin : isLoginReducer
  },
});
export default store;
