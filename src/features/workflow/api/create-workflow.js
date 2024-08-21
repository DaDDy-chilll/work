import { useMutation } from 'react-query';
import { fetcher } from '../../../lib/axios';

const createWorkflow = async (data) =>
  fetcher.post('/reviewer-groups', data).then((res) => res.data);

export const useCreateWorkflow = () =>
  useMutation({
    mutationFn: createWorkflow,
  });
