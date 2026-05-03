import baseApi from "../Api/baseApi";

export const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    allShops: builder.query({
      query: () => ({
        url: "/shop/all-products",
        method: "GET",
      }),
      providesTags: ["Shop"],
    }),
    shopsPost: builder.mutation({
      query: (data) => ({
        url: "/shop/create-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Shop"],
    }),
    shopUpdate: builder.mutation({
      query: ({data, id}) => ({
        url: `/shop/update-product/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Shop"],
    }),
    singleProduct: builder.query({
      query: (id) => ({
        url:`/shop/product-details/${id}`,
        method: "GET",
      }),
      providesTags:["Shop"],
    }),
    deleteProducts: builder.mutation({
      query:(id)=>({
        url:`/shop/delete-product/${id}`,
        method:"DELETE",
      })
    }),

    allCategories: builder.query({
      query: () => ({
        url: "/shop-category/all-shop-category",
        method: "GET",
      }),
      providesTags: ["Shop"],
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: "/shop-category/create-shop-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Shop"],
    }),

    // Payouts
    // /party/all?page&limit
    allPayouts: builder.query({
      query: ({ page, limit }) => ({
        url: `/party/all?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Payout"],
    }),

    // patch : /update-income/:id
    updatePayout: builder.mutation({
      query: ({ id, data }) => ({
        url: `/party/update-income/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Payout"],
    }),

    // /leave-record
    getAllLeaveRecord: builder.query({
      query: ({ page, limit }) => ({
        url: `/leave-record?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Payout"],
    }),

    // patch: leave-record/update-status/:id
    updateLeaveRecordStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/leave-record/update-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Payout"],
    }),

    
  }),
});

export const {
    useAllShopsQuery,
    useShopsPostMutation,
    useShopUpdateMutation,
    useSingleProductQuery,
    useDeleteProductsMutation,
    useAllCategoriesQuery, 
    useCreateCategoryMutation,
    useAllPayoutsQuery,
    useUpdatePayoutMutation,
    useGetAllLeaveRecordQuery,
    useUpdateLeaveRecordStatusMutation,
} = shopApi;
