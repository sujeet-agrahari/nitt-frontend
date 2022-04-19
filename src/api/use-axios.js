import { useState, useEffect } from 'react';
import axios from 'axios';
import LocalStorageService from './services/local-storage.service';

import refreshToken from './refresh-token';

const Client = axios.create();

Client.defaults.baseURL = 'http://localhost:3000/api/v1';

Client.interceptors.request.use(
  (config) => {
    config.headers.Authorization = LocalStorageService.getAccessToken();
    return config;
  },
  (error) =>
    // Do something with request error
    Promise.reject(error)
);

Client.interceptors.response.use(
  (response) => response,
  (error) => {
    // Reject promise if usual error
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }
    const originalRequest = error.config;
    return refreshToken(LocalStorageService.getRefreshToken())
      .then((res) => {
        const { accessToken } = res.data.data;
        console.log('accessToken', accessToken);
        Client.defaults.headers.common.Authorization = accessToken;
        // update local storage
        console.log('Response', originalRequest.url, accessToken);
        LocalStorageService.setAccessToken(accessToken);
        return Client(originalRequest);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          LocalStorageService.setUser(null);
          window.location.href = '/login';
          return false;
        }
        return Promise.reject(err);
      });
  }
);

export const useAxios = (axiosParams, isAuto = true) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async (params) => {
    try {
      const result = await Client.request({
        ...params,
        method: params.method || 'GET',
        headers: {
          accept: 'application/json',
        },
      });
      setResponse(result.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuto) fetchData(axiosParams);
  }, [axiosParams, isAuto]); // execute once only

  return { fetch: () => fetchData(axiosParams), response, error, loading };
};
