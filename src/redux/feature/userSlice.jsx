import baseApi from "../Api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),

      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    allUsers: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/user/all-user?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    totalHost: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/user/all-host?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUserProfileQuery,
  useUpdateProfileMutation,
  useAllUsersQuery,
  useTotalHostQuery
} = userApi;
