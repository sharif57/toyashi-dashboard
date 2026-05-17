import baseApi from "../Api/baseApi";

export const partyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allParty: builder.query({
      query: ({ page = 1, limit = 10, status }) => ({
        url: `/party/all-parties?page=${page}&limit=${limit}&status=${status}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    deleteParty: builder.mutation({
      query: (id) => ({
        url: `/party/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    
    upComingParty:builder.query({
      query: () => ({
        url: '/party/upcoming-parties',
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    pastParty:builder.query({
      query: () => ({
        url: '/party/past-parties',
        method: "GET",
      }),
      providesTags: ["User"],
    }),

  }),
});

export const { useAllPartyQuery, useDeletePartyMutation, useUpComingPartyQuery, usePastPartyQuery } = partyApi;
