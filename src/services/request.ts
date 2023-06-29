import axios, {AxiosRequestConfig} from 'axios';
import {APIS_CONSTANTS} from './constants';
import {getStoreInstance} from '@src/store/store';

class APIRequest {
  constructor() {
    const state = getStoreInstance().store.getState();

    axios.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config as AxiosRequestConfig;

        if (error.response?.status === 401) {
          try {
            const response = await axios.post<{access_token: string}>(
              `${APIS_CONSTANTS.BASE_URL_AUTH}/login`,
              {
                email: state.login.username,
                password: state.login.password,
              },
            );

            const accessToken = response.data.access_token;
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
          } catch (e) {
            console.error('axio error', e);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  public async get<T>(
    endpoint: string,
    isAuth = false,
    params: object = {},
  ): Promise<T> {
    const state = getStoreInstance().store.getState();

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${state.login.token}`,
      },
      params,
    };
    if (isAuth) {
      config.headers = {};
    }
    try {
      const response = await axios.get<T>(`${endpoint}`, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async post<T>(
    endpoint: string,
    isAuth = false,
    data: object = {},
  ): Promise<T> {
    const state = getStoreInstance().store.getState();

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${state.login.token}`,
      },
    };
    if (isAuth) {
      config.headers = {};
    }
    try {
      console.log('***apiclient*** post', `${endpoint}`);

      const response = await axios.post<T>(`${endpoint}`, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Implement other HTTP methods as needed (e.g., put(), delete(), etc.)
}

export default APIRequest;
