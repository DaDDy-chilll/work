import { revisionRoute } from "../utils/APIRoutes";
import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getRevisions: builder.query({
            query: (id) => `${revisionRoute}/active?documentId=${id}`,
        }),

    })
})

export const { useGetRevisionsQuery } = extendedApiSlice