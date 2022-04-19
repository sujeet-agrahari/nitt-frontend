import { makeUseAxios } from 'axios-hooks';
import Axios from 'axios';

import LocalStorageService from './services/local-storage.service';
import refreshToken from './refresh-token';

const axios = Axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

axios.defaults.transformResponse = [
  (responseData) => {
    const { data, error } = JSON.parse(responseData);
    return error || data;
  },
];

// request interceptor to add token to request headers
axios.interceptors.request.use(
  async (config) => {
    const token = LocalStorageService.getAccessToken();
    if (token) {
      config.headers = {
        authorization: token,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor intercepting 401 responses, refreshing token and retrying the request
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { config } = error;
    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;
      return refreshToken(LocalStorageService.getRefreshToken())
        .then((res) => {
          const { accessToken } = res.data.data;
          LocalStorageService.setAccessToken(accessToken);
          return axios(config);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            LocalStorageService.setUser(null);
            window.location.href = '/login';
          }
          return Promise.reject(err);
        });
    }
    return Promise.reject(error);
  }
);

const useAxios = makeUseAxios({
  axios,
});

export default useAxios;
