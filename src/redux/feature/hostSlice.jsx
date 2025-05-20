import baseApi from "../Api/baseApi";

export const hostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allHostRequest: builder.query({
      query: () => ({
        url: "/user/all-host-request",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Host"],
    }),

    allHost: builder.query({
      query: () => ({
        url: "/user/all-host",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Host"],
    }),

    allRejectedHost: builder.query({
      query: () => ({
        url: "/user/all-rejected-host",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Host"],
    }),

    requestApproval: builder.mutation({
      query: (id) => ({
        url: `/user/host-request-approve/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Host"],
    }),

    requestReject: builder.mutation({
      query: (id) => ({
        url: `/user/host-request-reject/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Host"],
    }),
  }),
});

export const {
  useAllHostRequestQuery,
  useAllHostQuery,
  useAllRejectedHostQuery,
  useRequestApprovalMutation,
  useRequestRejectMutation,
} = hostApi;
