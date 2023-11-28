import { useMutation, useQuery } from 'react-query';
import { fetcher } from '../lib/axios';
import { getQueryString } from '../helpers';

export const getAllWorkflows = async (params) => {
  return fetcher
    .get(`/reviewer-groups?${getQueryString(params)}`)
    .then((res) => {
      return res.data;
    });
};

export const useGetAllWorkflows = (params) => {
  return useQuery({
    queryKey: ['workflows', params],
    queryFn: () => getAllWorkflows(params),
  });
};

const getWorkflowDetail = async (id) => {
  return fetcher.get(`/reviewer-groups/${id}`).then((res) => {
    return res.data;
  });
};

export const useGetWorkflowDetail = (id) => {
  return useQuery({
    queryKey: ['workflow', id],
    queryFn: () => getWorkflowDetail(id),
  });
};

const createWorkflow = async (data) => {
  return fetcher.post('/reviewer-groups', data).then((res) => {
    return res.data;
  });
};

export const useCreateWorkflow = () => {
  return useMutation({
    mutationFn: createWorkflow,
  });
};

const saveWorkflow = async (id) => {
  return fetcher.patch(`/reviewer-groups/${id}/favourite`).then((res) => {
    return res.data;
  });
};

export const useSaveWorkflow = () => {
  return useMutation({
    mutationFn: saveWorkflow,
  });
};
