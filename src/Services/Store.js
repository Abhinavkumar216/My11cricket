import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {AppAPI} from './API/AppAPI';
import userReducer from './State/userSlice';
import joinPoolSlice, { JoinPoolReducer } from './State/joinPoolSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    pool:joinPoolSlice,
    [AppAPI.reducerPath]: AppAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(AppAPI.middleware),
});

setupListeners(store.dispatch);

// store.subscribe(() => console.log('store: =>', store.getState()));
