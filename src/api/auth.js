import { useMutation } from 'react-query';
import { fetcher } from '../lib/axios';

const login = async (data) => {
  return fetcher.post('/auth/login', data).then((res) => {
    return res.data;
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
