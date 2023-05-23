import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie';
import { host } from '../utils/APIRoutes';

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({
        baseUrl: host,
        prepareHeaders: (headers) => {
            headers.set('Authorization', "Bearer " + Cookies.get('accessToken'));
        },
    }),
    tagTypes: ['Document', 'User', 'Group'],
    endpoints: builder => ({})
})