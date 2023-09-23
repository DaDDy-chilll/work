import { useMutation, useQuery } from 'react-query';
import { fetcher } from '../lib/axios';
import { getQueryString } from '../helpers';

const getAllNotifications = async (params) => {
  return fetcher.get(`/notifications/me?${getQueryString(params)}`).then((res) => {
    return res.data;
  });
};

export const useGetAllNotifications = (params) => {
  return useQuery({
    queryKey: ['notifications', params],
    queryFn: () => getAllNotifications(params),
  })
};

const openNotification = async (id) => {
  return fetcher.patch(`/notifications/${id}`, null).then((res) => {
    return res.data;
  });
};

export const useOpenNotification = () => {
  return useMutation({
    mutationFn: openNotification,
  });
};