import { API_BASE_URL, API_TIMEOUT } from '@env';

export const env = {
  apiBaseUrl: API_BASE_URL,
  apiTimeout: Number(API_TIMEOUT) || 20000,
};
