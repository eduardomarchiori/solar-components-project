import * as userResource from './userResource';

export const getUser = async () => {
  const response = await userResource.getUser();
  return response.data;
}
