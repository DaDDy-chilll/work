import { useQuery } from 'react-query';
import { fetcher } from '../lib/axios';

export const getAllMentions = async (documentId) => {
  return fetcher
    .get(`/mentions?documentId=${documentId}&limit=0`)
    .then((res) => {
      return res.data;
    });
};

export const useGetAllMentions = (documentId) => {
  return useQuery({
    queryFn: () => getAllMentions(documentId),
    queryKey: ['mentions'],
  });
};
