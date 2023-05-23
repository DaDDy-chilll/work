import { remarkRoute } from "../utils/APIRoutes";
import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getRemarks: builder.query({
            query: (id) => `${remarkRoute}?documentId=${id}`,
        }),

    })
})

export const { useGetRemarksQuery } = extendedApiSlice