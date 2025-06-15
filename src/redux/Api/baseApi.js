import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://115.127.156.132:3011/api/v1",
    baseUrl: "http://192.168.10.233:3011/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Session", "Story", "Blog", "Host", "Shop"],
  endpoints: () => ({}),
});

export default baseApi;
