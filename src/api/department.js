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
  return useQuery(['/departments', params], () => getAllDepartments(params), {
    // keepPreviousData: true
  });
};

const fetchAllDepartments = async (params) => {
  const sanitizedParams = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      sanitizedParams[key] = value.toString();
    }
  });

  const queryString = new URLSearchParams(sanitizedParams).toString();

  return fetcher.get(`/departments?${queryString}`).then((res) => res.data);
};

export const useFetchAllDepartments = (params) => {
  return useQuery({
    queryFn: () => fetchAllDepartments(params),
    queryKey: ['departments'],
  });
};
