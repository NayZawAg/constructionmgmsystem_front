import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type TypeBankObj = {
  length: number;
  code: string;
  kana: string;
  name: string;
  bank_name: string;
  branch_name: string;
  roma: string;
  hira: string;
  created_at: string;
  updated_at: string;
};

/**
 * bank取得
 * @param {string} bank_code
 */

export const getBankCodeApi = async (bankcode: string) => {
  const response = await api.get<TypeBankObj[]>(
    API_URL.bank.getBankByBankCode(bankcode),
  );
  return response;
};

/**
 * branch取得
 * * @param {string} branch_code
 */

export const getBranchCodeApi = async (
  bankcode: string,
  branchcode: string,
) => {
  const response = await api.get<TypeBankObj[]>(
    API_URL.branch.getBranchByBranchCode(bankcode, branchcode),
  );
  return response;
};
