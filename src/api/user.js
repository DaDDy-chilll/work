import { useMutation, useQuery } from 'react-query';
import { fetcher } from '../lib/axios';

const createUser = async (data) => {
  return fetcher.post('/auth/register', data).then((res) => {
    return res.data;
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
  });
};

const editUser = async ({ data, id }) => {
  return fetcher.patch(`/users/${id}`, data).then((res) => {
    return res.data;
  });
};

export const useEditUser = () => {
  return useMutation({
    mutationFn: editUser,
  });
};

const editPassword = async (data) => {
  return fetcher.patch('/auth/password', data).then((res) => {
    return res.data;
  });
};

export const useEditPassword = () => {
  return useMutation({
    mutationFn: editPassword,
  });
};

const disableUser = async (id) => {
  return fetcher.post(`/users/${id}/disable`, null).then((res) => {
    return res.data;
  });
};

export const useDisableUser = () => {
  return useMutation({
    mutationFn: disableUser,
  });
};

export const getAllUsers = async (page) => {
  return fetcher
    .get(`/users?page=${page}&limit=10`)
    .then((res) => {
      return res.data;
    });
}

export const useGetAllUsers = (page) => {
  return useQuery(['/users', page], () => getAllUsers(page), {
    // keepPreviousData: true
  })
}

const getUserDetail = async (id) => {
  return fetcher.get(`/users/${id}`).then((res) => {
    return res.data;
  });
};

export const useGetUserDetail = (id) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserDetail(id),
  });
};