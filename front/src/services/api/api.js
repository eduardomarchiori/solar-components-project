import axios from "axios";
import { getCookie, hasCookie } from '../common/cookie'

const config = () => {

  const instance = axios.create({
    baseURL: 'http://localhost:5003',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  instance.interceptors.request.use((config) => {
    const headers = {};
    if(hasCookie('accessToken')){
      headers['x-authorization'] = getCookie('accessToken');
    }

    config.headers = {
      ...config.headers,
      ...headers
    }

    return config;
  });

  instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if(error.response.status === 401){
      window.location.href = '/singin'
    }
    return Promise.reject(error);
  });

  return instance;
}

export const api = config();