import { fetcher } from '@/lib/axios';
import { getQueryString } from '@/helpers';
import { useQuery } from 'react-query';

export const getUsers = async (params) =>
  fetcher.get(`/users?${getQueryString(params)}`).then((res) => res.data);

export const useGetUsers = (params) =>
  useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
  });
