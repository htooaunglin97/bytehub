import {apiSlice} from './apiSlice';
import { ORDERS_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createOrder: builder.mutation({
			query: (order) => ({
				url: ORDERS_URL,
				method: "POST",
				body: order,
			}),
		}),
		getOrderDetails: builder.query({
			query: (orderId) => ({
				url: `${ORDERS_URL}/${orderId}`,
			}),
			keepUnusedDataFor: 5,
		}),
		getMyOrders: builder.query({
			query: (orderId) => ({
				url: `${ORDERS_URL}/mine`,
			}),
			keepUnusedDataFor: 5,
		}),
		getAllOrders: builder.query({
			query: ({pageNumber}) => ({
				url: ORDERS_URL,
				params: {
					pageNumber,
				}
			}),
			keepUnusedDataFor: 5,
		}),
		payOrder: builder.mutation({
			query: (orderId) => ({
				url: `${ORDERS_URL}/${orderId}/pay`,
				method: "PUT",
			}),
		}),
		deliverOrder: builder.mutation({
			query: (orderId) => ({
				url: `${ORDERS_URL}/${orderId}/deliver`,
				method: "PUT",
			}),
		}),
	}),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery, useGetMyOrdersQuery, useGetAllOrdersQuery, usePayOrderMutation,useDeliverOrderMutation } = ordersApiSlice;