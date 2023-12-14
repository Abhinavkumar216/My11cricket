import {showToast} from '../Functions/AuthFunction';
import {setuser} from '../State/userSlice';
import {AppAPI} from './AppAPI';

export const UserAPI = AppAPI.injectEndpoints({
  endpoints: builder => ({
    UserDetails: builder.query({
      query: () => `user`,
      transformResponse: response => response.data,
      transformErrorResponse: error => error.data,
      providesTags: ['USER'],
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(setuser(data));
          // console.log('user data ---> ', data);
        } catch (error) {
          console.error('Error getting user', error);
        }
      },
    }),

    UserUpdate: builder.mutation({
      query: payload => ({
        url: `user`,
        method: 'PATCH',
        body: payload,
      }),
      transformResponse: response => response.data,
      transformErrorResponse: error => error.data,
      invalidatesTags: ['USER'],
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          // console.log('user update-->', data);
          showToast({
            type: 'success',
            heading: 'Success',
            subheading: 'User Updated Successfully',
          });
        } catch (error) {
          console.error('Error in creatingteam', error.error.message);
          showToast({
            type: 'error',
            heading: 'Error',
            subheading: 'Error Updating User',
          });
        }
      },
    }),
    GetWallet: builder.query({
      query: (page) => `user/wallet?page=${page}`,
      transformResponse: response => response.data.wallet,
      transformErrorResponse: error => error.data,
      providesTags: ['WALLET'],

      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      keepUnusedDataFor: 0,
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch({currentArg, previousArg}) {
        return currentArg !== previousArg;
      },

      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          // console.log('user wallet ---> ', data);
        } catch (error) {
          console.error('Error getting wallet', error);
        }
      },
    }),
    TransferCoin: builder.mutation({
      query: payload => ({
        url: `user/coin-transfer`,
        method: 'POST',
        body: payload,
      }),
      transformResponse: response => response.data,
      transformErrorResponse: error => error.data,
      invalidatesTags: ['WALLET'],
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          // console.log('-->', data);
          showToast({
            type: 'success',
            heading: 'Success',
            subheading: 'Coin transferred Successfully',
          });
        } catch (error) {
          console.error('Error in creatingteam', error.error.message);
          showToast({type: 'error', heading: error.error.message});
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyUserDetailsQuery,
  useGetWalletQuery,
  useTransferCoinMutation,
  useUserUpdateMutation,
  // useUploadImageMutation
} = UserAPI;
