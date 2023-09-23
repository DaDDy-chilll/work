/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from 'react';
import axios, { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetcher } from '../lib/axios';
import { toast } from 'react-toastify';
import { ROLES } from '../constants/roles';

function reducer(state, action) {
  switch (action.type) {
    case 'STARTED_LOG_IN':
      return {
        ...state,
        isLoggingIn: true,
      };

    case 'DONE_LOG_IN':
      return {
        ...state,
        ...action.payload,
        isLoggingIn: false,
      };

    case 'LOGGED_IN':
      return {
        ...state,
        ...action.payload,
        isLoggingIn: false,
        isValidatingUser: false,
      };

    case 'LOGGED_OUT':
      return {
        ...state,
        user: null,
        isValidatingUser: false,
      };

    case 'STARTED_VALIDATING_USER':
      return {
        ...state,
        isValidatingUser: true,
      };

    case 'ENDED_VALIDATING_USER':
      return {
        ...state,
        isValidatingUser: false,
      };

    default:
      return state;
  }
}

const initialState = {
  user: null,
  isValidatingUser: true,
  isLoggingIn: false,
};

export const AuthContext = createContext({
  ...initialState,
  login: () => {},
  logout: () => {},
  validateUser: () => {},
});

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  useEffect(() => {
    const validateUser = async () => {
      try {
        if (!state.user) {
          dispatch({ type: 'STARTED_VALIDATING_USER' });
        }

        const { data } = await fetcher.get(`/users/me`);

        if (data.payload) {
          dispatch({ type: 'LOGGED_IN', payload: { user: data.payload } });
        }
      } catch (error) {
        if (isAxiosError(error) && error.status === 401) {
          logout();
          navigate('/login');
        }
      } finally {
        dispatch({ type: 'ENDED_VALIDATING_USER' });
      }
    };
    validateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const login = async (payload) => {
    try {
      dispatch({ type: 'STARTED_LOG_IN' });

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        payload,
      );

      localStorage.setItem('access-token', data?.payload?.accessToken);

      dispatch({ type: 'LOGGED_IN', payload: { user: data?.payload } });

      if (data?.payload?.user?.role === ROLES.SUPER_ADMIN) {
        return navigate('/users');
      }

      navigate('/all');
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({ type: 'DONE_LOG_IN', payload: null });
    }
  };

  const logout = () => {
    localStorage.removeItem('access-token');
    dispatch({ type: 'LOGGED_OUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
