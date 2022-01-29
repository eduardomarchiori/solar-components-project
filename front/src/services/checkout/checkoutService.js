import * as checkoutResource from './checkoutResource';

export const validate = async ({ txn, address }) => {
  const response = await checkoutResource.validate({ txn, address })
  return response.data;
}

export const getPrices = async () => {
  const response = await checkoutResource.getPrices();
  return response.data;
}