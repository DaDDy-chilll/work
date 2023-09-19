import { useMutation, useQuery } from 'react-query';
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

const createRequest = async ({ data, attachments }) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value);
    }
  });

  for (let i = 0; i < attachments.length; i++) {
    formData.append('attachments', attachments[i]);
  }

  console.log(formData.get('attachments'));
  console.log(formData.get('workflowId'));

  // return fetcher
  //   .post('/documents', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   })
  //   .then((res) => {
  //     return res.data;
  //   });
};

export const useCreateRequest = () => {
  return useMutation({
    mutationFn: createRequest,
  });
};
