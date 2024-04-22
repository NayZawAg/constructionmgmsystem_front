import {
  CooperatorList,
  CooperatorStructure,
} from '@/interfaces/cooperatorList';
import { Meta } from '@/interfaces/meta';
import { MiddleCategory } from '@/interfaces/middleCategories';
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';
export type AddCooperatorRequest = {
  cooperators: CooperatorsType;
  middle_data: number[];
};

export type CooperatorsType = {
  collection_code: string;
  name: string;
  kana: string;
  branch_name: string;
  branch_kana: string;
  phone_no: string;
  fax: string;
  email: string;
  url: string;
  representative_name: string;
  representative_name_kana: string;
  representative_email: string;
  corporate_no: string;
  zipcode: string;
  prefecture: string;
  municipality: string;
  address_1: string;
  address_2: string;
  address: string;
  address_kana: string;
  bank_code: string;
  bank_branch_code: string;
  transfer_bank_name: string;
  transfer_branch_name: string;
  account_type: number;
  account_no: string;
  account_name: string;
  source_income_flag: boolean;
  invoice_no_flag: boolean;
  invoice_no: string;
  membership_fee_rank: string;
  membership_fee_rate: number;
  reserve_money_default_setting: boolean;
  use_suspension_flag: boolean;
  suspension_reason: string;
  qualification_license: string;
};
export type CooperatorBasicInfo = {
  code: string;
  collection_code: string;
  name: string;
  branch_name: string;
  kana: string;
  phone_no: string;
  fax: string;
  email: string;
  url: string;
  representative_name: string;
  representative_name_kana: string;
  representative_email: string;
  corporate_no: string;
  zipcode: string;
  prefecture: string;
  municipality: string;
  address_1: string;
  address_2: string;
  address: string;
  address_kana: string;
  transfer_bank_name: string;
  transfer_branch_name: string;
  account_type: number;
  account_no: string;
  account_name: string;
  source_income_flag: boolean;
  invoice_no: string;
};

export type TypeCooperatorDetail = {
  cooperator_detail: CooperatorDetail;
  cooperator_middle_categories: CooperatorMiddleCategory[];
};

export type CooperatorDetail = {
  code: string;
  collection_code: string;
  name: string;
  branch_name: string;
  kana: string;
  branch_kana: string;
  phone_no: string;
  fax: string;
  email: string;
  url: string;
  representative_name: string;
  representative_name_kana: string;
  representative_email: string;
  corporate_no: string;
  zipcode: string;
  prefecture: string;
  municipality: string;
  address_1: string;
  address_2: string;
  address: string;
  address_kana: string;
  bank_code: string;
  bank_branch_code: string;
  transfer_bank_name: string;
  transfer_branch_name: string;
  account_type: number;
  account_no: string;
  account_name: string;
  source_income_flag: boolean;
  invoice_no_flag: boolean;
  invoice_no: string;
  membership_fee_rank: string;
  membership_fee_rate: number;
  reserve_money_default_setting: boolean;
  use_suspension_flag: boolean;
  suspension_reason: string;
  qualification_license: string;
};

export type CooperatorMiddleCategory = {
  middle_category_id: number;
};

export const getBasicInformation = async () => {
  const response = await api.get<CooperatorBasicInfo>(
    API_URL.cooperator.basicInfo(),
  );
  return response;
};

/**
 * 工事取得
 * @param {number} id
 */
export const getCooperatorDetail = async (id: number) => {
  const response = await api.get<TypeCooperatorDetail>(
    API_URL.cooperator.detail(id),
  );
  return response;
};

export type cooperatorList = {
  results: CooperatorList[];
  meta: Meta;
};

export const CooperatorListapi = async (
  cooperator_code: string,
  cooperator_name: string,
  address: string,
  construction_type_name: string,
  page: number,
  per_page: number,
) => {
  const response = await api.get<cooperatorList>(
    API_URL.cooperator.conditionslist(
      cooperator_code,
      cooperator_name,
      address,
      construction_type_name,
      page,
      per_page,
    ),
  );
  return response;
};

// 工事体制の協力会社
export const getCooperators = async (id: number) => {
  const response = await api.get<CooperatorStructure>(
    API_URL.cooperator.cooperator_structure(id),
  );
  return response;
};

/**
 * 協力会社加
 * @param {AddCooperatorRequest} data
 */
export const addCooperator = async (data: AddCooperatorRequest) => {
  const response = await api.post<CooperatorsType>(
    API_URL.cooperator.addCooperatorList,
    { ...data },
  );
  return response;
};

/**
 * 協力会社加
 * @param {AddCooperatorRequest} data
 */
export const updateCooperator = async (
  data: AddCooperatorRequest,
  id: number,
) => {
  const response = await api.put<CooperatorsType>(
    API_URL.cooperator.update(id),
    { ...data },
  );
  return response;
};

export const getMiddleCategoryList = async () => {
  const response = await api.get<MiddleCategory[]>(API_URL.middleCategory.list);
  return response;
};
