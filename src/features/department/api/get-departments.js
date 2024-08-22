import { fetcher } from '@/lib/axios';
import { getQueryString } from '@/helpers';
import { useQuery } from 'react-query';

export const getDepartments = async (params) =>
  fetcher.get(`/departments?${getQueryString(params)}`).then((res) => res.data);

export const useGetDepartments = (params) =>
  useQuery({
    queryKey: ['departments', params],
    queryFn: () => getDepartments(params),
  });
