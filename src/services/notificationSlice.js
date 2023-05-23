import { notiRoute } from "../utils/APIRoutes";
import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getNotifications: builder.query({
            query: () => `${notiRoute}/me`,
        }),

    })
})

export const { useGetNotificationsQuery } = extendedApiSlice