import { PRODUCTs_URL} from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: ({ keyword, pageNumber }) => ({
				url: PRODUCTs_URL,
				params: {
					keyword,
					pageNumber,
				},
			}),
			keepUnusedDataFor: 5,
			providesTags: ["Product"],
		}),
		getProductDetail: builder.query({
			query: (productId) => ({
				url: `${PRODUCTs_URL}/${productId}`,
			}),
			keepUnusedDataFor: 5,
		}),
		createProduct: builder.mutation({
			query: () => ({
				url: `${PRODUCTs_URL}`,
				method: "POST",
			}),
			invalidatesTags: ["Product"],
		}),
		updateProduct: builder.mutation({
			query: (data) => ({
				url: `${PRODUCTs_URL}/${data.productId}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["Products"],
		}),
		uploadProductImage: builder.mutation({
			query: (data) => ({
				url: `/api/upload/products`,
				method: "POST",
				body: data,
			}),
		}),
		deleteProduct: builder.mutation({
			query: (productId) => ({
				url: `${PRODUCTs_URL}/${productId}`,
				method: "DELETE",
			}),
			providesTags: ["Product"],
		}),
		createReview: builder.mutation({
			query: (data) => ({
				url: `${PRODUCTs_URL}/${data.productId}/reviews`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Product"],
		}),
		getTopProducts: builder.query({
			query: () => `${PRODUCTs_URL}/top`,
			keepUnusedDataFor: 5,
		}),
	}),
});

export const {useGetProductsQuery, useGetProductDetailQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductMutation, useCreateReviewMutation, useGetTopProductsQuery} = productsApiSlice;