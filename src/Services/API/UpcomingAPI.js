import {showToast} from '../Functions/AuthFunction';
import { resetpool } from '../State/joinPoolSlice';
import {AppAPI} from './AppAPI';

export const UpcomingAPI = AppAPI.injectEndpoints({
  endpoints: builder => ({
    UpcomingContests: builder.query({
      query: matchId => `home/match-pools?matchId=${matchId}`,
      transformResponse: response => response.data,
      transformErrorResponse: error => error.data,
      keepUnusedDataFor: 0,
    }),

    UpcomingMyContest: builder.query({
      query: matchId => `home/my-match-contests?matchId=${matchId}`,
      transformResponse: response => response.data,
      transformErrorResponse: error => error.data,
      providesTags: ['MYCONTEST'],
      keepUnusedDataFor: 0,
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          // console.log('Upcoming myContest -->', data);
        } catch (error) {
          console.error('Error getting Upcoming myContest', error);
        }
      },
    }),

    UpcomingMyTeams: builder.query({
      query: matchId => `home/my-teams?matchId=${matchId}`,
      transformResponse: response => response.data,
      transformErrorResponse: error => error.data,
      providesTags: ['MYTEAM'],

      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          // console.log('UpcomingMyTeams -->', JSON.stringify(data));
        } catch (error) {
          console.error('Error getting UpcomingMyTeams', error);
        }
      },
    }),

    UpcomingSquad: builder.query({
      query: matchId => `home/match-squad?matchId=${matchId}`,
      transformResponse: response => response.data,
      transformErrorResponse: error => error.data,
    }),

    CreateTeam: builder.mutation({
      query: payload => ({
        url: `home/create-team`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['MYTEAM'],
    }),

    JoinPool: builder.mutation({
      query: payload => ({
        url: `pool/join`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['MYCONTEST', 'WALLET','ALLCONTEST','MYTEAM','USER'],
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(resetpool())
          // console.log('Joinpool -->', data);
          showToast({
            type: 'success',
            heading: 'Success',
            subheading: 'Contest joined successfully!',
          });
        } catch (error) {
          console.error('Error getting Joinpool', error);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useUpcomingContestsQuery,
  useUpcomingMyContestQuery,
  useUpcomingMyTeamsQuery,
  useUpcomingSquadQuery,
  useCreateTeamMutation,
  useJoinPoolMutation,
} = UpcomingAPI;
