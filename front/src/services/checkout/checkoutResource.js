import { api } from '../api/api';

const BASE = 'v1/checkout';

export const validate = ({ txn, address }) => api.post(`${BASE}/validation`, {
  txn,
  address
});

export const getPrices = () => api.get(`${BASE}/price`);