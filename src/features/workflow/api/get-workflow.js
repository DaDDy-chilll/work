import { fetcher } from '@/lib/axios';
import { useQuery } from 'react-query';

const getWorkflow = async (id) =>
  fetcher.get(`/reviewer-groups/${id}`).then((res) => res.data);

export const useGetWorkflow = (id) =>
  useQuery({
    queryKey: ['workflow', id],
    queryFn: () => getWorkflow(id),
  });
