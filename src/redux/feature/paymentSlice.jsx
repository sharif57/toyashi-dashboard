import baseApi from "../Api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allPayments: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/payment/all-payment?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useAllPaymentsQuery } = paymentApi;
