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
    queryFn: () => getAllRequests(params),
  });
};

export const getPurchaseRequests = async (params) => {
  return fetcher.get(`/documents/me?${getQueryString(params)}`).then((res) => {
    return res.data;
  });
};

export const useGetPurchaseRequests = (params) => {
  return useQuery({
    queryKey: ['purchase-requests', params],
    queryFn: () => getPurchaseRequests(params),
  });
};


export const useGetPurchaseOrders = (params) => {
  return useQuery({
    queryKey: ['purchase-orders', params],
    queryFn: () => getPurchaseRequests(params),
  });
};

export const getMentionedRequests = async (params) => {
  return fetcher
    .get(`/documents/mention?${getQueryString(params)}`)
    .then((res) => {
      return res.data;
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
    queryFn: () => {
      if (params.mentioned) {
        delete params.mentioned;
        return getMentionedRequests(params);
      }
      return getInbox(params);
    },
  });
};

const getDocumentDetail = async (id,workflowType) => {
  return fetcher.get(`/documents/${id}?workflowType=${workflowType}`).then((res) => {
    return res.data;
  });
};

export const useGetDocumentDetail = (id,workflowType) => {
  return useQuery({
    queryKey: ['document', id,workflowType],
    queryFn: () => getDocumentDetail(id,workflowType)
  });
};

const createRequest = async ({ data, attachments }) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value);
    }
  });

  if (attachments?.length !== 0) {
    for (let i = 0; i < attachments?.length; i++) {
      formData.append('attachments', attachments[i]);
    }
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

  if (attachments?.length !== 0) {
    for (let i = 0; i < attachments?.length; i++) {
      formData.append('attachments', attachments[i]);
    }
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

const changeStatus = async ({ data, id, attachments }) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value);
    }
  });

  if (attachments?.length !== 0) {
    for (let i = 0; i < attachments?.length; i++) {
      formData.append('attachments', attachments[i]);
    }
  }

  return fetcher
    .post(`/documents/${id}/actions/${data.action}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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

const rejectDocument = async ({ data, id, attachments }) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value);
    }
  });

  if (attachments?.length !== 0) {
    for (let i = 0; i < attachments?.length; i++) {
      formData.append('attachments', attachments[i]);
    }
  }

  return fetcher
    .post(`/documents/${id}/reject`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const useRejectDocument = () => {
  return useMutation({
    mutationFn: rejectDocument,
  });
};

const mentionDocument = async ({ data, id, attachments }) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        for (var i = 0; i < value.length; i++) {
          formData.append(`${key}[]`, value[i]);
        }
      } else {
        formData.append(key, value);
      }
    }
  });

  if (attachments?.length !== 0) {
    for (let i = 0; i < attachments?.length; i++) {
      formData.append('attachments', attachments[i]);
    }
  }
  return fetcher
    .post(`/documents/${id}/mention`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const useMentionDocument = () => {
  return useMutation({
    mutationFn: mentionDocument,
  });
};

const returnDocument = async ({ data, id, attachments }) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value);
    }
  });

  if (attachments?.length !== 0) {
    for (let i = 0; i < attachments?.length; i++) {
      formData.append('attachments', attachments[i]);
    }
  }

  return fetcher
    .post(`/documents/${id}/actions/return`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const useReturnDocument = () => {
  return useMutation({
    mutationFn: returnDocument,
  });
};

const acknowledgeDocument = async ({ data, id, revisionId }) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value);
    }
  });

  return fetcher
    .post(`/documents/${id}/revisions/${revisionId}`, formData)
    .then((res) => {
      return res.data;
    });
};

export const useAcknowledgeDocument = () => {
  return useMutation({
    mutationFn: acknowledgeDocument,
  });
};
