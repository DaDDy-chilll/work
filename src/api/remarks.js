import { useQuery } from 'react-query';
import { fetcher } from '../lib/axios';

export const getAllRemarks = async (documentId) => {
  return fetcher
    .get(`/histories?documentId=${documentId}&limit=0`)
    .then((res) => {
      return res.data;
    });
};

export const useGetAllRemarks = (documentId) => {
  return useQuery({
    queryFn: () => getAllRemarks(documentId),
    queryKey: ['remarks'],
  });
};
