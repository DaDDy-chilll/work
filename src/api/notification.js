import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { fetcher } from '../lib/axios';
import { getQueryString } from '../helpers';

const infiniteNotifications = async (page) => {
  return fetcher
    .get(`/notifications/me?page=${page}&limit=10`)
    .then((res) => {
      return res.data;
    });
}

export const useInfiniteNotifications = () => {
  return useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: ({ pageParam = 1 }) => {
      return infiniteNotifications(pageParam)
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.payload.length === 10 ? allPages.length + 1 : undefined;
      return nextPage;
    }
  })
}

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