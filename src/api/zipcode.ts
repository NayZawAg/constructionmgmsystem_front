import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type TypeAddressObj = {
  zipcode: string;
  prefcode: string;
  address1: string;
  address2: string;
  address3: string;
  kana1: string;
  kana2: string;
  kana3: string;
  prefecture: string;
  municipality: string;
  address: string;
};

/**
 * zipcode取得
 * @param {string} zipcode
 */

export const getZipcodeApi = async (zipcode: string) => {
  const response = await api.get<TypeAddressObj[]>(
    API_URL.zipcode.getAddressByZipcode(zipcode),
  );
  return response;
};
