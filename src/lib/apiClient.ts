import { env } from '../config/env';

/** Orval custom mutator: called as customInstance<T>(url, options?) by Orval-generated code.
 *  Returns the parsed JSON body directly (flat — no { data, status, headers } envelope).
 */
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
