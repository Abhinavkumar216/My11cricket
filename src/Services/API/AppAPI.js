// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {MMKV} from 'react-native-mmkv';
import {BASE_URL, FA_HEADER} from '../../../CONSTANTS';

export const AppAPI = createApi({
  reducerPath: 'AppAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async headers => {
      const storage = new MMKV();
      // console.log(storage.getString('AUTH_TOKEN'))
      headers.set('access-token', storage.getString('ACCESS_TOKEN'));
      headers.set('auth-token', storage.getString('AUTH_TOKEN'));
      headers.set('fa-header', FA_HEADER);

      return headers;
    },
  }),
  tagTypes: ['USER','ALLCONTEST',"MYCONTEST","MYTEAM","WALLET"],
  endpoints: builder => ({}),
  keepUnusedDataFor: 30,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
});
