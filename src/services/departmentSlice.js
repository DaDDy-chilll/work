import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getDepartments: builder.query({
            query: () => `/departments?page=1&limit=100&sort=+createdAt`,
            providesTags: (result, error, arg) => ["Department"]
        }),

        getDepartment: builder.query({
            query: (id) => `/departments/${id}`,
        }),

        addDepartment: builder.mutation({
            query: (payload) => ({
                url: '/departments',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Department'],
        }),

    })
})

export const {
    useGetDepartmentsQuery,
    useGetDepartmentQuery,
    useAddDepartmentMutation
} = extendedApiSlice