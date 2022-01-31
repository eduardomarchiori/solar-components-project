import * as authenticationResource from './authenticationResource';

export const signin = async (data) => {
  const response = await authenticationResource.signin(data)
  return response.data;
}

export const signup = async (data) => {
  const response = await authenticationResource.signup(data);
  return response.data;
}