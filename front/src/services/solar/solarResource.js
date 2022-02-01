import { api } from '../api/api';

const BASE = '/api';

export const calculateCubage = (data) => api.post(`${BASE}/solar-component/calculate`, data);

export const createSolarComponent = (data) => api.post(`${BASE}/solar-component`, data);

export const updateSolarComponent = (data) => api.put(`${BASE}/solar-component`, data);

export const getSolarComponents = () => api.get(`${BASE}/solar-component`);

export const deleteSolarComponent = ({ solarComponentId }) => api.delete(`${BASE}/solar-component/${solarComponentId}`);
