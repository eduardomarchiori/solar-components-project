import { api } from '../api/api';

const BASE = '/api';

export const getUser = () => api.get(`${BASE}/user`);
