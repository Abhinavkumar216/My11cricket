import {AppAPI} from './AppAPI';

export const HomeAPI = AppAPI.injectEndpoints({
  endpoints: builder => ({
    HomeData: builder.query({
      query: () => '/home',
      transformResponse: response => response.data,
      transformErrorResponse: error => error.data,
      providesTags: ['ALLCONTEST', 'MYCONTEST'],
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          // console.log('home data ---> ', data);
        } catch (error) {
          console.error('Error getting home', error);
        }
      },
    }),
    Mymatches: builder.query({
      query: status => `/home/my-all-matches?matchStatus=${status}`,
      transformResponse: response => response.data,
      transformErrorResponse: error => error.data,
      providesTags: ['MYCONTEST'],
      // async onQueryStarted(_, {dispatch, queryFulfilled}) {
      //   try {
      //     const {data} = await queryFulfilled;
      //     console.log('Mymatch data ---> ', data);
      //   } catch (error) {
      //     console.error('Error getting Mymatch', error);
      //   }
      // },
    }),
    Mycontests: builder.query({
      query: matchId => `/home/my-match-contests?matchId=${matchId}`,
      transformResponse: response => response.data,
      transformErrorResponse: error => error.data,
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          // console.log('mycontestquery data ---> ', data);
        } catch (error) {
          console.error('Error getting mycontestquery', error);
        }
      },
    }),
    MyTeams: builder.query({
      query: (matchId) => `/home/my-teams?matchId=${matchId}`,
      transformResponse: response => response.data,
      transformErrorResponse: error => error.data,
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          // console.log('MyTeams data ---> ', data);
        } catch (error) {
          console.error('Error getting MyTeams', error);
        }
      },
    }),
    MatchStats: builder.query({
      query: (matchId) => `/home/my-match-stats?matchId=${matchId}&q=scorecard`,
      transformResponse: response => response.data.scorecardData,
      transformErrorResponse: error => error.data,
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          // console.log('MatchStats data ---> ', data);
        } catch (error) {
          console.error('Error getting MatchStats', error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useHomeDataQuery,
  useMymatchesQuery,
  useMycontestsQuery,
  useMyTeamsQuery,
  useMatchStatsQuery
} = HomeAPI;
