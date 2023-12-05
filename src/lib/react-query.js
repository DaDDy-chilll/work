import { QueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: (error) => {
        if (isAxiosError(error)) {
          return error.status === 401 || error.status === 503;
        }

        return true;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      useErrorBoundary: (error) => {
        if (isAxiosError(error)) {
          return error.status === 401;
        }

        return true;
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          const { response } = error;

          toast.error(response?.data?.message ?? 'Unknown Error');
        } else {
          toast.error('Something went wrong.');
        }
      },
    },
  },
});
