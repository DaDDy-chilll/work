import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getUsers: builder.query({
      query: (page) => `/users?page=${page}&limit=10&sort=+createdAt`,
      providesTags: (result, error, arg) => ["User"]
    }),

    getUser: builder.query({
      query: (id) => `/users/${id}`,
    }),

    getUserByDeptId: builder.query({
      query: (id) => `/users?department=${id}`,
    }),

    getMyInfo: builder.query({
      query: () => "/users/me",
    }),

  })
})

export const { 
  useGetUsersQuery, 
  useGetUserQuery, 

  useGetUserByDeptIdQuery,

  useGetMyInfoQuery
 } = extendedApiSlice