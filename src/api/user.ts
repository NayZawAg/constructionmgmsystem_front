import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type TypeUser = {
  id: number;
  name: string;
};
export const getUserList = async () => {
  const response = await api.get<TypeUser[]>(API_URL.users.list);
  return response;
};
