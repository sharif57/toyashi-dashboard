import baseApi from "../Api/baseApi";

export const partyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allParty: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/party/all-parties?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["User"],
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

export const { useAllPartyQuery, useUpComingPartyQuery, usePastPartyQuery } = partyApi;
