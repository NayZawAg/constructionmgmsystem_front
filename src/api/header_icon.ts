import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type HeaderIconRequest = {
  image: File;
};

/**
 * header icon 登録
 * @param {HeaderIconRequest} data
 */
export const uploadHeaderIcon = async (data: HeaderIconRequest) => {
  const form = new FormData();
  form.append('image', data['image']);
  const response = await api.post(API_URL.header_icon, form);
  return response;
};
