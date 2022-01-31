import axios from "axios";
import { getCookie, hasCookie } from '../common/cookie'

const config = () => {

  const headers = {};

  if(hasCookie('accessToken')){
    headers['x-authorization'] = getCookie('accessToken');
  }

  return axios.create({
    baseURL: 'http://localhost:5003',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  })
}

export const api = config();