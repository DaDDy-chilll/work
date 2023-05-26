import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getGroups: builder.query({
      query: () => '/reviewer-groups',
      providesTags: (result, error, arg) => ["Group"]
    }),

    getGroup: builder.query({
      query: (id) => `/reviewer-groups/${id}`,
    }),

  })
})

export const { useGetGroupsQuery, useGetGroupQuery } = extendedApiSlice