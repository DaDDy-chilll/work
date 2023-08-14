import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllRequests: builder.query({
      query: (caseStatus) => {
        const params = new URLSearchParams({
          ...(caseStatus && { caseStatus })
        }).toString()
        return `/documents?${params}`
      },
      providesTags: (result, error, arg) => ["Document"]
    }),

    getInbox: builder.query({
      query: (caseStatus) => {
        const params = new URLSearchParams({
          ...(caseStatus && { caseStatus })
        }).toString()
        return `/documents/to-check?${params}`
      },
      providesTags: (result, error, arg) => ["Document"]
    }),

    getToAcknowledgeDocuments: builder.query({
      query: (caseStatus) => {
        const params = new URLSearchParams({
          ...(caseStatus && { caseStatus })
        }).toString()
        return `/documents/to-acknowledge?${params}`
      },
      providesTags: (result, error, arg) => ["Document"]
    }),

    getMyRequests: builder.query({
      query: (caseStatus) => {
        const params = new URLSearchParams({
          ...(caseStatus && { caseStatus })
        }).toString()
        return `/documents/me?${params}`
      },
      providesTags: (result, error, arg) => ["Document"]
    }),

    getDocument: builder.query({
      query: (id) => `/documents/${id}`,
      providesTags: (result, error, arg) => ["Document"]
    }),

  })
})

export const {
  useGetMyRequestsQuery,
  useGetAllRequestsQuery,
  useGetInboxQuery,
  useGetToAcknowledgeDocumentsQuery,
  useGetDocumentQuery
} = extendedApiSlice