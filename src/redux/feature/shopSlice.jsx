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
    })


    
  }),
});

export const {
    useAllShopsQuery,
    useShopsPostMutation,
    useShopUpdateMutation,
    useSingleProductQuery,
    useDeleteProductsMutation
} = shopApi;
