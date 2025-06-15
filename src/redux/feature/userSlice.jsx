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
        url: "/auth/update_user_profile/",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["User"],
    }),

    allUsers: builder.query({
      // query: () => ({
      //   url: "/user/all-user",
      //   // /user/all-user?page=1&limit=10
      //   method: "GET",
      // }),
      query: ({ page = 1, limit = 10 }) => ({
        url: `/user/all-user?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useUserProfileQuery,
  useUpdateProfileMutation,
  useAllUsersQuery,
} = userApi;
