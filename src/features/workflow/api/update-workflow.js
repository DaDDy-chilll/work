import { useMutation } from 'react-query';
import { fetcher } from '../../../lib/axios';

const updateWorkflow = async ({ id, ...data }) =>
  fetcher.patch(`/reviewer-groups/${id}`, data).then((res) => res.data);

export const useUpdateWorkflow = () =>
  useMutation({
    mutationFn: updateWorkflow,
  });
