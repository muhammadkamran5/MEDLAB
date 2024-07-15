import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import doctorReducer from './reducers/doctorReducer';
import communityReducer from './reducers/communityReducer';
import clinicsReducer from './reducers/clinicsReducer';
import isLoginReducer from './reducers/isLoginReducer';
import logger from 'redux-logger';
import servicesReducer from './reducers/servicesReducer';
import appointmentReducer from './reducers/appointmentReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    doctors : doctorReducer, 
    community : communityReducer , 
    clinic : clinicsReducer , 
    isLogin : isLoginReducer , 
    services : servicesReducer,
    appointments: appointmentReducer
  },
  // middleware :(getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;
