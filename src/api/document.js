import { useMutation, useQuery } from 'react-query';
import { fetcher } from '../lib/axios';
import { getQueryString } from '../helpers';

export const getAllRequests = async (params) => {
  return fetcher.get(`/documents?${getQueryString(params)}`).then((res) => {
    return res.data;
  });
};

export const useGetAllRequests = (params) => {
  return useQuery({
    queryKey: ['all', params],
    queryFn: () => getAllRequests(params)
  });
};

export const getMyRequests = async (params) => {
  return fetcher.get(`/documents/me?${getQueryString(params)}`).then((res) => {
    return res.data;
  });
};

export const useGetMyRequests = (params) => {
  return useQuery({
    queryKey: ['my-requests', params],
    queryFn: () => getMyRequests(params)
  });
};

export const getInbox = async (params) => {
  return fetcher
    .get(`/documents/to-check?${getQueryString(params)}`)
    .then((res) => {
      return res.data;
    });
};

export const useGetInbox = (params) => {
  return useQuery({
    queryKey: ['inbox', params],
    queryFn: () => getInbox(params)
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

  return fetcher
    .post('/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const useCreateRequest = () => {
  return useMutation({
    mutationFn: createRequest,
  });
};

const editRequest = async ({ data, attachments, id }) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value);
    }
  });

  for (let i = 0; i < attachments.length; i++) {
    formData.append('attachments', attachments[i]);
  }

  return fetcher
    .post(`/documents/${id}/actions/prepare`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const useEditRequest = () => {
  return useMutation({
    mutationFn: editRequest,
  });
};

const changeStatus = async ({ data, id }) => {
  return fetcher
    .post(`/documents/${id}/actions/${data.action}`, {
      remark: data.remark,
    })
    .then((res) => {
      return res.data;
    });
};

export const useChangeStatus = () => {
  return useMutation({
    mutationFn: changeStatus,
  });
};
