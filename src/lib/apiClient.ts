import { env } from '../config/env';

export const customInstance = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${env.VITE_API_BASE_URL}${url}`, options);

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status} for ${url}`);
  }

  // 204/empty bodies return null
  const text = await response.text();
  return (text ? JSON.parse(text) : null) as T;
};

export default customInstance;
