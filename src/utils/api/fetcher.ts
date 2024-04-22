import { api } from './api';

export const fetcher = async <T>(url: string): Promise<T> => {
  const result = (await api.get(url)) as T;
  if (!result) throw new Error();
  return result;
};
