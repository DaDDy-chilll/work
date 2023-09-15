import { useQuery } from 'react-query';
import { fetcher } from '../lib/axios';

export const getAllRequests = async (page) => {
  return fetcher.get(`/documents?page=${page}&limit=10`).then((res) => {
    return res.data;
  });
};

export const useGetAllRequests = (page) => {
  return useQuery(['/all', page], () => getAllRequests(page), {
    // keepPreviousData: true
  });
};

export const getMyRequests = async (page) => {
  return fetcher.get(`/documents/me?page=${page}&limit=10`).then((res) => {
    return res.data;
  });
};

export const useGetMyRequests = (page) => {
  return useQuery(['/all', page], () => getMyRequests(page), {
    // keepPreviousData: true
  });
};

export const getInbox = async (page) => {
  return fetcher
    .get(`/documents/to-check?page=${page}&limit=10`)
    .then((res) => {
      return res.data;
    });
};

export const useGetInbox = (page) => {
  return useQuery(['/documents/to-check', page], () => getInbox(page), {
    // keepPreviousData: true
  });
};

const getDocumentDetail = async (id) => {
  return fetcher.get(`/documents/${id}`).then((res) => {
    return res.data;
  });
};

export const useGetDocumentDetail = (id) => {
  return useQuery({
    queryKey: ['document', id],
    queryFn: () => getDocumentDetail(id),
  });
};
