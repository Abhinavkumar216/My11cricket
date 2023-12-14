import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userdata: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setuser: (state, action) => {
      state.userdata = action.payload;
    },
  },
});

export const {setuser} = userSlice.actions;

export default userSlice.reducer;

export const userstate = state => state.user.userdata;
