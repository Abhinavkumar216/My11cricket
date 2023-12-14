import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  pooldata: null,
  Purpose:false
};
export const poolSlice = createSlice({
  name: 'pool',
  initialState,
  reducers: {
    joinpool: (state, {payload}) => {
      // console.log(payload);
      state.pooldata = {
        poolId: payload._id,
        matchStatus: 'Upcoming',
        mobile: payload.mobile,
        entryFee: payload.entryFee,
      };
    },
    resetpool: state => {
      state.pooldata = null;
      state.Purpose = false
    },
    setPurpose:state=>{
      state.Purpose = true
    }
  },
});

export const {joinpool, resetpool, setPurpose} = poolSlice.actions;

export default poolSlice.reducer;

export const poolState = state => state.pool.pooldata;
export const purposeState = state => state.pool.Purpose;
