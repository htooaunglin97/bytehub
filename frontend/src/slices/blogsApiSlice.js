import { BLOGS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const blogsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: ({ pageNumber }) => ({
        url: BLOGS_URL,
        params: {
          pageNumber,
        },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Blog'],
    }),
    getBlogDetail: builder.query({
      query: (blogId) => ({
        url: `${BLOGS_URL}/${blogId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createBlog: builder.mutation({
      query: () => ({
        url: `${BLOGS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Blog'],
    }),
    updateBlog: builder.mutation({
      query: (data) => ({
        url: `${BLOGS_URL}/${data.blogId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Blogs'],
    }),
    uploadBlogImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload/blogs`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `${BLOGS_URL}/${blogId}`,
        method: 'DELETE',
      }),
      providesTags: ['Blog'],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogDetailQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useUploadBlogImageMutation,
  useDeleteBlogMutation,
} = blogsApiSlice;
