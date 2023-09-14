import { useQuery } from 'react-query';
import { fetcher } from '../lib/axios';

const getAllNotifications = async () => {
  return fetcher.get('/notifications/me').then((res) => {
    return res.data;
  });
};

export const useGetAllNotifications = () => {
  return useQuery({
    queryFn: () => getAllNotifications(),
  });
};
