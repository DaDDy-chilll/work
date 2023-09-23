import { useMutation, useQuery } from 'react-query';
import { fetcher } from '../lib/axios';
import { getQueryString } from '../helpers';

const createDepartment = async (data) => {
  return fetcher.post('/departments', data).then((res) => {
    return res.data;
  });
};

export const useCreateDepartment = () => {
  return useMutation({
    mutationFn: createDepartment,
  });
};

export const getAllDepartments = async (params) => {
  return fetcher.get(`/departments?${getQueryString(params)}`).then((res) => {
    return res.data;
  });
};

export const useGetAllDepartments = (params) => {
  return useQuery({
    queryKey: ['departments', params],
    queryFn: () => getAllDepartments(params)
  });
};
