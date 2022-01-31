import { api } from '../api/api';

const BASE = '/api';

export const signin = (data) => api.post(`${BASE}/signin`, data);

export const signup = (data) => api.post(`${BASE}/signup`, data);