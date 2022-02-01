import * as solarResource from './solarResource';

export const createSolarComponent = async (data) => {
  const response = await solarResource.createSolarComponent(data)
  return response.data;
}

export const updateSolarComponent = async (data) => {
  const response = await solarResource.updateSolarComponent(data)
  return response.data;
}

export const getSolarComponents = async (data) => {
  const response = await solarResource.getSolarComponents(data)
  return response.data;
}

export const deleteSolarComponent = async (data) => {
  const response = await solarResource.deleteSolarComponent(data)
  return response.data;
}

export const calculateCubage = async (data) => {
  const response = await solarResource.calculateCubage(data)
  return response.data;
}