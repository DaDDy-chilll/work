import { useLocation } from 'react-router-dom';

export const useGetCurrentPath = () => {
  const { pathname } = useLocation();
  return pathname;
};
