import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getUsers: builder.query({
      query: () => '/users',
      providesTags: (result, error, arg) => ["User"]
    }),
    getClinicalAdmins: builder.query({
      query: () => '/users?department=clinical_admin',
      providesTags: (result, error, arg) => ["User"]
    }),
    getBOMs: builder.query({
      query: () => '/users?department=bom',
      providesTags: (result, error, arg) => ["User"]
    }),
    getFADs: builder.query({
      query: () => '/users?department=fad',
      providesTags: (result, error, arg) => ["User"]
    }),

    //
    getAdminUsers: builder.query({
      query: () => '/users/approval-eligibility/admin',
      providesTags: (result, error, arg) => ["User"]
    }),

    getFadUsers: builder.query({
      query: () => '/users/approval-eligibility/fad',
      providesTags: (result, error, arg) => ["User"]
    }),

    getUser: builder.query({
      query: (id) => `/users/${id}`,
    }),

    getMyInfo: builder.query({
      query: () => "/users/me",
    }),

  })
})

export const { 
  useGetUsersQuery, 
  useGetAdminUsersQuery, 
  useGetFadUsersQuery, 
  useGetUserQuery, 
  useGetClinicalAdminsQuery, 
  useGetBOMsQuery, 
  useGetFADsQuery,

  useGetMyInfoQuery
 } = extendedApiSlice