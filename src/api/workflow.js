import { useMutation, useQuery } from 'react-query';
import { fetcher } from '../lib/axios';

export const getAllWorkflows = async ({ page, limit }) => {
  return fetcher
    .get(`/reviewer-groups?page=${page}&limit=${limit}`)
    .then((res) => {
      return res.data;
    });
};

export const useGetAllWorkflows = ({ page = 1, limit = 0 }) => {
  return useQuery(['/reviewer-groups', page], () =>
    getAllWorkflows({ page, limit }),
  );
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
