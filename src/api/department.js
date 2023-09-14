import { useMutation, useQuery } from 'react-query';
import { fetcher } from '../lib/axios';

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

export const getAllDepartments = async (page) => {
    return fetcher
        .get(`/departments?page=${page}&limit=10`)
        .then((res) => {
            return res.data;
        });
}

export const useGetAllDepartments = (page) => {
    return useQuery(['/departments', page], () => getAllDepartments(page), {
    // keepPreviousData: true
  })
}

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