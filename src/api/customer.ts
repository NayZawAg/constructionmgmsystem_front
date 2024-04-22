import { Meta } from '@/interfaces/meta';
import { api } from '@/utils/api/api';
import { API_URL } from '@/utils/constants/api';

export type CustomerData = {
  results: CustomerLists[];
  meta: Meta;
};

export type CustomerLists = {
  id: number;
  customer_code: string;
  customer_name: string;
  collection_code: string;
  corporation_no: string;
  invoice_no: string;
  company_name: string;
  company_name_kana: string;
  branch_department_name: string;
  branch_department_kana: string;
  zipcode: string;
  prefecture: string;
  municipality: string;
  address_1: string;
  address_2: string;
  phone_no: string;
  email: string;
  url: string;
  fax: string;
  incharge_name: string;
  representative_name: string;
  representative_furigana: string;
  use_suspension_flag: string;
  suspension_reason: string;
  isCreate: number;
  payment_conditions: string;
};

export const customerListApi = async (
  company_name: string,
  page: number,
  per_page: number,
) => {
  const response = await api.get<CustomerData>(
    API_URL.customers.getCustomerList(company_name, page, per_page),
  );
  return response;
};

/**
 * 得意先取得
 * @param {number} id
 */
export const getCustomer = async (id: number, isCreate: number) => {
  const response = await api.get<CustomerLists>(
    API_URL.customers.detail(id, isCreate),
  );
  return response;
};

/**
 * 得意先追加
 * @param {CustomerLists} data
 */
export const addCustomer = async (data: CustomerLists) => {
  const response = await api.post<CustomerLists>(
    API_URL.customers.add_customer(),
    data,
  );
  return response;
};

/**
 * 得意先更新
 * @param {number} id
 * @param {CustomerLists} data
 */
export const updateCustomer = async (id: number, data: CustomerLists) => {
  const response = await api.put(API_URL.customers.update_customer(id), {
    ...data,
  });
  return response;
};
