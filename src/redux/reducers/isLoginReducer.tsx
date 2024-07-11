import {createSlice} from '@reduxjs/toolkit';

const isLoginSlic = createSlice({
  name: 'isLogin',
  initialState: {
    isLogin: false,
  },
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin =  action.payload;
    },
  },
});

export const {setIsLogin} = isLoginSlic.actions;
export default isLoginSlic.reducer;
