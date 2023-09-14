import { useQuery } from 'react-query';
import { fetcher } from '../lib/axios';

export const getAllWorkflows = async (page) => {
    return fetcher
        .get(`/reviewer-groups?page=${page}&limit=10`)
        .then((res) => {
            return res.data;
        });
}

export const useGetAllWorkflows = (page) => {
    return useQuery(['/reviewer-groups', page], () => getAllWorkflows(page), {
    // keepPreviousData: true
  })
}
