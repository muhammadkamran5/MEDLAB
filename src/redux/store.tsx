import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import doctorReducer from './reducers/doctorReducer';
import communityReducer from './reducers/communityReducer';
import clinicsReducer from './reducers/clinicsReducer';
import isLoginReducer from './reducers/isLoginReducer';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    user: userReducer,
    doctors : doctorReducer, 
    community : communityReducer , 
    clinic : clinicsReducer , 
    isLogin : isLoginReducer
  },
  // middleware :(getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;
