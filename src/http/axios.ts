import { Storage } from '@capacitor/storage';
import Axios, { AxiosError, AxiosResponse } from 'axios';
import { HttpResponse } from './http.model';

/**
 * Set Axios default Config
 */
Axios.defaults.baseURL = import.meta.env.VITE_API_URL;
Axios.defaults.timeout = 5000;
Axios.defaults.headers.common = {
  'X-Authorization': import.meta.env.VITE_X_AUTHORIZATION,
  'Content-Type': 'application/json'
};

/**
 * Intercept request
 */
Axios.interceptors.request.use(async (config) => {
  if (config.headers) {
    // set accept language to current language
    config.headers['Accept-Language'] = localStorage.getItem('i18nextLng') || '';

    // intercept token into headers
    if (!config.headers.authorization) {
      const token = (await (await Storage.get({ key: 'token' })).value) || '';
      config.headers.authorization = token;
    }
  }

  // set data to empty object if no data
  if (config.method === 'post') {
    if (!config.data) {
      config.data = {};
    }
  }

  // intercept username, token
  // const username = localStorage.getItem('username');
  // const token = localStorage.getItem('token');
  // if (username && token) {
  //   config.data.username = config.data.username || username;
  //   config.data.token = config.data.token || token;
  // }

  // gen hash
  // config.data.hash = genHash(config.data, import.meta.env.REACT_APP_SECRET_KEY);
  // }
  return config;
});

/**
 * Intercept response
 */
Axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    if (response.config.url === '/member/logout' && response.data?.rst === 0) {
      // dont show error if is logout
      response.data.rst = 1;
    }
    return response;
  },
  (error: AxiosError) => {
    const _error = {
      name: error.name,
      stack: error.stack,
      message: error.message,
      code: error.response?.status.toString()
    };
    return Promise.reject(_error);
  }
);
